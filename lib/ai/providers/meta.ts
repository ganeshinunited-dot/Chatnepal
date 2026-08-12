import { AIProvider, ChatMessage, AIResponse } from '../types';

export class MetaAIProvider implements AIProvider {
  name = 'MetaAI';
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.META_API_KEY || process.env.META_AI_API_KEY || process.env.LLM_API_KEY || '';
    this.baseUrl = process.env.META_API_BASE_URL || 'https://api.meta.ai/v1';
    this.model = process.env.META_MODEL || 'muse-spark-1.2';
  }

  async generateResponse(messages: ChatMessage[], options: any = {}): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('META_API_KEY is not configured');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Meta AI API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';
    
    return {
      text: text.trim(),
      usage: {
        promptTokens: data?.usage?.prompt_tokens || 0,
        completionTokens: data?.usage?.completion_tokens || 0,
        totalTokens: data?.usage?.total_tokens || 0,
      },
      model: this.model,
    };
  }
}
