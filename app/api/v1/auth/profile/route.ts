import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { APIResponse } from '@/lib/api-response';

const MAX_DISPLAY_NAME_LENGTH = 80;

function normalizeDisplayName(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

function hasChosenDisplayName(name: string | null, email: string | null) {
  if (!name) return false;
  const normalizedName = name.trim().toLowerCase();
  const emailLocalPart = email?.split('@')[0]?.trim().toLowerCase();
  return Boolean(normalizedName && normalizedName !== emailLocalPart);
}

function serializeProfile(user: { id: string; name: string | null; email: string | null; image: string | null; emailVerified: Date | null }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified?.toISOString() ?? null,
    requiresName: !hasChosenDisplayName(user.name, user.email),
  };
}

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return APIResponse.unauthorized();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, image: true, emailVerified: true },
    });

    if (!user) return APIResponse.unauthorized();

    return APIResponse.success({ profile: serializeProfile(user) });
  } catch (error) {
    console.error('Profile API GET error:', error);
    return APIResponse.error('Unable to load your profile.', 'PROFILE_FETCH_ERROR', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return APIResponse.unauthorized();

    const body = await request.json().catch(() => null);
    const name = normalizeDisplayName(body?.name);

    if (name.length < 2 || name.length > MAX_DISPLAY_NAME_LENGTH) {
      return APIResponse.badRequest(`Please enter a name between 2 and ${MAX_DISPLAY_NAME_LENGTH} characters.`);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name },
      select: { id: true, name: true, email: true, image: true, emailVerified: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'PROFILE_NAME_UPDATED',
        resource: 'user_profile',
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0, 64) || null,
        userAgent: request.headers.get('user-agent')?.slice(0, 512) || null,
      },
    }).catch(() => undefined);

    return APIResponse.success({ profile: serializeProfile(user) });
  } catch (error) {
    console.error('Profile API PATCH error:', error);
    return APIResponse.error('Unable to save your name.', 'PROFILE_UPDATE_ERROR', 500);
  }
}
