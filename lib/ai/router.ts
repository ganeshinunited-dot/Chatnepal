import { MetaAIProvider } from './providers/meta';
import { AIProvider, ChatMessage, AIResponse } from './types';

export class AIRouter {
  private providers: AIProvider[] = [];

  constructor() {
    // Initialize with Meta AI as primary
    this.providers.push(new MetaAIProvider());
  }

  async generateResponse(messages: ChatMessage[], options: any = {}): Promise<AIResponse> {
    let lastError: Error | null = null;

    // Try providers in order (Fallback mechanism)
    for (const provider of this.providers) {
      try {
        console.log(`Attempting generation with provider: ${provider.name}`);
        return await provider.generateResponse(messages, options);
      } catch (error: any) {
        console.error(`Provider ${provider.name} failed:`, error.message);
        lastError = error;
        continue; // Try next provider
      }
    }

    throw lastError || new Error('No AI providers available');
  }
}

export const aiRouter = new AIRouter();
