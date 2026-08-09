"use client";
import Link from 'next/link';
import { motion } from "motion/react";
import { Zap, Brain, MessageSquare, ArrowRight } from "lucide-react";

export function ChatNPProduct() {
  return (
    <section className="mx-auto w-full max-w-7xl scroll-mt-32 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-4">ChatNP: Our First Major Product</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          A working prototype of a native-language AI assistant designed specifically for Nepal. Try it today.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* ChatNP Fast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm hover:border-orange-500/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-semibold text-white">ChatNP Fast</h3>
          </div>
          <p className="text-zinc-400 mb-6">
            Optimized for speed and everyday tasks. Grounded in real-time information via Google Search.
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex gap-2">
              <span className="text-orange-400">→</span> Quick responses for daily questions
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400">→</span> Real-time web search integration
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400">→</span> Nepali language optimized
            </li>
          </ul>
        </motion.div>

        {/* ChatNP Advanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">ChatNP Advanced</h3>
          </div>
          <p className="text-zinc-400 mb-6">
            High-reasoning model for complex analysis, deep thinking, and nuanced problem-solving.
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex gap-2">
              <span className="text-blue-400">→</span> Deep reasoning and analysis
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">→</span> Complex problem-solving
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">→</span> High-quality outputs
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Current Status & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8 md:p-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 mb-6 uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Active MVP</span>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">Ready to Experience ChatNP?</h3>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          ChatNP is a working prototype available for testing today. Try both Fast and Advanced modes to see native Nepali AI in action.
        </p>
        <Link 
          href="/chat" 
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 font-bold text-white shadow-lg shadow-orange-900/20 transition-all hover:bg-orange-700"
        >
          <MessageSquare className="w-4 h-4" />
          Launch ChatNP
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
