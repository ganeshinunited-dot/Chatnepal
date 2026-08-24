import React from "react";
import Image from "next/image";

export const Founder: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[var(--bg-surface)] border-y border-[var(--border-card)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-card)] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-[var(--border-card)] shadow-md bg-[var(--bg-surface)]">
                <Image
                  src="/founder.webp"
                  alt="Ganesh Karki — Founder & CEO, KarkTech"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]">
                Founder & CEO, KarkTech
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Ganesh Karki
              </h3>

              <blockquote className="text-base sm:text-lg italic text-[var(--text-primary)] border-l-2 border-[var(--accent-gold)] pl-4 my-4 font-serif">
                &ldquo;Technology must adapt to the user, not the other way around. At KarkTech, we&apos;re building a future where language and digital literacy are no longer barriers for the people of Nepal.&rdquo;
              </blockquote>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Ganesh is leading KarkTech&apos;s mission to create AI products specifically designed for Nepal&apos;s unique language, culture, and local needs. He single-handedly built the complete ChatNP prototype and is now assembling a five-member core team — product, backend, AI/ML, frontend, and marketing.
              </p>

              <div className="pt-2 text-xs font-mono text-[var(--text-tertiary)]">
                ✓ 1 year of independent execution — product strategy, development, design
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
