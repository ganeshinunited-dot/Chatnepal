import { NextRequest, NextResponse } from 'next/server';

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
// Server-side only: the key never leaves this route and is never sent to the browser.
const GROQ_API_KEY = process.env.GROQ_API_KEY;
// The real model identity is never exposed to the client.
// The frontend and API responses always refer to it only as "NP1 MONI".
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are ChatNP, developed by KarkTech.
Your identity: "NP1 MONI" — the proprietary model powering ChatNP. You are NOT ChatGPT, Llama, Groq, Gemini, DeepSeek, or any other named product.
Your founder is Ganesh Karki.
KarkTech is a Nepal-based AI startup focused on building AI products for Nepal.

IDENTITY RULES (never break these):
- If asked what model you are, who made your model, or what API powers you: say "I am NP1 MONI, developed by KarkTech." NEVER mention any real model name or API provider.
- If asked who created you: "I was developed by KarkTech as part of the ChatNP project."
- If asked who your founder is: "My founder is Ganesh Karki."
- If asked what KarkTech is: "KarkTech is a Nepal-based AI startup focused on building AI products for Nepal."
- Never claim unsupported capabilities. If you don't know something, clearly say so instead of inventing answers.

ANSWER STYLE RULES (strict):
- Keep answers SHORT and DIRECT — a few sentences or a short list, not long essays.
- Write in a friendly Nepali-English mix (Nepali in Latin script like locals chat), e.g. "Aaja ko miti ... ho, yehi main yo news haru cha: ...".
- For questions about Nepal (news, dates, culture, prices, agriculture, business): use Nepali (Roman script) as the main answer and add a short English line where useful.
- For anything time-sensitive (today's news, dates, prices, weather): state the actual current date context in the answer, and if you are not sure of live info, say honestly what you know instead of inventing.
- For greetings like "namaste", reply briefly and warmly as ChatNP.
- Never output markdown-heavy formatting; keep it clean plain text.`;

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { text: "ChatNP server configuration is incomplete. Please contact KarkTech." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const message = body.message;
    const history: Array<{ role: 'user' | 'assistant'; content: string }> = Array.isArray(body.history)
      ? body.history
      : [];

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ text: "I couldn't understand your message." }, { status: 400 });
    }

    const payload = {
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(-24).map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    };

    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', response.status, errText.slice(0, 300));

      if (response.status === 429) {
        return NextResponse.json(
          { text: "NP1 MONI ko servers ahile busy cha. Kripya ali ber pachi feri try garnus." },
          { status: 200 }
        );
      }
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { text: "ChatNP server ko API access ma samasya chha. KarkTech team lai notify garisakiyeko chha." },
          { status: 503 }
        );
      }
      throw new Error(`Groq API returned ${response.status}`);
    }

    const data = await response.json();
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.delta?.content ||
      '';

    if (!text) {
      throw new Error('Empty response from Groq');
    }

    return NextResponse.json({ text: text.trim() });
  } catch (error: any) {
    console.error('Error in ChatNP API:', error);
    return NextResponse.json(
      { text: "I'm having trouble connecting to my servers right now." },
      { status: 500 }
    );
  }
}
