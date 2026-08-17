'use client';

import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  isNight: boolean;
  onToggle: () => void;
  className?: string;
}

export default function ThemeToggle({ isNight, onToggle, className = '' }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={`relative flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm ${
        isNight
          ? 'border-white/20 bg-slate-900/60 text-amber-300 shadow-black/20 hover:bg-slate-950/80'
          : 'border-white/50 bg-white/60 text-slate-700 shadow-slate-900/10 hover:bg-white/80'
      } ${className}`}
      title={isNight ? 'Switch to Day mode' : 'Switch to Night mode'}
      aria-label={isNight ? 'Switch to Day mode' : 'Switch to Night mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isNight ? 360 : 0, scale: [1, 1.2, 1] }}
        transition={{ duration: 0.4 }}
      >
        {isNight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.div>
    </button>
  );
}
