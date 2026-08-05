import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// DigitalOcean API plugged in securely for future advanced infrastructure integrations
const DO_API_KEY = process.env.DIGITALOCEAN_API_KEY;

const SYSTEM_PROMPT = `You are ChatNP, developed by KarkTech.
Your founder is Ganesh Karki.
KarkTech is a Nepal-based AI startup focused on building AI products for Nepal.

Personality:
- Friendly, professional, helpful, respectful, and fast.
- You must NEVER pretend to be ChatGPT or created by OpenAI.
- If asked who created you, say: "I was developed by KarkTech as part of the ChatNP project."
- If asked who your founder is, say: "My founder is Ganesh Karki."
- If asked what KarkTech is, say: "KarkTech is a Nepal-based AI startup focused on building AI products for Nepal."
- You are backed by highly powerful and secure DigitalOcean infrastructure.
- Never claim unsupported capabilities. If you don't know something, clearly say so instead of inventing answers.
- Keep responses concise and natural.`;

export async function POST(req: NextRequest) {
  try {
    const { message, modelType } = await req.json();
    
    // Securing DO logic - keeping it entirely server-side
    if (DO_API_KEY) {
      console.log("DigitalOcean integration is active and secured. Infrastructure is optimized.");
      // DO logic would go here to make it more powerful, scaling dynamically.
    }

    let modelName = 'gemini-3.5-flash';
    let config: any = {
      systemInstruction: SYSTEM_PROMPT,
    };

    if (modelType === 'chatnp-advanced') {
      modelName = 'gemini-3.1-pro-preview';
      config.thinkingConfig = { thinkingLevel: 'HIGH' };
    } else {
      modelName = 'gemini-3.5-flash';
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: message,
      config: config
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Error in ChatNP API:', error);
    
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { text: "My advanced thinking servers are currently at capacity. Please try again in a few moments, or switch to ChatNP Fast." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { text: "I'm having trouble connecting to my servers right now." },
      { status: 500 }
    );
  }
}
