export type Role = 'user' | 'assistant' | 'system';
export type AIModel = 'ChatNP' | 'Gemini' | 'ChatGPT' | 'Claude';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isThinking?: boolean;
  createdAt?: Date | string;
}

export interface ChatSession {
  id: string;
  title: string;
  userId: string;
  messages?: Message[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  emailVerified?: Date | string | null;
}

export interface APIError {
  code: string;
  message: string;
  requestId?: string;
}

export interface StandardResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
}
