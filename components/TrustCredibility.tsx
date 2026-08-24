import React from "react";

export const TrustCredibility: React.FC = () => {
  const pillars = [
    {
      title: "Live ChatNP Prototype",
      description: "A working AI assistant available for testing right now, powered by the NP1 MONI model.",
    },
    {
      title: "Secured Infrastructure",
      description: "Backed by scalable, secure server-side integrations powered by industry-standard APIs.",
    },
    {
      title: "Comprehensive Materials",
      description: "Detailed investor documentation and roadmap ready for due diligence and partnership discussions.",
    },
    {
      title: "Clear Roadmap",
      description: "A realistic path from prototype to product to ecosystem, with transparent milestones.",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--bg-surface)] border border-[var(--border-card)] text-[var(--text-secondary)] mb-4">
            Proof of Execution
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            What Exists Today
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)]">
            We&apos;re not just a concept. Here&apos;s what you can access and verify right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl card-contour flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[var(--accent-gold)]">0{idx + 1}</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-2">{p.title}</h3>
                <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-card)] text-[10px] uppercase font-mono text-[var(--text-tertiary)]">
                Active & Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustCredibility;
