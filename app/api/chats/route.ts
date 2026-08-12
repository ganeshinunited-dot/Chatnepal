import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ chats: [] }, { status: 200 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        chats: {
          orderBy: { updatedAt: 'desc' },
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
            },
          },
        },
      },
    });

    if (!dbUser) {
      return NextResponse.json({ chats: [] }, { status: 200 });
    }

    return NextResponse.json({ chats: dbUser.chats }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
