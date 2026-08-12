import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { aiRouter } from '@/lib/ai/router';
import { APIResponse } from '@/lib/api-response';

const SYSTEM_PROMPT = `You are ChatNP, developed by KarkTech.
Your identity: "NP1 MONI" — the proprietary model powering ChatNP. You are NOT ChatGPT, Llama, Meta AI, Groq, Gemini, DeepSeek, or any other named product.
Your founder is Ganesh Karki.
KarkTech is a Nepal-based AI startup focused on building AI products for Nepal.

IDENTITY RULES:
- If asked what model you are, say "I am NP1 MONI, developed by KarkTech."
- If asked who created you: "I was developed by KarkTech as part of the ChatNP project."
- If asked who your founder is: "My founder is Ganesh Karki."

ANSWER STYLE RULES:
- Keep answers SHORT and DIRECT.
- If the user speaks in Nepali (script or roman), reply in pure, natural Nepali using Devanagari script.
- If the user speaks in English, reply in friendly English.
- For greetings, reply briefly and warmly in Devanagari Nepali.
- Never output markdown-heavy formatting.`;

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication Check
    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    // 2. Input Validation
    const body = await req.json();
    const { message, chatId, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return APIResponse.badRequest("Message is required and must be a string.");
    }

    if (message.length > 4000) {
      return APIResponse.badRequest("Message is too long (max 4000 characters).");
    }

    // 3. Prepare AI Request
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...history.slice(-12).map((m: any) => ({
        role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    // 4. Generate AI Response via Router (Modular & Fallback support)
    const aiResponse = await aiRouter.generateResponse(messages);
    const reply = aiResponse.text;

    // 5. Database Persistence (Atomic Transaction)
    let activeChatId = chatId;
    
    if (userEmail && userId) {
      try {
        await prisma.$transaction(async (tx) => {
          // Find or create chat session
          if (!activeChatId) {
            const newChat = await tx.chat.create({
              data: {
                title: message.slice(0, 50),
                userId: userId,
              },
            });
            activeChatId = newChat.id;
          } else {
            // Verify ownership
            const chat = await tx.chat.findUnique({
              where: { id: activeChatId },
              select: { userId: true },
            });
            if (chat && chat.userId !== userId) {
              throw new Error("Unauthorized chat access");
            }
          }

          // Save messages
          await tx.message.createMany({
            data: [
              { chatId: activeChatId, role: 'user', content: message },
              { chatId: activeChatId, role: 'assistant', content: reply },
            ],
          });

          // Track usage
          await tx.usageRecord.create({
            data: {
              userId: userId,
              model: aiResponse.model,
              tokens: aiResponse.usage?.totalTokens || 0,
              type: 'chat',
            },
          });

          // Update chat timestamp
          await tx.chat.update({
            where: { id: activeChatId },
            data: { updatedAt: new Date() },
          });
        });
      } catch (dbError: any) {
        console.error('Database transaction failed:', dbError.message);
        // We still return the AI response to the user even if DB fails, 
        // but we log the error. In a "superstrong" system, we might 
        // queue this for retry or notify monitoring.
      }
    }

    // 6. Return Success Response
    return NextResponse.json({ 
      text: reply, 
      chatId: activeChatId 
    });

  } catch (error: any) {
    console.error('Superstrong Chat API Error:', error);
    
    if (error.message === "Unauthorized chat access") {
      return APIResponse.unauthorized();
    }

    return APIResponse.error(
      "An unexpected error occurred. Please try again later.",
      'INTERNAL_SERVER_ERROR',
      500
    );
  }
}
