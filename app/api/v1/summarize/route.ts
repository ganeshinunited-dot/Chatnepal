import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const summaryApiKey = process.env.SUMMARY_META_API_KEY || process.env.META_API_KEY;
    const baseUrl = process.env.META_API_BASE_URL || 'https://api.meta.ai/v1';
    const model = process.env.META_MODEL || 'muse-spark-1.2';

    if (!summaryApiKey) {
      return NextResponse.json(
        { success: false, error: 'Summary API Key is not configured on the server.' },
        { status: 500 }
      );
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
          {
            role: 'system',
            content: 'You are NP1 MONI, developed by KarkTech. Provide a crisp, professional summary of KarkTech and ChatNP in Nepali (Devanagari script) highlighting its mission for Nepal and South Asia, local AI adaptation, and features.'
          },
          {
            role: 'user',
            content: 'Please summarize the KarkTech and ChatNP platform for a first-time visitor in short bullet points.'
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { success: false, error: `Meta AI API Error (${response.status}): ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || data.message || 'तपाईंलाई स्वागत छ! KarkTech ले नेपाल र दक्षिण एसियाका लागि ChatNP नामक स्थानीय AI प्लेटफर्म तयार गरेको छ।';

    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    console.error('Summary API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
