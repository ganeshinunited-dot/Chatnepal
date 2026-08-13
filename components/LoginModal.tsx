'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ArrowLeft, LoaderCircle, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type LoginStep = 'options' | 'email' | 'code';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
  isLimitReached?: boolean;
}

function GoogleMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

export default function LoginModal({ isOpen, onClose, onAuthenticated, isLimitReached = false }: LoginModalProps) {
  const [step, setStep] = useState<LoginStep>('options');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep('options');
      setCode('');
      setError('');
      setIsSubmitting(false);
      setResendIn(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setInterval(() => setResendIn((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [resendIn]);

  const handleGoogleLogin = () => {
    window.location.assign('/api/auth/signin/google?callbackUrl=%2Fchat');
  };

  const requestCode = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError('पहिले आफ्नो email address राख्नुहोस्।');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v1/auth/email-login/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error?.message || 'Code पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।');
      }

      setEmail(payload.data.email);
      setCode('');
      setStep('code');
      setResendIn(60);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Code पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Email मा आएको ६-अङ्कको code राख्नुहोस्।');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await signIn('email-otp', {
        email,
        code: code.trim(),
        redirect: false,
      });

      if (!result || result.error) {
        throw new Error('Code मिलेन वा समय सकियो। नयाँ code लिएर फेरि प्रयास गर्नुहोस्।');
      }

      onAuthenticated?.();
      onClose();
    } catch (verificationError) {
      setError(verificationError instanceof Error ? verificationError.message : 'Login पूरा हुन सकेन।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const title = isLimitReached ? 'View more with ChatNP' : 'Login to ChatNP';
  const description = isLimitReached
    ? 'तपाईंले ४ वटा सन्देश पूरा गर्नुभयो। कुराकानी जारी राख्न Login गर्नुहोस्।'
    : 'आफ्नो कुराकानी सुरक्षित राख्न Login गर्नुहोस्।';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.button
          type="button"
          aria-label="Close login dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-default bg-slate-950/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-md shadow-blue-500/20">NP</div>
              <div>
                <h3 id="login-modal-title" className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {step === 'options' && (
            <div className="space-y-3">
              <button onClick={handleGoogleLogin} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                <GoogleMark />
                Continue with Google
              </button>
              <button onClick={() => { setError(''); setStep('email'); }} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700">
                <Mail className="h-4 w-4" />
                Continue with email code
              </button>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={requestCode} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setStep('options'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</label>
                <input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" required />
              </div>
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Send login code
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={verifyCode} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setStep('email'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5" /> Change email
              </button>
              <div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">We sent a 6-digit code to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>.</p>
                <label htmlFor="login-code" className="sr-only">Six digit login code</label>
                <input id="login-code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="mt-4 h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-center font-mono text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" maxLength={6} required />
              </div>
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Verify and login
              </button>
              <button type="button" onClick={() => requestCode()} disabled={isSubmitting || resendIn > 0} className="w-full text-center text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400 dark:hover:text-blue-300">
                {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">By continuing, you agree to ChatNP&apos;s Terms of Service and Privacy Policy.</p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
