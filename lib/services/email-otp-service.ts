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
      throw new EmailOtpError('Please enter a valid email address.', 400, 'INVALID_EMAIL');
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
    subject: `${code} — ChatNP sign-in code`,
    text: [
      'ChatNP | KarkTech',
      '',
      `Your secure sign-in code is: ${code}`,
      '',
      'This code expires in 10 minutes and can be used only once.',
      'Do not share this code with anyone — including anyone claiming to represent ChatNP or KarkTech.',
      '',
      'If you did not request this code, you can safely ignore this email.',
    ].join('\n'),
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style="margin:0;padding:0;background:#f5f7fb;color:#172033;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your secure ChatNP sign-in code is ${code}.</div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f5f7fb;padding:32px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #e6eaf2;border-radius:24px;overflow:hidden;box-shadow:0 12px 32px rgba(15,23,42,0.08);">
                  <tr>
                    <td style="padding:28px 32px 20px;background:linear-gradient(135deg,#0f2e63 0%,#165dcc 58%,#1d77e8 100%);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width:38px;height:38px;border-radius:12px;background:#ffffff;color:#1559c7;text-align:center;font-size:14px;font-weight:800;letter-spacing:-0.04em;">NP</td>
                          <td style="padding-left:12px;color:#ffffff;">
                            <div style="font-size:20px;line-height:24px;font-weight:800;letter-spacing:-0.03em;">ChatNP</div>
                            <div style="margin-top:3px;font-size:11px;line-height:16px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#cfe2ff;">A KarkTech product</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px 32px 12px;">
                      <p style="margin:0;color:#2563eb;font-size:12px;line-height:18px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">Secure sign in</p>
                      <h1 style="margin:10px 0 0;color:#172033;font-size:26px;line-height:34px;font-weight:800;letter-spacing:-0.03em;">Your ChatNP code</h1>
                      <p style="margin:14px 0 0;color:#536176;font-size:15px;line-height:24px;">Use the one-time code below to sign in to ChatNP securely.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 32px 24px;">
                      <div style="border:1px solid #cfe0ff;border-radius:18px;background:#f6f9ff;padding:22px 16px;text-align:center;">
                        <div style="color:#64748b;font-size:11px;line-height:16px;font-weight:800;letter-spacing:0.13em;text-transform:uppercase;">Your verification code</div>
                        <div style="margin-top:10px;color:#103c87;font-size:32px;line-height:38px;font-weight:800;letter-spacing:0.34em;text-indent:0.34em;font-variant-numeric:tabular-nums;">${code}</div>
                      </div>
                      <p style="margin:18px 0 0;color:#536176;font-size:14px;line-height:22px;">Use this code within <strong style="color:#172033;">10 minutes</strong>. It can be used only once.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 32px 32px;">
                      <div style="border-left:3px solid #f59e0b;border-radius:2px;background:#fffbeb;padding:12px 14px;color:#854d0e;font-size:13px;line-height:20px;">Do not share this code with anyone. ChatNP and KarkTech representatives will never ask for your verification code.</div>
                      <p style="margin:18px 0 0;color:#7a879a;font-size:12px;line-height:19px;">If you did not request this code, you can safely ignore this email. Your account remains secure.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top:1px solid #e8edf5;padding:20px 32px;background:#fbfcfe;color:#8995a8;font-size:11px;line-height:18px;text-align:center;">This is an automated security message from ChatNP by KarkTech.</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
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
