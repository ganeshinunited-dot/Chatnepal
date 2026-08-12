import { NextResponse } from 'next/server';

export class APIResponse {
  static success(data: any, status = 200) {
    return NextResponse.json({
      success: true,
      data,
    }, { status });
  }

  static error(message: string, code = 'INTERNAL_ERROR', status = 500, requestId?: string) {
    return NextResponse.json({
      success: false,
      error: {
        code,
        message,
        requestId,
      },
    }, { status });
  }

  static unauthorized(message = 'Unauthorized access') {
    return this.error(message, 'UNAUTHORIZED', 401);
  }

  static badRequest(message: string) {
    return this.error(message, 'BAD_REQUEST', 400);
  }
}
