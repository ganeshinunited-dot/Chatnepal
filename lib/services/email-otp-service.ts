import { createHmac, randomInt, timingSafeEqual } from 'crypto';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

const CODE_LENGTH = 6;
const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const REQUEST_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_EMAIL_WINDOW = 3;
const MAX_REQUESTS_PER_IP_WINDOW = 10;
const MAX_VERIFY_ATTEMPTS = 5;

export class EmailOtpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'EmailOtpError';
  }
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function assertValidEmail(value: string) {
  const email = normalizeEmail(value);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new EmailOtpError('कृपया मान्य email address राख्नुहोस्।', 400, 'INVALID_EMAIL');
  }
  return email;
}

function getOtpSecret() {
  const secret = process.env.EMAIL_OTP_SECRET || process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new EmailOtpError('Email login is not configured yet.', 503, 'OTP_NOT_CONFIGURED');
  }
  return secret;
}

function hashCode(email: string, code: string) {
  return createHmac('sha256', getOtpSecret())
    .update(`${email}:${code}`)
    .digest('hex');
}

function codesMatch(expectedHash: string, receivedHash: string) {
  const expected = Buffer.from(expectedHash, 'hex');
  const received = Buffer.from(receivedHash, 'hex');
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, '');

  if (!user || !password) {
    throw new EmailOtpError('Email delivery is not configured yet.', 503, 'SMTP_NOT_CONFIGURED');
  }

  return {
    user,
    password,
    from: process.env.SMTP_FROM?.trim() || `ChatNP <${user}>`,
  };
}

async function sendCodeEmail(email: string, code: string) {
  const smtp = getSmtpConfig();
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
  });

  await transport.sendMail({
    from: smtp.from,
    to: email,
    subject: `${code} is your ChatNP login code`,
    text: `Your ChatNP login code is ${code}. It expires in 10 minutes. Do not share this code with anyone.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px;color:#111827">
        <div style="font-size:20px;font-weight:700;margin-bottom:20px">ChatNP</div>
        <p style="font-size:16px;line-height:1.6">Use this one-time code to sign in to ChatNP:</p>
        <div style="margin:24px 0;padding:18px;background:#f3f4f6;border-radius:12px;font-size:28px;font-weight:700;letter-spacing:8px;text-align:center">${code}</div>
        <p style="font-size:14px;line-height:1.6;color:#4b5563">This code expires in 10 minutes. Do not share it with anyone, including ChatNP support.</p>
      </div>
    `,
  });
}

export async function requestEmailLoginCode({
  email: rawEmail,
  ipAddress,
}: {
  email: string;
  ipAddress?: string;
}) {
  const email = assertValidEmail(rawEmail);
  const now = new Date();
  const windowStart = new Date(now.getTime() - REQUEST_WINDOW_MS);

  const [recentByEmail, recentByIp, latestCode] = await Promise.all([
    prisma.emailLoginCode.count({
      where: { email, createdAt: { gte: windowStart } },
    }),
    ipAddress
      ? prisma.emailLoginCode.count({
          where: { ipAddress, createdAt: { gte: windowStart } },
        })
      : Promise.resolve(0),
    prisma.emailLoginCode.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    }),
  ]);

  if (latestCode && now.getTime() - latestCode.createdAt.getTime() < RESEND_COOLDOWN_MS) {
    throw new EmailOtpError('Please wait one minute before requesting another code.', 429, 'RESEND_COOLDOWN');
  }

  if (recentByEmail >= MAX_REQUESTS_PER_EMAIL_WINDOW || recentByIp >= MAX_REQUESTS_PER_IP_WINDOW) {
    throw new EmailOtpError('Too many code requests. Please try again later.', 429, 'RATE_LIMITED');
  }

  const code = randomInt(0, 10 ** CODE_LENGTH).toString().padStart(CODE_LENGTH, '0');
  const record = await prisma.emailLoginCode.create({
    data: {
      email,
      codeHash: hashCode(email, code),
      expiresAt: new Date(now.getTime() + CODE_TTL_MS),
      ipAddress: ipAddress?.slice(0, 64),
    },
  });

  try {
    await sendCodeEmail(email, code);
  } catch (error) {
    await prisma.emailLoginCode.delete({ where: { id: record.id } }).catch(() => undefined);
    console.error('Email OTP delivery failed', error);
    throw new EmailOtpError('We could not send a login code right now. Please try again later.', 503, 'EMAIL_DELIVERY_FAILED');
  }

  await prisma.emailLoginCode.updateMany({
    where: {
      email,
      id: { not: record.id },
      consumedAt: null,
    },
    data: { consumedAt: now },
  });

  return { email, expiresInSeconds: CODE_TTL_MS / 1000 };
}

export async function verifyEmailLoginCode({
  email: rawEmail,
  code,
}: {
  email: string;
  code: string;
}) {
  const email = assertValidEmail(rawEmail);
  const normalizedCode = code.trim();

  if (!/^\d{6}$/.test(normalizedCode)) {
    return null;
  }

  const record = await prisma.emailLoginCode.findFirst({
    where: {
      email,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!record || record.attempts >= MAX_VERIFY_ATTEMPTS) {
    return null;
  }

  const isValid = codesMatch(record.codeHash, hashCode(email, normalizedCode));
  if (!isValid) {
    const nextAttempts = record.attempts + 1;
    await prisma.emailLoginCode.update({
      where: { id: record.id },
      data: {
        attempts: nextAttempts,
        ...(nextAttempts >= MAX_VERIFY_ATTEMPTS ? { consumedAt: new Date() } : {}),
      },
    });
    return null;
  }

  const consumedAt = new Date();
  const user = await prisma.$transaction(async (transaction) => {
    const consumed = await transaction.emailLoginCode.updateMany({
      where: { id: record.id, consumedAt: null },
      data: { consumedAt },
    });

    if (consumed.count !== 1) return null;

    return transaction.user.upsert({
      where: { email },
      update: { emailVerified: consumedAt },
      create: {
        email,
        emailVerified: consumedAt,
        name: email.split('@')[0],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
  });

  return user;
}

export const emailOtpPolicy = {
  ttlSeconds: CODE_TTL_MS / 1000,
  resendCooldownSeconds: RESEND_COOLDOWN_MS / 1000,
};
