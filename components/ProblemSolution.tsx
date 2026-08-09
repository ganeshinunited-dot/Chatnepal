"use client";
import { motion } from "motion/react";
import { Globe, Target } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="mx-auto w-full max-w-7xl scroll-mt-32 px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 md:p-10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-semibold text-white">The Problem</h3>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Nepal has <span className="text-white font-medium">16.6M internet users</span> and <span className="text-white font-medium">85.1% smartphone ownership</span>—yet global AI platforms are not built for Nepal. They are trained predominantly on English-centric data, leaving morphologically complex languages like Nepali with significant capability gaps.
          </p>
          <div className="rounded-xl border border-red-500/15 bg-black/20 px-4 py-3 mb-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <span className="text-red-400 font-semibold">The Token Tax:</span> English-optimized tokenizers destroy Nepali semantic context and require significantly more compute power to process the language.
            </p>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-red-400 font-bold">•</span>
              <span className="text-zinc-400">Limited Nepali language understanding</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400 font-bold">•</span>
              <span className="text-zinc-400">No cultural or local context awareness</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400 font-bold">•</span>
              <span className="text-zinc-400">Designed for global markets, not Nepal's needs</span>
            </li>
          </ul>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-8 md:p-10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-semibold text-white">Our Solution</h3>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">
            ChatNP is a Nepal-first AI platform built with <span className="text-white font-medium">Contextual Intelligence</span>—purpose-built, not a wrapper. Deep Nepali NLP handles grammar, honorifics, and morphology natively, while proprietary RAG pipelines inject localized knowledge.
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-400">Deep Nepali NLP — grammar, honorifics &amp; morphology</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-400">Culturally aware and locally relevant</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-400">Designed for Nepal's unique opportunities</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
