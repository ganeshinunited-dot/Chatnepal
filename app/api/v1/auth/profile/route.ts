import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { APIResponse } from '@/lib/api-response';

const MAX_DISPLAY_NAME_LENGTH = 80;
const MAX_PROFILE_IMAGE_LENGTH = 360_000;

type StoredProfile = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
};

function normalizeDisplayName(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeProfileImage(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  if (typeof value !== 'string' || value.length > MAX_PROFILE_IMAGE_LENGTH) return undefined;

  const image = value.trim();
  const isSafeDataImage = /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(image);
  const isSafeHttpsImage = /^https:\/\/[^\s]{1,2000}$/i.test(image);

  return isSafeDataImage || isSafeHttpsImage ? image : undefined;
}

function hasChosenDisplayName(name: string | null, email: string | null) {
  if (!name) return false;
  const normalizedName = name.trim().toLowerCase();
  const emailLocalPart = email?.split('@')[0]?.trim().toLowerCase();
  return Boolean(normalizedName && normalizedName !== emailLocalPart);
}

function serializeProfile(user: StoredProfile) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified?.toISOString() ?? null,
    requiresName: !hasChosenDisplayName(user.name, user.email),
  };
}

const profileSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  emailVerified: true,
} as const;

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return APIResponse.unauthorized();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: profileSelect,
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
    if (!body || typeof body !== 'object') {
      return APIResponse.badRequest('Profile details are required.');
    }

    const hasNameUpdate = Object.prototype.hasOwnProperty.call(body, 'name');
    const hasImageUpdate = Object.prototype.hasOwnProperty.call(body, 'image');
    const name = normalizeDisplayName(body.name);
    const image = normalizeProfileImage(body.image);

    if (!hasNameUpdate && !hasImageUpdate) {
      return APIResponse.badRequest('Choose a profile detail to update.');
    }

    if (hasNameUpdate && (name.length < 2 || name.length > MAX_DISPLAY_NAME_LENGTH)) {
      return APIResponse.badRequest(`Please enter a name between 2 and ${MAX_DISPLAY_NAME_LENGTH} characters.`);
    }

    if (hasImageUpdate && image === undefined) {
      return APIResponse.badRequest('Use a PNG, JPEG, or WebP profile image smaller than 250 KB.');
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(hasNameUpdate ? { name } : {}),
        ...(hasImageUpdate ? { image } : {}),
      },
      select: profileSelect,
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: hasImageUpdate ? 'PROFILE_UPDATED' : 'PROFILE_NAME_UPDATED',
        resource: 'user_profile',
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0, 64) || null,
        userAgent: request.headers.get('user-agent')?.slice(0, 512) || null,
      },
    }).catch(() => undefined);

    return APIResponse.success({ profile: serializeProfile(user) });
  } catch (error) {
    console.error('Profile API PATCH error:', error);
    return APIResponse.error('Unable to save your profile.', 'PROFILE_UPDATE_ERROR', 500);
  }
}
