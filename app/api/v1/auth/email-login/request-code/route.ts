import { NextRequest, NextResponse } from 'next/server';
import { EmailOtpError, requestEmailLoginCode } from '@/lib/services/email-otp-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email : '';

    const result = await requestEmailLoginCode({
      email,
      ipAddress: getClientIp(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        email: result.email,
        expiresInSeconds: result.expiresInSeconds,
      },
    });
  } catch (error) {
    if (error instanceof EmailOtpError) {
      return NextResponse.json(
        {
          success: false,
          error: { code: error.code, message: error.message },
        },
        { status: error.status },
      );
    }

    console.error('Email login code request failed', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Unable to process the request right now.' },
      },
      { status: 500 },
    );
  }
}
