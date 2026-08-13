"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-12 text-center sm:px-6 md:pt-24">
      {/* Desktop-only advanced visual: floating Nepali script glow behind headline */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-[12%] left-[6%] select-none font-heading text-[110px] font-bold leading-none text-blue-500/[0.05]"
        >
              NEPAL
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="absolute bottom-[8%] right-[8%] select-none font-heading text-[90px] font-bold leading-none text-red-500/[0.05]"
        >
          AI
        </motion.span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/25 text-xs font-semibold text-blue-300 mb-8 backdrop-blur-sm uppercase tracking-wide"
      >
        <span className="w-2 h-2 rounded-full bg-brand-blue-bright animate-pulse" />
        <span>Working Prototype</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl font-heading text-4xl font-medium leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
      >
        ChatNP: Nepal's <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">Contextual AI</span> Platform
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl text-base text-zinc-400 text-balance sm:mt-8 sm:text-lg md:text-lg"
      >
        ChatNP is the Nepal-first AI platform — purpose-built contextual intelligence for Nepal's language, culture, and local context. Empowering Nepal through Artificial Intelligence.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
      >
        <Link 
          href="/chat" 
          className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-blue px-6 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-brand-blue-bright hover:shadow-blue-800/40 hover:-translate-y-0.5 sm:w-auto sm:px-8"
        >
          Try ChatNP
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <DownloadLink className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-6 font-bold text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-800 hover:-translate-y-0.5 sm:w-auto sm:px-8"><Download className="w-4 h-4 text-zinc-400" />View Investor Deck</DownloadLink>
      </motion.div>

      {/* Desktop-only stats strip under CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 hidden lg:flex items-center justify-center gap-16 border-t border-white/5 pt-8 w-full max-w-3xl"
      >
        <div className="text-center">
          <p className="font-heading text-3xl font-bold text-white">16.6M+</p>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">Internet Users in Nepal</p>
        </div>
        <div className="text-center">
          <p className="font-heading text-3xl font-bold text-white">NP1</p>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">Native AI Model</p>
        </div>
        <div className="text-center">
          <p className="font-heading text-3xl font-bold text-white">24/7</p>
          <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">AI Assistant Access</p>
        </div>
      </motion.div>
    </section>
  );
}
