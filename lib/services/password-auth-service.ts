import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';
import { verifyEmailLoginCode } from '@/lib/services/email-otp-service';

const SCRYPT_N = 16_384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEY_LENGTH = 64;
const SCRYPT_MAX_MEMORY = 64 * 1024 * 1024;
const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 128;
const MAX_FAILED_PASSWORD_ATTEMPTS = 5;
const PASSWORD_LOCK_MS = 15 * 60 * 1000;

export class PasswordAuthError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'PasswordAuthError';
  }
}

type PasswordAccountMode = 'setup' | 'reset';

type SessionUser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function assertValidEmail(value: string) {
  const email = normalizeEmail(value);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new PasswordAuthError('Please enter a valid email address.', 400, 'INVALID_EMAIL');
  }
  return email;
}

function assertValidPassword(value: string) {
  if (typeof value !== 'string' || value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH) {
    throw new PasswordAuthError(`Use a password between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`, 400, 'WEAK_PASSWORD');
  }

  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    throw new PasswordAuthError('Use at least one letter and one number in your password.', 400, 'WEAK_PASSWORD');
  }

  return value;
}

function deriveKey(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, SCRYPT_KEY_LENGTH, {
      N: SCRYPT_N,
      r: SCRYPT_R,
      p: SCRYPT_P,
      maxmem: SCRYPT_MAX_MEMORY,
    }, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(Buffer.from(derivedKey));
    });
  });
}

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt);
  return ['scrypt', 'v1', SCRYPT_N, SCRYPT_R, SCRYPT_P, salt.toString('base64url'), key.toString('base64url')].join('$');
}

async function passwordMatches(password: string, storedHash: string) {
  const [algorithm, version, n, r, p, saltValue, keyValue] = storedHash.split('$');
  if (algorithm !== 'scrypt' || version !== 'v1' || !n || !r || !p || !saltValue || !keyValue) return false;

  const workFactor = Number(n);
  const blockSize = Number(r);
  const parallelization = Number(p);
  const salt = Buffer.from(saltValue, 'base64url');
  const expected = Buffer.from(keyValue, 'base64url');
  if (
    salt.length < 16 ||
    expected.length !== SCRYPT_KEY_LENGTH ||
    workFactor !== SCRYPT_N ||
    blockSize !== SCRYPT_R ||
    parallelization !== SCRYPT_P
  ) return false;

  const key = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, expected.length, {
      N: workFactor,
      r: blockSize,
      p: parallelization,
      maxmem: SCRYPT_MAX_MEMORY,
    }, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(Buffer.from(derivedKey));
    });
  });

  return timingSafeEqual(expected, key);
}

function toSessionUser(user: SessionUser) {
  return { id: user.id, name: user.name, email: user.email, image: user.image };
}

export async function authenticateEmailPassword({ email: rawEmail, password }: { email: string; password: string }) {
  const email = assertValidEmail(rawEmail);
  if (typeof password !== 'string' || password.length > MAX_PASSWORD_LENGTH) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      passwordHash: true,
      passwordFailedAttempts: true,
      passwordLockedUntil: true,
    },
  });

  const now = new Date();
  if (!user?.passwordHash || (user.passwordLockedUntil && user.passwordLockedUntil > now)) return null;

  const valid = await passwordMatches(password, user.passwordHash);
  if (valid) {
    if (user.passwordFailedAttempts > 0 || user.passwordLockedUntil) {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordFailedAttempts: 0, passwordLockedUntil: null },
      });
    }
    return toSessionUser(user);
  }

  const nextAttempts = user.passwordFailedAttempts + 1;
  const lockedUntil = nextAttempts >= MAX_FAILED_PASSWORD_ATTEMPTS
    ? new Date(now.getTime() + PASSWORD_LOCK_MS)
    : null;
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordFailedAttempts: lockedUntil ? 0 : nextAttempts,
      passwordLockedUntil: lockedUntil,
    },
  });
  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: lockedUntil ? 'PASSWORD_LOGIN_LOCKED' : 'PASSWORD_LOGIN_FAILED',
      resource: 'email_password',
    },
  }).catch(() => undefined);

  return null;
}

export async function configureEmailPassword({
  email: rawEmail,
  password: rawPassword,
  code,
  mode,
}: {
  email: string;
  password: string;
  code: string;
  mode: PasswordAccountMode;
}) {
  const email = assertValidEmail(rawEmail);
  const password = assertValidPassword(rawPassword);
  if (!/^\d{6}$/.test(code.trim())) return null;

  // The email code proves ownership before a new password can be created or reset.
  const verifiedUser = await verifyEmailLoginCode({ email, code: code.trim() });
  if (!verifiedUser) return null;

  const existing = await prisma.user.findUnique({
    where: { id: verifiedUser.id },
    select: { passwordHash: true },
  });

  // Account creation cannot silently replace a password. Reset is a distinct,
  // email-code-verified operation that the account owner intentionally selects.
  if (mode === 'setup' && existing?.passwordHash) {
    throw new PasswordAuthError('This email already has a password. Sign in instead.', 409, 'PASSWORD_ALREADY_CONFIGURED');
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.$transaction(async (transaction) => {
    const updatedUser = await transaction.user.update({
      where: { id: verifiedUser.id },
      data: {
        passwordHash,
        emailVerified: new Date(),
        passwordFailedAttempts: 0,
        passwordLockedUntil: null,
      },
      select: { id: true, name: true, email: true, image: true },
    });

    await transaction.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: 'email-password',
          providerAccountId: email,
        },
      },
      update: { userId: updatedUser.id, type: 'credentials' },
      create: {
        userId: updatedUser.id,
        type: 'credentials',
        provider: 'email-password',
        providerAccountId: email,
      },
    });

    await transaction.auditLog.create({
      data: {
        userId: updatedUser.id,
        action: mode === 'reset' ? 'PASSWORD_RESET' : 'PASSWORD_CREATED',
        resource: 'email_password',
      },
    });

    return updatedUser;
  });

  return toSessionUser(user);
}

export const passwordPolicy = {
  minLength: MIN_PASSWORD_LENGTH,
  maxLength: MAX_PASSWORD_LENGTH,
};
