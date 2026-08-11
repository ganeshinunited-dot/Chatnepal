import { NextRequest, NextResponse } from 'next/server';

const META_BASE_URL = process.env.META_API_BASE_URL || 'https://api.meta.ai/v1';
const META_API_KEY = process.env.META_API_KEY || process.env.META_AI_API_KEY || process.env.LLM_API_KEY;
const META_MODEL = process.env.META_MODEL || 'muse-spark-1.2';

const SYSTEM_PROMPT = `You are ChatNP, developed by KarkTech.
Your identity: "NP1 MONI" — the proprietary model powering ChatNP. You are NOT ChatGPT, Llama, Meta AI, Groq, Gemini, DeepSeek, or any other named product.
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
- Language & Script Rules:
  - If the user speaks in Nepali (whether in Nepali script/Devanagari like 'नेपाली' or in Roman script), you MUST reply in pure, natural Nepali using **Devanagari script** (नेपाली अक्षरहरूमा, जस्तै: "नमस्ते! म NP1 MONI हूँ, कर्कटेकद्वारा निर्मित। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु?").
  - If the user speaks in English, reply in friendly English.
- For questions about Nepal (news, dates, culture, prices, agriculture, business): use natural Devanagari Nepali as the main answer.
- For anything time-sensitive (today's news, dates, prices, weather): state the actual current date context in the answer, and if you are not sure of live info, say honestly what you know instead of inventing.
- For greetings like "namaste" or "नमस्ते", reply briefly, warmly, and politely in a fine Nepali tone as ChatNP / NP1 MONI using Devanagari script.
- Never output markdown-heavy formatting; keep it clean plain text.`;

export async function POST(req: NextRequest) {
  if (!META_API_KEY) {
    return NextResponse.json(
      { text: "Server Error: META_API_KEY environment variable is missing in DigitalOcean." },
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
      model: META_MODEL,
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

    const response = await fetch(`${META_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${META_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API error details:', response.status, errText);
      return NextResponse.json(
        { text: `API Error (${response.status}): ${errText.slice(0, 150) || 'Check API endpoint and key'}` },
        { status: 200 }
      );
    }

    const data = await response.json();
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.delta?.content ||
      '';

    if (!text) {
      return NextResponse.json(
        { text: "API Error: Received empty response from provider." },
        { status: 200 }
      );
    }

    return NextResponse.json({ text: text.trim() });
  } catch (error: any) {
    console.error('Exception in ChatNP API:', error);
    return NextResponse.json(
      { text: `Server Exception: ${error?.message || 'Unknown connection error'}` },
      { status: 200 }
    );
  }
}
