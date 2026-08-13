import { useState, useCallback, useEffect } from 'react';
import { Message, ChatSession } from '@/types';
import { ChatService } from '@/lib/services/chat-service';

const DEFAULT_WELCOME_MESSAGE = 'नमस्ते! म ChatNP, कर्कटेकद्वारा निर्मित NP1 MONI हूँ। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु?';

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: DEFAULT_WELCOME_MESSAGE }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      const { chats } = await ChatService.fetchHistory();
      setSessions(chats);
      return chats;
    } catch (err) {
      console.error('Failed to fetch history:', err);
      return [];
    }
  }, []);

  const selectChat = useCallback((chatId: string) => {
    const selected = sessions.find(s => s.id === chatId);
    if (selected) {
      setActiveChatId(chatId);
      setMessages(selected.messages || []);
      setError(null);
    }
  }, [sessions]);

  const startNewChat = useCallback(() => {
    setActiveChatId(undefined);
    setMessages([{ id: 'welcome', role: 'assistant', content: DEFAULT_WELCOME_MESSAGE }]);
    setError(null);
  }, []);

  const deleteChat = useCallback(async (chatId: string) => {
    await ChatService.deleteChat(chatId);
    setSessions((currentSessions) => currentSessions.filter((session) => session.id !== chatId));

    if (activeChatId === chatId) {
      startNewChat();
    }
  }, [activeChatId, startNewChat]);

  const clearHistory = useCallback(async () => {
    await ChatService.clearHistory();
    setSessions([]);
    startNewChat();
  }, [startNewChat]);

  const sendMessage = async (content: string, fileData?: { name: string; content: string }) => {
    if ((!content.trim() && !fileData) || isThinking) return;

    let displayMessage = content;
    let fullMessageForAPI = content;

    if (fileData) {
      displayMessage = `📎 [File attached: ${fileData.name}]\n${content}`;
      fullMessageForAPI = `The user uploaded the following file and requested analysis.\nFile name: ${fileData.name}\nFile content:\n\`\`\`\n${fileData.content.slice(0, 10000)}\n\`\`\`\n\nUser question/message: ${content || 'Please summarize and analyze this file.'}`;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: displayMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsThinking(true);
    setError(null);

    try {
      const response = await ChatService.sendMessage({
        message: fullMessageForAPI,
        chatId: activeChatId,
        history: messages
          .filter((m) => m.id !== 'welcome' && m.content.trim())
          .slice(-12)
          .map((m) => ({ role: m.role, content: m.content })),
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text
      };
      
      setMessages([...updatedMessages, aiMsg]);

      if (response.chatId && !activeChatId) {
        setActiveChatId(response.chatId);
      }

      // Update local sessions list if it's a new chat
      await fetchHistory();
      
    } catch (err: any) {
      const msg = err?.message || 'We could not connect to the server right now. Please try again.';
      setError(msg);
      setMessages([...updatedMessages, { id: 'error', role: 'assistant', content: msg }]);
    } finally {
      setIsThinking(false);
    }
  };

  return {
    sessions,
    activeChatId,
    messages,
    isThinking,
    error,
    fetchHistory,
    selectChat,
    startNewChat,
    deleteChat,
    clearHistory,
    sendMessage,
  };
}
