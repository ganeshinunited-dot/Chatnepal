'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ArrowLeft, LoaderCircle, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type LoginStep = 'options' | 'signup' | 'signup-code' | 'signin' | 'reset' | 'reset-code';

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
      <path fill="#34A853" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#FBBC05" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#EA4335" d="M5.84 9.91l-2.85-2.22-.81-.63C3.99 3.47 7.7 1 12 1c2.97 0 5.45.98 7.36 2.87l-3.15 3.15c-1.15-1.08-2.59-1.64-4.21-1.64-2.86 0-5.29 1.93-6.16 4.53z" />
    </svg>
  );
}

function PasswordFields({ password, confirmPassword, onPasswordChange, onConfirmPasswordChange, includeConfirmation = true }: {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  includeConfirmation?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="account-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
        <input id="account-password" type="password" autoComplete={includeConfirmation ? 'new-password' : 'current-password'} value={password} onChange={(event) => onPasswordChange(event.target.value)} placeholder="At least 10 characters" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" maxLength={128} required />
      </div>
      {includeConfirmation && (
        <div>
          <label htmlFor="account-password-confirm" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm password</label>
          <input id="account-password-confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => onConfirmPasswordChange(event.target.value)} placeholder="Repeat your password" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" maxLength={128} required />
        </div>
      )}
      {includeConfirmation && <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Use 10–128 characters with at least one letter and one number.</p>}
    </div>
  );
}

export default function LoginModal({ isOpen, onClose, onAuthenticated, isLimitReached = false }: LoginModalProps) {
  const [step, setStep] = useState<LoginStep>('options');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setStep('options');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCode('');
    setError('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGoogleLogin = () => {
    window.location.assign('/api/auth/signin/google?callbackUrl=%2Fchat');
  };

  const validateNewPassword = () => {
    if (password.length < 10 || password.length > 128) {
      setError('Use a password between 10 and 128 characters.');
      return false;
    }
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError('Use at least one letter and one number in your password.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return false;
    }
    return true;
  };

  const sendVerificationCode = async (nextStep: 'signup-code' | 'reset-code') => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError('Please enter your email address.');
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
        throw new Error(payload?.error?.message || 'We could not send a verification code. Please try again.');
      }

      setEmail(payload.data.email);
      setCode('');
      setStep(nextStep);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'We could not send a verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const beginSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateNewPassword()) return;
    await sendVerificationCode('signup-code');
  };

  const configurePassword = async (mode: 'setup' | 'reset') => {
    if (!validateNewPassword()) return;
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit verification code from your email.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/v1/auth/email-password/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, code: code.trim(), mode }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error?.message || 'We could not secure this account. Please try again.');
      }

      const result = await signIn('email-password', { email, password, redirect: false });
      if (!result || result.error) {
        throw new Error('Your password was saved. Please sign in with it.');
      }

      onAuthenticated?.();
      handleClose();
    } catch (configurationError) {
      setError(configurationError instanceof Error ? configurationError.message : 'We could not secure this account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email address and password.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const result = await signIn('email-password', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (!result || result.error) {
        throw new Error('Incorrect email or password.');
      }

      onAuthenticated?.();
      handleClose();
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'We could not sign you in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const title = isLimitReached ? 'Continue with ChatNP' : step === 'signin' ? 'Welcome back' : step.startsWith('reset') ? 'Reset your password' : 'Create your ChatNP account';
  const description = isLimitReached
    ? 'You have reached the 4-message limit. Create an account or sign in to continue chatting.'
    : step === 'signin'
      ? 'Use your email and password to open your saved ChatNP account.'
      : step.startsWith('reset')
        ? 'A one-time email code proves ownership before a password can be changed.'
        : 'Create an account with your email and password. Your password is stored securely, never as readable text.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.button type="button" aria-label="Close account dialog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 cursor-default bg-slate-950/60 backdrop-blur-sm" onClick={handleClose} />

        <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:p-8" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-md shadow-blue-500/20">NP</div>
              <div>
                <h3 id="login-modal-title" className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
              </div>
            </div>
            <button onClick={handleClose} aria-label="Close" className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"><X className="h-5 w-5" /></button>
          </div>

          {step === 'options' && (
            <div className="space-y-3">
              <button onClick={handleGoogleLogin} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"><GoogleMark />Continue with Google</button>
              <button onClick={() => { setError(''); setStep('signup'); }} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700"><Mail className="h-4 w-4" />Create account with email</button>
              <p className="pt-1 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">One email address can have only one ChatNP account. Your verified email keeps your history and profile separate from other accounts.</p>
              <button type="button" onClick={() => { setError(''); setPassword(''); setStep('signin'); }} className="w-full text-center text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Already have an account? Sign in</button>
            </div>
          )}

          {step === 'signup' && (
            <form onSubmit={beginSignup} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setStep('options'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />Back</button>
              <div>
                <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</label>
                <input id="signup-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" required />
              </div>
              <PasswordFields password={password} confirmPassword={confirmPassword} onPasswordChange={setPassword} onConfirmPasswordChange={setConfirmPassword} />
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}Send verification code</button>
            </form>
          )}

          {step === 'signup-code' && (
            <form onSubmit={(event) => { event.preventDefault(); void configurePassword('setup'); }} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setStep('signup'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />Change details</button>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">We sent a 6-digit verification code to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>.</p>
              <div>
                <label htmlFor="signup-code" className="sr-only">Six digit verification code</label>
                <input id="signup-code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-center font-mono text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" maxLength={6} required />
              </div>
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}Verify and create account</button>
              <button type="button" onClick={() => { void sendVerificationCode('signup-code'); }} disabled={isSubmitting} className="w-full text-center text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400 dark:hover:text-blue-300">Send a new code</button>
            </form>
          )}

          {step === 'signin' && (
            <form onSubmit={handlePasswordSignIn} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setPassword(''); setStep('options'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />Back</button>
              <div>
                <label htmlFor="signin-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</label>
                <input id="signin-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" required />
              </div>
              <PasswordFields password={password} confirmPassword="" onPasswordChange={setPassword} onConfirmPasswordChange={() => undefined} includeConfirmation={false} />
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}Sign in</button>
              <button type="button" onClick={() => { setError(''); setPassword(''); setConfirmPassword(''); setCode(''); setStep('reset'); }} className="w-full text-center text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Forgot password?</button>
              <button type="button" onClick={() => { setError(''); setPassword(''); setConfirmPassword(''); setStep('signup'); }} className="w-full text-center text-xs font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Need to create an account?</button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={(event) => { event.preventDefault(); void sendVerificationCode('reset-code'); }} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setStep('signin'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />Back to sign in</button>
              <div>
                <label htmlFor="reset-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</label>
                <input id="reset-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" required />
              </div>
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}Send reset code</button>
            </form>
          )}

          {step === 'reset-code' && (
            <form onSubmit={(event) => { event.preventDefault(); void configurePassword('reset'); }} className="space-y-4">
              <button type="button" onClick={() => { setError(''); setStep('reset'); }} className="-ml-1 flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"><ArrowLeft className="h-3.5 w-3.5" />Change email</button>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Enter the code sent to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>, then choose a new password.</p>
              <div>
                <label htmlFor="reset-code" className="sr-only">Six digit reset code</label>
                <input id="reset-code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-center font-mono text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" maxLength={6} required />
              </div>
              <PasswordFields password={password} confirmPassword={confirmPassword} onPasswordChange={setPassword} onConfirmPasswordChange={setConfirmPassword} />
              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}Save new password</button>
              <button type="button" onClick={() => { void sendVerificationCode('reset-code'); }} disabled={isSubmitting} className="w-full text-center text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400 dark:hover:text-blue-300">Send a new code</button>
            </form>
          )}

          <p className="mt-6 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">By continuing, you agree to ChatNP&apos;s Terms of Service and Privacy Policy.</p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
