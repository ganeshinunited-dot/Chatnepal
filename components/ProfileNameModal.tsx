'use client';

import { useState } from 'react';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileNameModalProps {
  isOpen: boolean;
  email: string;
  initialName?: string;
  onComplete: (name: string) => Promise<void>;
}

export default function ProfileNameModal({ isOpen, email, initialName = '', onComplete }: ProfileNameModalProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedName = name.trim().replace(/\s+/g, ' ');

    if (normalizedName.length < 2 || normalizedName.length > 80) {
      setError('Please enter a name between 2 and 80 characters.');
      return;
    }

    setError('');
    setIsSaving(true);

    try {
      await onComplete(normalizedName);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'We could not save your name. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-name-title"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Welcome to ChatNP</p>
            <h2 id="profile-name-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">What should we call you?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">This name appears only in your ChatNP profile and chat history.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="profile-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Your name</label>
              <input
                id="profile-name"
                type="text"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="For example, Ganesh Karki"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                maxLength={80}
                required
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Verified email: {email}</p>
            </div>

            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isSaving}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Continue to ChatNP
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
