"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { ArrowRight, MessageSquare, Code, Languages, FileText, Sparkles } from 'lucide-react';
import { motion } from "motion/react";

export function ChatNPPreview() {
  const features = [
    { icon: <MessageSquare className="w-5 h-5" />, title: 'AI Chat', desc: 'Conversational interface optimized for Nepali and English.' },
    { icon: <Languages className="w-5 h-5" />, title: 'Nepali Language AI', desc: 'Specialized NLP handling Nepali grammar, honorifics, and morphology.' },
    { icon: <Code className="w-5 h-5" />, title: 'Coding Assistant', desc: 'AI-powered code generation and debugging.' },
    { icon: <FileText className="w-5 h-5" />, title: 'Document Analysis', desc: 'Summarize and extract insights from uploaded files.' },
  ];

  return (
    <section id="chatnp" className="px-6 max-w-7xl mx-auto w-full scroll-mt-32">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">Meet ChatNP</h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          A generative AI platform designed for Nepal. It serves as a unified interface for conversational chat, specialized education assistants, and localized knowledge.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 mb-4">
                  {f.icon}
                </div>
                <h4 className="text-white font-medium mb-2">{f.title}</h4>
                <p className="text-sm text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>

          <Link 
            href="/chat" 
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/20"
          >
            Launch Prototype
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Decorative Mockup */}
          <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-900/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center text-[10px] font-black text-white">NP</div>
                <span className="text-sm font-semibold text-white">ChatNP <span className="text-xs text-zinc-500 font-normal">Web Prototype</span></span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
              </div>
            </div>
            <div className="p-6 h-[400px] flex flex-col gap-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <span className="text-xs text-zinc-300 font-medium">U</span>
                </div>
                <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none text-sm text-zinc-300">
                  What is the capital of Nepal? Can you explain in Nepali?
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-900/40">
                  <span className="text-[10px] font-bold text-white">NP</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none text-sm text-zinc-300">
                  <p>Nepal's capital is Kathmandu.</p>
                  <p className="mt-2 text-zinc-400">नेपालको राजधानी काठमाडौं हो।</p>
                </div>
              </div>
            </div>
            {/* Input placeholder */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-12 rounded-xl bg-zinc-800 border border-white/10 flex items-center px-4 relative">
                <span className="text-zinc-500 text-sm">Message ChatNP...</span>
                <div className="absolute right-2 top-1.5 p-1.5 bg-orange-600 rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/10 to-red-500/10 blur-2xl -z-10 rounded-[3rem]" />
        </motion.div>
      </div>
    </section>
  );
}
