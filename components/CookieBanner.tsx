"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(!localStorage.getItem('cookiesAccepted'));
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex gap-4 items-start md:items-center">
                <div className="bg-orange-500/20 p-3 rounded-full hidden md:block">
                  <Cookie className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">We use cookies</h3>
                  <p className="text-sm text-zinc-400">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={handleDecline}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/20 text-sm"
                >
                  Accept All
                </button>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 md:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
