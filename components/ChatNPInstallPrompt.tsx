'use client';

import { useCallback, useEffect, useState } from 'react';
import { Download, Plus, Share2, Smartphone, X } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const DISMISS_KEY = 'chatnp-install-prompt-dismissed-at';
const DISMISS_DURATION_MS = 1000 * 60 * 60 * 24 * 14;

function isStandaloneApp() {
  return window.matchMedia('(display-mode: standalone)').matches
    || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

export default function ChatNPInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isStandaloneApp()) return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || '0');
    if (Date.now() - dismissedAt < DISMISS_DURATION_MS) return;

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/chat-sw.js', { scope: '/chat' }).catch(() => undefined);
    }

    const userAgent = window.navigator.userAgent;
    const usesIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);

    if (usesIOS) {
      const timer = window.setTimeout(() => {
        setIsIOS(true);
        setIsVisible(true);
      }, 1200);
      return () => window.clearTimeout(timer);
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      window.setTimeout(() => setIsVisible(true), 800);
    };

    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
      }
    } finally {
      setDeferredPrompt(null);
      setIsInstalling(false);
      setIsVisible(false);
    }
  }, [deferredPrompt]);

  if (!isVisible) return null;

  return (
    <aside
      className="fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-blue-200/80 bg-white/95 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-blue-400/20 dark:bg-slate-950/95"
      role="dialog"
      aria-label="Install ChatNP app"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        aria-label="Dismiss install prompt"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex gap-3 pr-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30">
          <span className="text-xl font-bold">C</span>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-950 dark:text-white">Install ChatNP</p>
          <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-300">
            Use ChatNP as a fast, full-screen app from your device.
          </p>
        </div>
      </div>

      {isIOS ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs leading-5 text-blue-950 dark:bg-blue-500/10 dark:text-blue-100">
          <Share2 className="h-4 w-4 shrink-0" />
          <span>Tap <strong>Share</strong>, then <strong><Plus className="mx-0.5 inline h-3 w-3" /> Add to Home Screen</strong>.</span>
        </div>
      ) : deferredPrompt ? (
        <button
          type="button"
          onClick={() => void install()}
          disabled={isInstalling}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
        >
          <Download className="h-4 w-4" />
          {isInstalling ? 'Opening install…' : 'Download app'}
        </button>
      ) : (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-xs leading-5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <Smartphone className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>Open your browser menu and choose <strong>Install ChatNP</strong>.</span>
        </div>
      )}
    </aside>
  );
}
