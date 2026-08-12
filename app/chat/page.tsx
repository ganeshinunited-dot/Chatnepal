'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import SettingsModal from '@/components/SettingsModal';
import ProfileModal from '@/components/ProfileModal';
import LoginModal from '@/components/LoginModal';
import { Message, ChatSession, UserProfile, AIModel } from '@/types';

export default function ChatNPInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : { name: 'Ganesh Karki', email: 'ganesh@karktech.com' };
    }
    return { name: 'Ganesh Karki', email: 'ganesh@karktech.com' };
  });
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'नमस्ते! म ChatNP, कर्कटेकद्वारा निर्मित NP1 MONI हूँ। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु?' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>('ChatNP');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Fetch chat history from DB on load
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('/api/chats');
        const data = await res.json();
        if (data.chats && Array.isArray(data.chats)) {
          setSessions(data.chats);
          if (data.chats.length > 0 && !activeChatId) {
            // Load the most recent chat by default
            const latest = data.chats[0];
            setActiveChatId(latest.id);
            if (latest.messages && latest.messages.length > 0) {
              setMessages(latest.messages.map((m: any) => ({
                id: m.id,
                role: m.role,
                content: m.content
              })));
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch chat history', err);
      }
    }
    fetchHistory();
  }, []);

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    const selected = sessions.find(s => s.id === chatId);
    if (selected && selected.messages) {
      setMessages(selected.messages.map((m: any) => ({
        id: m.id,
        role: m.role,
        content: m.content
      })));
    }
  };

  const handleNewChat = () => {
    setActiveChatId(undefined);
    setMessages([
      { id: Date.now().toString(), role: 'assistant', content: 'नमस्ते! नयाँ च्याट सुरु भएको छ। म तपाईंलाई कसरी मद्दत गर्न सक्छु?' }
    ]);
  };

  const handleSend = async (content: string, fileData?: { name: string; content: string }) => {
    if ((!content.trim() && !fileData) || isThinking) return;

    let displayMessage = content;
    let fullMessageForAPI = content;

    if (fileData) {
      displayMessage = `📎 [फाइल संलग्न: ${fileData.name}]\n${content}`;
      fullMessageForAPI = `प्रयोगकर्ताले तलको फाइल अपलोड गरेका छन् र यसको विश्लेषण गर्न अनुरोध गरेका छन्।\nफाइलको नाम: ${fileData.name}\nफाइलको सामग्री:\n\`\`\`\n${fileData.content.slice(0, 10000)}\n\`\`\`\n\nप्रयोगकर्ताको प्रश्न/सन्देश: ${content || 'यस फाइलको सारांश र विश्लेषण गर्नुहोस्।'}`;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: displayMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: fullMessageForAPI,
          chatId: activeChatId,
          history: messages
            .filter((m) => m.content.trim())
            .slice(-12)
            .map((m) => ({ role: m.role, content: m.content })),
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.text || `API error: ${res.status}`);
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text
      };
      setMessages([...updatedMessages, aiMsg]);

      if (data.chatId && !activeChatId) {
        setActiveChatId(data.chatId);
      }

      // Refresh sessions
      const chatsRes = await fetch('/api/chats');
      const chatsData = await chatsRes.json();
      if (chatsData.chats) {
        setSessions(chatsData.chats);
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'माफ गर्नुहोला, अहिले सर्भरमा जडान गर्न समस्या भइरहेको छ। कृपया फेरि प्रयास गर्नुहोला।';
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage
      };
      setMessages([...updatedMessages, aiMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <Sidebar
          isOpen={true}
          onClose={() => {}}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          sessions={sessions}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          user={userProfile}
        />
      </div>

      {/* Mobile Sidebar Modal Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-full max-w-sm h-[75vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onOpenSettings={() => {
                setIsSidebarOpen(false);
                setIsSettingsOpen(true);
              }}
              onOpenProfile={() => {
                setIsSidebarOpen(false);
                setIsProfileOpen(true);
              }}
              sessions={sessions}
              activeChatId={activeChatId}
              onSelectChat={(id) => { handleSelectChat(id); setIsSidebarOpen(false); }}
              onNewChat={() => { handleNewChat(); setIsSidebarOpen(false); }}
              user={userProfile}
            />
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Google Login</span>
          </button>
        </div>
        <ChatArea
          messages={messages}
          onSend={(content, fileData) => handleSend(content, fileData)}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isThinking={isThinking}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </div>

      {/* Global Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        theme={theme}
        setTheme={setTheme}
      />
      
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={userProfile}
        setUser={setUserProfile}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}
