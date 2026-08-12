import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const type = body.type || 'general'; // 'general' or 'deck'

    const summaryApiKey = process.env.SUMMARY_META_API_KEY || process.env.META_API_KEY;
    const baseUrl = process.env.META_API_BASE_URL || 'https://api.meta.ai/v1';
    const model = process.env.META_MODEL || 'muse-spark-1.2';

    if (!summaryApiKey) {
      return NextResponse.json(
        { success: false, error: 'Summary API Key is not configured on the server.' },
        { status: 500 }
      );
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'deck') {
      systemPrompt = `You are NP1 MONI, developed by KarkTech. Provide a professional, investor-grade pitch deck summary of KarkTech and ChatNP in English. 
Focus on:
1. Market Opportunity in Nepal & South Asia
2. Product & Technology (ChatNP & NP1 MONI)
3. Traction & Roadmap
4. Vision & Investment Highlights
Keep formatting clean, professional, and readable. Avoid excessive markdown asterisks or bolding. Use clean bullet points with standard dashes or numbers.`;
      userPrompt = 'Provide an investor-focused pitch deck summary of KarkTech and ChatNP.';
    } else {
      systemPrompt = `You are NP1 MONI, developed by KarkTech. Provide a clean, concise, and professional English summary of KarkTech and ChatNP for website visitors.
Focus on:
- Who KarkTech is and our mission for Nepal & South Asia.
- ChatNP platform overview and local AI adaptation.
- Key features and benefits.
Keep formatting clean and readable. DO NOT use excessive markdown bolding (avoid multiple asterisks like **). Use plain text or simple bullet points.`;
      userPrompt = 'Please summarize the KarkTech and ChatNP platform for a first-time visitor in clean bullet points.';
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${summaryApiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { success: false, error: `API Error (${response.status}): ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let summary = data.choices?.[0]?.message?.content || data.message || 'Welcome to KarkTech and ChatNP!';

    // Clean up excessive markdown asterisks if any remain
    summary = summary.replace(/\*\*/g, '').replace(/\*/g, '•');

    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    console.error('Summary API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
