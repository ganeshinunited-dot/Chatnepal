import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { APIResponse } from '@/lib/api-response';

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return APIResponse.unauthorized('Sign in to manage your chat history.');
    }

    const chatId = new URL(req.url).searchParams.get('chatId')?.trim();
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0, 64) || null;
    const userAgent = req.headers.get('user-agent')?.slice(0, 512) || null;

    if (chatId) {
      if (chatId.length > 64) {
        return APIResponse.badRequest('Invalid chat identifier.');
      }

      const deleted = await prisma.chat.deleteMany({
        where: { id: chatId, userId },
      });

      if (deleted.count === 0) {
        return APIResponse.error('Chat not found.', 'CHAT_NOT_FOUND', 404);
      }

      await prisma.auditLog.create({
        data: {
          userId,
          action: 'CHAT_DELETED',
          resource: `chat:${chatId}`,
          ipAddress,
          userAgent,
        },
      }).catch(() => undefined);

      return APIResponse.success({ deleted: 1 });
    }

    const deleted = await prisma.chat.deleteMany({ where: { userId } });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CHAT_HISTORY_CLEARED',
        resource: 'chat_history',
        ipAddress,
        userAgent,
      },
    }).catch(() => undefined);

    return APIResponse.success({ deleted: deleted.count });
  } catch (error) {
    console.error('Chat history deletion error:', error);
    return APIResponse.error('Unable to delete chat history. Please try again.', 'DELETE_HISTORY_ERROR', 500);
  }
}

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
