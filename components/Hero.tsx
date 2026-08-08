"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-12 text-center sm:px-6 md:pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-8 backdrop-blur-sm"
      >
        <Sparkles className="w-4 h-4 text-orange-500" />
        <span>ChatNP Prototype Completed</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl font-heading text-4xl font-medium leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-7xl lg:text-8xl"
      >
        Building Nepal's Future with <br className="hidden md:block" />
        <motion.span 
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="bg-[linear-gradient(to_right,#fb923c,#ef4444,#fb923c)] text-transparent bg-clip-text bg-[length:200%_auto] inline-block mt-2"
        >
          Artificial Intelligence
        </motion.span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl text-base text-zinc-400 text-balance sm:mt-8 sm:text-lg md:text-xl"
      >
        KarkTech is creating AI products designed for Nepal, starting with ChatNP. Bridging the digital divide with culturally-aware, native-language intelligence.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
      >
        <Link 
          href="/chat" 
          className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-600 px-6 font-bold text-white shadow-lg shadow-orange-900/20 transition-all hover:bg-orange-700 sm:w-auto sm:px-8"
        >
          Try ChatNP
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <DownloadLink className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-6 font-bold text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-800 sm:w-auto sm:px-8"><Download className="w-4 h-4 text-zinc-400" />Download Investor PDF</DownloadLink>
      </motion.div>
    </section>
  );
}
