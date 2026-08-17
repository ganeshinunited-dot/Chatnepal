'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { signOut } from 'next-auth/react';
import type { Message } from '@/types';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import { UserProfile, AIModel } from '@/types';
import { useChat } from '@/hooks/use-chat';
const SettingsModal = dynamic(() => import('@/components/SettingsModal'), { ssr: false });
const ProfileModal = dynamic(() => import('@/components/ProfileModal'), { ssr: false });
const ProfileNameModal = dynamic(() => import('@/components/ProfileNameModal'), { ssr: false });
const LoginModal = dynamic(() => import('@/components/LoginModal'), { ssr: false });
const ChatNPInstallPrompt = dynamic(() => import('@/components/ChatNPInstallPrompt'), { ssr: false });

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
  const [isNight, setIsNight] = useState(false);
  const [isInstallPromptReady, setIsInstallPromptReady] = useState(false);
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

  // Edge swipe-to-open gesture for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = Math.abs(touchEndY - touchStartY);

      // If swiping right from the left edge (startX < 40px, swipe distance > 60px, vertical diff < 50px)
      if (touchStartX < 40 && diffX > 60 && diffY < 50 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSidebarOpen]);

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
    const installPromptTimer = window.setTimeout(() => setIsInstallPromptReady(true), 1200);
    void fetchHistory();

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(installPromptTimer);
    };
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
      onClose={() => setIsSidebarOpen(false)}
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
    <div className={`relative h-screen w-screen overflow-hidden transition-colors duration-300 ${isNight ? 'bg-[#090D16] text-slate-100' : 'bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-50/30 text-slate-900'}`}>
      <div className="relative z-10 box-border flex h-full w-full gap-3 overflow-hidden bg-transparent p-2 font-sans selection:bg-blue-500/30 sm:p-3 md:gap-4 md:p-4 lg:p-5">
      {/* Desktop Sidebar */}
      <div className="hidden h-full w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 md:block">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Slide-in Drawer with Swipe Gestures */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setIsSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.2, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -300) {
                setIsSidebarOpen(false);
              }
            }}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white/90 shadow-2xl backdrop-blur-2xl dark:bg-slate-950/90"
          >
            {sidebarContent}
          </motion.div>
        </div>
      )}

      {/* Main Chat Interface */}
      <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white/28 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/30 dark:shadow-black/25">
        <ChatArea
          messages={messages}
          onSend={handleSend}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onToggleSidebar={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
          isThinking={isThinking}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          isNight={isNight}
          onToggleNight={() => setIsNight(!isNight)}
          authChecked={authChecked}
          isAuthenticated={isAuthenticated}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
      </main>

      {/* Non-critical UI is mounted on demand to reduce mobile startup work. */}
      {isSettingsOpen && <SettingsModal isOpen onClose={() => setIsSettingsOpen(false)} theme={theme} setTheme={setTheme} />}
      {isAuthenticated && isProfileOpen && (
        <ProfileModal
          isOpen
          onClose={() => setIsProfileOpen(false)}
          user={userProfile}
          onSave={saveAccountProfile}
        />
      )}
      {isLoginOpen && (
        <LoginModal
          isOpen
          onClose={() => {
            setIsLoginOpen(false);
            setIsLimitPopup(false);
          }}
          isLimitReached={isLimitPopup}
          onAuthenticated={handleAuthenticated}
        />
      )}
      {isAuthenticated && needsProfileName && (
        <ProfileNameModal
          isOpen
          email={userProfile.email}
          initialName=""
          onComplete={saveProfileName}
        />
      )}
      {isInstallPromptReady && <ChatNPInstallPrompt />}
      </div>
    </div>
  );
}
