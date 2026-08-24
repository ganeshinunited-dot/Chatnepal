import React from "react";

export const Roadmap: React.FC = () => {
  const milestones = [
    {
      period: "Q2 2026",
      status: "Current",
      title: "Prototype Complete",
      desc: "Architecture (Q1) and website launched. Fully functional prototype completed — ready for deployment.",
      active: true,
    },
    {
      period: "Q3 2026",
      status: "NP1 Launch",
      title: "Core Model Release",
      desc: "Releasing the NP1 MONI model featuring core chat, translation, and Nepali writing capabilities.",
      active: false,
    },
    {
      period: "Q4 2026",
      status: "Vertical Assistants",
      title: "Domain Intelligence",
      desc: "Launching Education & Agriculture AI assistants — built for Nepal's classrooms and farms.",
      active: false,
    },
    {
      period: "2027",
      status: "Future Ecosystem",
      title: "Multimedia & Agents",
      desc: "Voice AI and Image Generation (Q1 2027), followed by business automation AI Agents (Q2 2027).",
      active: false,
    },
  ];

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-[var(--bg-surface)] border-y border-[var(--border-card)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--bg-base)] border border-[var(--border-card)] text-[var(--text-secondary)] mb-4">
            Our Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            From Prototype to Sovereign AI Ecosystem
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)]">
            Our roadmap reflects realistic milestones focused on product quality and market fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                m.active
                  ? "bg-[var(--bg-base)] border-[var(--accent-gold)] shadow-sm"
                  : "bg-[var(--bg-base)] border-[var(--border-card)] opacity-85"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[var(--accent-gold)]">{m.period}</span>
                <span
                  className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                    m.active
                      ? "bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] font-bold"
                      : "bg-[var(--bg-surface)] text-[var(--text-tertiary)]"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{m.title}</h3>
              <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[var(--text-tertiary)] max-w-xl mx-auto">
          Timelines are indicative and subject to market conditions and funding availability.
        </p>
      </div>
    </section>
  );
};

export default Roadmap;
