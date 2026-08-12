'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import SettingsModal from '@/components/SettingsModal';
import ProfileModal from '@/components/ProfileModal';
import { Message, ChatSession, UserProfile, AIModel } from '@/types';

const INITIAL_SESSIONS: ChatSession[] = [];

export default function ChatNPInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : { name: 'Ganesh Karki', email: 'ganesh@karktech.com' };
    }
    return { name: 'Ganesh Karki', email: 'ganesh@karktech.com' };
  });
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'नमस्ते! म ChatNP, कर्कटेकद्वारा निर्मित NP1 MONI हूँ। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु? तपाई फाइल पनि अपलोड गरेर विश्लेषण गराउन सक्नुहुन्छ।' }
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

  const handleSend = async (content: string, fileData?: { name: string; content: string }) => {
    if ((!content.trim() && !fileData) || isThinking) return;

    let displayMessage = content;
    let fullMessageForAPI = content;

    if (fileData) {
      displayMessage = `📎 [फाइल संलग्न: ${fileData.name}]\n${content}`;
      fullMessageForAPI = `प्रयोगकर्ताले तलको फाइल अपलोड गरेका छन् र यसको विश्लेषण गर्न अनुरोध गरेका छन्।\nफाइलको नाम: ${fileData.name}\nफाइलको सामग्री:\n\`\`\`\n${fileData.content.slice(0, 10000)}\n\`\`\`\n\nप्रयोगकर्ताको प्रश्न/सन्देश: ${content || 'यस फाइलको सारांश र विश्लेषण गर्नुहोस्।'}`;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: displayMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: fullMessageForAPI,
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
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      const errorMessage = error?.message || 'माफ गर्नुहोला, अहिले सर्भरमा जडान गर्न समस्या भइरहेको छ। कृपया फेरि प्रयास गर्नुहोला।';
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage
      };
      setMessages((prev) => [...prev, aiMsg]);
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
          sessions={INITIAL_SESSIONS}
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
              sessions={INITIAL_SESSIONS}
              user={userProfile}
            />
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 dark:bg-slate-900 transition-colors">
        <ChatArea
          messages={messages}
          onSend={(content) => handleSend(content)}
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
    </div>
  );
}
