import { NextRequest, NextResponse } from 'next/server';
import { configureEmailPassword, PasswordAuthError } from '@/lib/services/password-auth-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const code = typeof body?.code === 'string' ? body.code : '';
    const mode = body?.mode === 'reset' ? 'reset' : 'setup';

    const user = await configureEmailPassword({ email, password, code, mode });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_VERIFICATION_CODE', message: 'That verification code is incorrect or has expired.' },
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      data: { email: user.email },
    });
  } catch (error) {
    if (error instanceof PasswordAuthError) {
      return NextResponse.json(
        {
          success: false,
          error: { code: error.code, message: error.message },
        },
        { status: error.status },
      );
    }

    console.error('Email password configuration failed', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Unable to secure this account right now. Please try again.' },
      },
      { status: 500 },
    );
  }
}
