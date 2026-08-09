"use client";
import Link from 'next/link';
import { motion } from "motion/react";
import { Sparkles, MessageSquare, ArrowRight, Clock } from "lucide-react";

export function ChatNPProduct() {
  return (
    <section id="chatnp" className="mx-auto w-full max-w-7xl scroll-mt-32 px-4 sm:px-6">
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
        {/* NP1 MONI — Currently Available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-brand-blue/30 bg-white/5 p-8 backdrop-blur-sm transition-colors"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-brand-blue-bright" />
            <h3 className="text-xl font-semibold text-white">NP1 MONI</h3>
            <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-[10px] font-semibold text-blue-300 uppercase tracking-wide">Now Live</span>
          </div>
          <p className="text-zinc-400 mb-6">
            The single, unified ChatNP model — optimized for speed and everyday tasks, grounded in real-time information, and tuned for Nepali language.
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex gap-2">
              <span className="text-brand-blue-bright">→</span> Quick responses for daily questions
            </li>
            <li className="flex gap-2">
              <span className="text-brand-blue-bright">→</span> Real-time web search integration
            </li>
            <li className="flex gap-2">
              <span className="text-brand-blue-bright">→</span> Nepali language optimized
            </li>
          </ul>
        </motion.div>

        {/* Specialized Models — Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-brand-red" />
            <h3 className="text-xl font-semibold text-white">Specialized Models</h3>
            <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 text-[10px] font-semibold text-red-300 uppercase tracking-wide">Coming Soon</span>
          </div>
          <p className="text-zinc-400 mb-6">
            A family of Nepal-focused specialized AI models currently in development.
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex gap-2">
              <span className="text-brand-red">→</span> Sovereign 7B — fully sovereign Nepali AI
            </li>
            <li className="flex gap-2">
              <span className="text-brand-red">→</span> Agri-Specialist — agriculture intelligence
            </li>
            <li className="flex gap-2">
              <span className="text-brand-red">→</span> Legal & Tax AI — Nepali regulations
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Three High-Impact Verticals (deck) */}
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {[
          { title: "Agriculture", stat: "60% of workforce", desc: "Crop disease diagnosis and live market prices for Nepali farmers." },
          { title: "Education", stat: "7M students", desc: "AI tutors addressing Nepal's 46:1 student-teacher ratio." },
          { title: "SME & Business", stat: "Local enterprises", desc: "Accounting, document drafting, and daily business workflows." },
        ].map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-brand-blue/25 hover:bg-brand-blue/5 hover:-translate-y-1"
          >
            <p className="text-lg font-semibold text-white mb-1">{v.title}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-blue-bright mb-3">{v.stat}</p>
            <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Current Status & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-8 md:p-10 text-center"
      >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/25 text-xs font-semibold text-blue-300 mb-6 uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-blue-bright animate-pulse" />
          <span>Active MVP</span>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">Ready to Experience ChatNP?</h3>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          ChatNP is a working prototype available for testing today — powered by a single unified NP1 MONI model, built for native Nepali AI.
        </p>
        <Link 
          href="/chat" 
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-brand-blue-bright"
        >
          <MessageSquare className="w-4 h-4" />
          Launch ChatNP
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
