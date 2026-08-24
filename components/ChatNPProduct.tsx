import React from "react";
import Link from "next/link";

export const ChatNPProduct: React.FC = () => {
  return (
    <section id="chatnp" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--bg-surface)] border border-[var(--border-card)] text-[var(--text-secondary)] mb-4">
            Our First Major Product
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            ChatNP: Purpose-Built Native AI
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)]">
            A working prototype of a native-language AI assistant designed specifically for Nepal. Try it today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* NP1 MONI Model Card */}
          <div className="p-8 rounded-3xl card-contour border-2 border-[var(--border-subtle)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Now Live
              </span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">NP1 MONI</span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">The Unified ChatNP Model</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              The single, unified ChatNP model — optimized for speed and everyday tasks, grounded in real-time information, and tuned for Nepali language.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-[var(--text-secondary)] font-medium">
              <li className="flex items-center gap-2">→ Quick responses for daily questions</li>
              <li className="flex items-center gap-2">→ Real-time web search integration</li>
              <li className="flex items-center gap-2">→ Nepali language optimized</li>
            </ul>
            <div className="mt-8 pt-6 border-t border-[var(--border-card)]">
              <Link
                href="/chat"
                className="inline-flex items-center text-xs font-semibold text-[var(--accent-gold)] hover:underline"
              >
                Launch ChatNP Studio →
              </Link>
            </div>
          </div>

          {/* Specialized Models Card */}
          <div className="p-8 rounded-3xl card-contour flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--bg-surface)] text-[var(--text-tertiary)]">
                  Coming Soon
                </span>
                <span className="text-xs font-mono text-[var(--text-tertiary)]">Specialized Models</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">Family of Nepal-Focused Models</h3>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                A family of Nepal-focused specialized AI models currently in development:
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[var(--text-secondary)] font-medium">
                <li className="flex items-center gap-2">→ <strong className="text-[var(--text-primary)]">Sovereign 7B:</strong> fully sovereign Nepali AI</li>
                <li className="flex items-center gap-2">→ <strong className="text-[var(--text-primary)]">Agri-Specialist:</strong> agriculture intelligence</li>
                <li className="flex items-center gap-2">→ <strong className="text-[var(--text-primary)]">Legal & Tax AI:</strong> Nepali regulations</li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--border-card)] text-xs text-[var(--text-tertiary)] font-mono">
              Roadmap Deployment Phase
            </div>
          </div>
        </div>

        {/* 3 Domain Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
            <span className="text-xs font-mono text-[var(--accent-gold)]">60% of workforce</span>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mt-1">Agriculture</h4>
            <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
              Crop disease diagnosis and live market prices for Nepali farmers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
            <span className="text-xs font-mono text-[var(--accent-gold)]">7M students</span>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mt-1">Education</h4>
            <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
              AI tutors addressing Nepal&apos;s 46:1 student-teacher ratio.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
            <span className="text-xs font-mono text-[var(--accent-gold)]">Local enterprises</span>
            <h4 className="text-lg font-bold text-[var(--text-primary)] mt-1">SME & Business</h4>
            <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
              Accounting, document drafting, and daily business workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatNPProduct;
