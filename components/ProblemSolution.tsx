import React from "react";

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-surface)] border-y border-[var(--border-card)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* The Problem */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-card)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 mb-6">
                The Problem
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Global AI platforms are not built for Nepal.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Nepal has <strong className="text-[var(--text-primary)]">16.6M internet users</strong> and <strong className="text-[var(--text-primary)]">85.1% smartphone ownership</strong>—yet global AI platforms are not built for Nepal. They are trained predominantly on English-centric data, leaving morphologically complex languages like Nepali with significant capability gaps.
              </p>

              <div className="mt-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-[var(--text-primary)] block mb-1">The Token Tax:</strong>
                English-optimized tokenizers destroy Nepali semantic context and require significantly more compute power to process the language.
              </div>
            </div>

            <ul className="mt-8 space-y-3 pt-6 border-t border-[var(--border-card)] text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Limited Nepali language understanding
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                No cultural or local context awareness
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Designed for global markets, not Nepal&apos;s needs
              </li>
            </ul>
          </div>

          {/* Our Solution */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-card)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] mb-6">
                Our Solution
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Contextual Intelligence — Purpose-built, not a wrapper.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                ChatNP is a Nepal-first AI platform built with Contextual Intelligence—purpose-built, not a wrapper. Deep Nepali NLP handles grammar, honorifics, and morphology natively, while proprietary RAG pipelines inject localized knowledge.
              </p>

              <div className="mt-6 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--accent-gold-soft)] text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-[var(--text-primary)] block mb-1">Deep Localization:</strong>
                Deep Nepali NLP grammar, honorifics & morphology coupled with culturally aware and locally relevant intelligence.
              </div>
            </div>

            <ul className="mt-8 space-y-3 pt-6 border-t border-[var(--border-card)] text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                ✓ Deep Nepali NLP — grammar, honorifics & morphology
              </li>
              <li className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                ✓ Culturally aware and locally relevant
              </li>
              <li className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                ✓ Designed for Nepal&apos;s unique opportunities
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
