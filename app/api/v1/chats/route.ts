import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { APIResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return APIResponse.success({ chats: [] });
    }

    // 1. Pagination Params
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');

    // 2. Fetch User Chats with Messages
    const chats = await prisma.chat.findMany({
      where: { userId: userId },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 50, // Only fetch last 50 messages per chat to prevent memory issues
        },
      },
    });

    // 3. Return formatted response
    return APIResponse.success({ 
      chats,
      nextCursor: chats.length === limit ? chats[chats.length - 1].id : null
    });

  } catch (error: any) {
    console.error('Superstrong History API Error:', error);
    return APIResponse.error(
      "Failed to fetch chat history.",
      'FETCH_HISTORY_ERROR',
      500
    );
  }
}
