"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative px-6 pt-16 md:pt-24 max-w-7xl mx-auto flex flex-col items-center text-center">
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
        className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-balance leading-[1.1] text-white max-w-4xl"
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
        className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl text-balance"
      >
        KarkTech is creating AI products designed for Nepal, starting with ChatNP. Bridging the digital divide with culturally-aware, native-language intelligence.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <Link 
          href="/chat" 
          className="w-full sm:w-auto group relative flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all overflow-hidden shadow-lg shadow-orange-900/20"
        >
          Try ChatNP
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <DownloadLink className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 font-bold hover:bg-zinc-800 transition-colors backdrop-blur-sm"><Download className="w-4 h-4 text-zinc-400" />Download Investor PDF</DownloadLink>
      </motion.div>
    </section>
  );
}
