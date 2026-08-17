'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { signOut } from 'next-auth/react';
import type { Message } from '@/types';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import SettingsModal from '@/components/SettingsModal';
import ProfileModal from '@/components/ProfileModal';
import ProfileNameModal from '@/components/ProfileNameModal';
import LoginModal from '@/components/LoginModal';
import { UserProfile, AIModel } from '@/types';
import { useChat } from '@/hooks/use-chat';
import DayNightBackground from '@/components/DayNightBackground';
import ChatNPInstallPrompt from '@/components/ChatNPInstallPrompt';

type AccountProfile = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: string | null;
  requiresName: boolean;
};

const guestProfile: UserProfile = {
  name: 'Guest',
  email: '',
};

function toUserProfile(profile: AccountProfile): UserProfile {
  return {
    id: profile.id,
    name: profile.name?.trim() || 'ChatNP member',
    email: profile.email || '',
    avatarUrl: profile.image,
    emailVerified: profile.emailVerified,
  };
}

export default function ChatNPInterface() {
  // --- UI & Preferences State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLimitPopup, setIsLimitPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [needsProfileName, setNeedsProfileName] = useState(false);
  const [isManagingHistory, setIsManagingHistory] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedModel, setSelectedModel] = useState<AIModel>('ChatNP');
  const [userProfile, setUserProfile] = useState<UserProfile>(guestProfile);

  // --- Business Logic (Custom Hook) ---
  const {
    sessions,
    activeChatId,
    messages,
    isThinking,
    fetchHistory,
    selectChat,
    startNewChat,
    deleteChat,
    clearHistory,
    sendMessage,
  } = useChat();

  const guestMessageCount = messages.filter((message: Message) => message.role === 'user').length;

  const syncAccountProfile = useCallback(async () => {
    const response = await fetch('/api/v1/auth/profile', { cache: 'no-store' });
    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success || !payload?.data?.profile) {
      throw new Error(payload?.error?.message || 'Unable to load your profile.');
    }

    const profile = payload.data.profile as AccountProfile;
    setUserProfile(toUserProfile(profile));
    setNeedsProfileName(profile.requiresName);
    return profile;
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/auth/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((session) => {
        if (cancelled) return;

        const signedIn = Boolean(session?.user);
        setIsAuthenticated(signedIn);
        setAuthChecked(true);

        if (!signedIn) {
          setNeedsProfileName(false);
          setUserProfile(guestProfile);
          return;
        }

        void syncAccountProfile().catch(() => undefined);
      })
      .catch(() => {
        if (!cancelled) setAuthChecked(true);
      });

    return () => {
      cancelled = true;
    };
  }, [syncAccountProfile]);

  const handleAuthenticated = useCallback(() => {
    setIsAuthenticated(true);
    setAuthChecked(true);
    setIsLimitPopup(false);
    void fetchHistory();
    void syncAccountProfile().catch(() => undefined);
  }, [fetchHistory, syncAccountProfile]);

  const saveAccountProfile = useCallback(async ({ name, image }: { name: string; image?: string | null }) => {
    const response = await fetch('/api/v1/auth/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ...(image !== undefined ? { image } : {}) }),
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success || !payload?.data?.profile) {
      throw new Error(payload?.error?.message || 'Unable to save your profile.');
    }

    const profile = payload.data.profile as AccountProfile;
    setUserProfile(toUserProfile(profile));
    setNeedsProfileName(profile.requiresName);
  }, []);

  const saveProfileName = useCallback(async (name: string) => {
    await saveAccountProfile({ name });
  }, [saveAccountProfile]);

  const handleDeleteChat = useCallback(async (chatId: string) => {
    const chat = sessions.find((session) => session.id === chatId);
    const chatLabel = chat?.title || 'this chat';

    if (!window.confirm(`Delete “${chatLabel}”? This cannot be undone.`)) return;

    setIsManagingHistory(true);
    try {
      await deleteChat(chatId);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to delete this chat. Please try again.');
    } finally {
      setIsManagingHistory(false);
    }
  }, [deleteChat, sessions]);

  const handleClearHistory = useCallback(async () => {
    if (!window.confirm('Delete all chat history? This cannot be undone.')) return;

    setIsManagingHistory(true);
    try {
      await clearHistory();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to clear chat history. Please try again.');
    } finally {
      setIsManagingHistory(false);
    }
  }, [clearHistory]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut({ redirect: false, redirectTo: '/chat' });
    } finally {
      setIsAuthenticated(false);
      setNeedsProfileName(false);
      setUserProfile(guestProfile);
      startNewChat();
      window.location.assign('/chat');
    }
  }, [startNewChat]);

  const handleSend = useCallback(async (content: string, fileData?: { name: string; content: string }) => {
    const nextGuestMessageCount = guestMessageCount + 1;

    // The fourth message is allowed to complete. The popup appears afterwards;
    // the fifth message is blocked until the guest signs in.
    if (authChecked && !isAuthenticated && guestMessageCount >= 4) {
      setIsLimitPopup(true);
      setIsLoginOpen(true);
      return;
    }

    await sendMessage(content, fileData);

    if (authChecked && !isAuthenticated && nextGuestMessageCount >= 4) {
      setIsLimitPopup(true);
      setIsLoginOpen(true);
    }
  }, [authChecked, guestMessageCount, isAuthenticated, sendMessage]);

  // --- Initial Hydration ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    const frame = window.requestAnimationFrame(() => setTheme(savedTheme));
    void fetchHistory();

    return () => window.cancelAnimationFrame(frame);
  }, [fetchHistory]);

  // --- Side Effects ---
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);


  // --- Memoized Components ---
  const sidebarContent = useMemo(() => (
    <Sidebar
      isOpen={true}
      isCollapsed={false}
      onClose={() => setIsSidebarOpen(false)}
      onToggleCollapse={() => setIsSidebarCollapsed(true)}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onOpenProfile={() => setIsProfileOpen(true)}
      sessions={sessions}
      activeChatId={activeChatId}
      onSelectChat={(id) => { selectChat(id); setIsSidebarOpen(false); }}
      onNewChat={() => { startNewChat(); setIsSidebarOpen(false); }}
      onDeleteChat={(chatId) => { void handleDeleteChat(chatId); }}
      onClearHistory={() => { void handleClearHistory(); }}
      isManagingHistory={isManagingHistory}
      isAuthenticated={isAuthenticated}
      onLogout={() => { void handleLogout(); }}
      user={userProfile}
    />
  ), [sessions, activeChatId, selectChat, startNewChat, handleDeleteChat, handleClearHistory, isManagingHistory, isAuthenticated, handleLogout, userProfile]);

  return (
    <DayNightBackground>
      <div className="relative z-10 box-border flex h-full w-full gap-3 overflow-hidden bg-transparent p-2 font-sans text-slate-900 selection:bg-blue-500/30 sm:p-3 md:gap-4 md:p-4 lg:p-5 dark:bg-transparent dark:text-slate-100">
      {/* Desktop Sidebar */}
      <div className={`hidden h-full flex-shrink-0 transition-[width] duration-300 ease-out md:block ${isSidebarCollapsed ? 'w-[68px]' : 'w-72 lg:w-80'}`}>
        {isSidebarCollapsed ? (
          <aside className="flex h-full flex-col items-center rounded-[26px] border border-white/35 bg-white/35 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/35 dark:shadow-black/20">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/50 bg-white/45 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
              title="Open sidebar"
              aria-label="Open sidebar"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </button>
            <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/50 bg-white/45 shadow-sm dark:border-white/10 dark:bg-white/10">
              <span className="text-sm font-black tracking-tight text-blue-600 dark:text-blue-300">C</span>
            </div>
            <span className="mt-auto -rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500/80 dark:text-slate-300/70">ChatNP</span>
          </aside>
        ) : sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="relative h-[80vh] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 dark:bg-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white/28 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/30 dark:shadow-black/25">
        {/* Login is shown only to confirmed guests and disappears immediately after a successful sign-in. */}
        {authChecked && !isAuthenticated && (
          <div className="absolute right-4 top-4 z-30">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="cursor-pointer rounded-full border border-white/20 bg-blue-600/90 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
              aria-label="Login"
            >
              Login
            </button>
          </div>
        )}

        <ChatArea
          messages={messages}
          onSend={handleSend}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onToggleSidebar={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
          isThinking={isThinking}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </main>

      {/* Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} theme={theme} setTheme={setTheme} />
      {isAuthenticated && isProfileOpen && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={userProfile}
          onSave={saveAccountProfile}
        />
      )}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          setIsLimitPopup(false);
        }}
        isLimitReached={isLimitPopup}
        onAuthenticated={handleAuthenticated}
      />
      <ProfileNameModal
        isOpen={isAuthenticated && needsProfileName}
        email={userProfile.email}
        initialName=""
        onComplete={saveProfileName}
      />
      <ChatNPInstallPrompt />
      </div>
    </DayNightBackground>
  );
}
