import { Message, ChatSession } from '@/types';

export interface ChatRequest {
  message: string;
  chatId?: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface ChatResponse {
  text: string;
  chatId?: string;
}

export class ChatService {
  private static BASE_URL = '/api/v1';

  static async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `API Error: ${response.status}`);
      }

      // Handle the robust API response format
      return {
        text: data.text || data.data?.text,
        chatId: data.chatId || data.data?.chatId,
      };
    } catch (error: any) {
      console.error('ChatService.sendMessage failed:', error);
      throw error;
    }
  }

  static async deleteChat(chatId: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/chats?chatId=${encodeURIComponent(chatId)}`, {
      method: 'DELETE',
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      throw new Error(data?.error?.message || 'Unable to delete this chat.');
    }
  }

  static async clearHistory(): Promise<number> {
    const response = await fetch(`${this.BASE_URL}/chats`, { method: 'DELETE' });
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      throw new Error(data?.error?.message || 'Unable to clear chat history.');
    }

    return Number(data.data?.deleted || 0);
  }

  static async fetchHistory(limit = 20, cursor?: string): Promise<{ chats: ChatSession[], nextCursor: string | null }> {
    try {
      const url = new URL(`${window.location.origin}${this.BASE_URL}/chats`);
      url.searchParams.append('limit', limit.toString());
      if (cursor) url.searchParams.append('cursor', cursor);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch history');
      }

      // data.data because of the consistent APIResponse format we implemented
      return {
        chats: data.data?.chats || [],
        nextCursor: data.data?.nextCursor || null,
      };
    } catch (error: any) {
      console.error('ChatService.fetchHistory failed:', error);
      return { chats: [], nextCursor: null };
    }
  }
}
