'use client';

import { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import SettingsModal from '@/components/SettingsModal';
import ProfileModal from '@/components/ProfileModal';
import LoginModal from '@/components/LoginModal';
import { UserProfile, AIModel } from '@/types';
import { useChat } from '@/hooks/use-chat';

export default function ChatNPInterface() {
  // --- UI & Preferences State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedModel, setSelectedModel] = useState<AIModel>('ChatNP');
  
  const [userProfile, setUserProfile] = useState<UserProfile>({ 
    name: 'Ganesh Karki', 
    email: 'ganesh@karktech.com' 
  });

  // --- Business Logic (Custom Hook) ---
  const {
    sessions,
    activeChatId,
    messages,
    isThinking,
    fetchHistory,
    selectChat,
    startNewChat,
    sendMessage,
  } = useChat();

  // --- Initial Hydration ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme((localStorage.getItem('theme') as 'light' | 'dark') || 'dark');
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try { setUserProfile(JSON.parse(savedProfile)); } catch (e) {}
      }
      fetchHistory();
    }
  }, [fetchHistory]);

  // --- Side Effects ---
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // --- Memoized Components ---
  const sidebarContent = useMemo(() => (
    <Sidebar
      isOpen={true}
      onClose={() => setIsSidebarOpen(false)}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onOpenProfile={() => setIsProfileOpen(true)}
      sessions={sessions}
      activeChatId={activeChatId}
      onSelectChat={(id) => { selectChat(id); setIsSidebarOpen(false); }}
      onNewChat={() => { startNewChat(); setIsSidebarOpen(false); }}
      user={userProfile}
    />
  ), [sessions, activeChatId, selectChat, startNewChat, userProfile]);

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 h-full flex-shrink-0 border-r border-slate-200 dark:border-slate-800">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="relative w-full max-w-sm h-[80vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Top Header Actions */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Sign in with Google"
          >
            Google Login
          </button>
        </div>

        <ChatArea
          messages={messages}
          onSend={sendMessage}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isThinking={isThinking}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </main>

      {/* Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} theme={theme} setTheme={setTheme} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={userProfile} setUser={setUserProfile} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
