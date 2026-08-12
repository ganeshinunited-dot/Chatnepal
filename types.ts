export type Role = 'user' | 'assistant';
export type AIModel = 'ChatNP' | 'Gemini' | 'ChatGPT' | 'Claude';

export interface Message {
  id: string;
  role: Role;
  content: string;
  isThinking?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string | null;
}
