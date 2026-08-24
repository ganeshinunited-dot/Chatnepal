"use client";

import React from "react";
import Link from "next/link";

export const Hero: React.FC = () => {
  const samplePrompts = [
    {
      label: "कृषि सल्लाह",
      prompt: "धान बालीमा पात पहेंलो हुने समस्याको जैविक रोकथाम कसरी गर्ने?",
    },
    {
      label: "कानुनी मस्यौदा",
      prompt: "नेपालको श्रम ऐन अनुसार करार सम्झौताको ढाँचा तयार पारिदेऊ।",
    },
    {
      label: "शिक्षा र व्याकरण",
      prompt: "माध्यमिक तहका विद्यार्थीका लागि 'जलवायु परिवर्तन' मा निबन्ध लेख।",
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[var(--accent-gold-soft)] blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-surface)] mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
            NEPALAI • Working Prototype Active
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] max-w-4xl mx-auto leading-[1.12]">
          ChatNP: Nepal&apos;s Contextual <br className="hidden sm:inline" />
          <span className="text-[var(--text-secondary)] font-normal">
            AI Platform
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
          ChatNP is the Nepal-first AI platform — purpose-built contextual intelligence for Nepal&apos;s language, culture, and local context. Empowering Nepal through Artificial Intelligence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/chat"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-base)] font-semibold text-sm hover:opacity-90 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <span>Try ChatNP</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <a
            href="/ChatNpdeck.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium text-sm hover:bg-[var(--bg-card)] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>View Investor Deck</span>
            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* 3 Core Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-5 rounded-2xl card-contour">
            <div className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">16.6M+</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)] font-medium">Internet Users in Nepal</div>
          </div>
          <div className="p-5 rounded-2xl card-contour">
            <div className="text-3xl font-bold text-[var(--accent-gold)] tracking-tight">NP1</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)] font-medium">Native AI Model</div>
          </div>
          <div className="p-5 rounded-2xl card-contour">
            <div className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">24/7</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)] font-medium">AI Assistant Access</div>
          </div>
        </div>

        {/* Real Interactive Prompt Pills */}
        <div className="mt-14 pt-8 border-t border-[var(--border-card)] max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
            Try a real context-aware Nepali query
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {samplePrompts.map((item, idx) => (
              <Link
                key={idx}
                href={`/chat?prompt=${encodeURIComponent(item.prompt)}`}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface)] transition-all duration-200 text-xs text-left"
              >
                <span className="font-semibold text-[var(--accent-gold)]">
                  {item.label}:
                </span>
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate max-w-[240px] sm:max-w-[320px]">
                  {item.prompt}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
