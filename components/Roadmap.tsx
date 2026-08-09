"use client";
import { motion } from "motion/react";

export function Roadmap() {
  const phases = [
    { phase: "Phase 1", title: "Prototype & MVP", desc: "Core ChatNP architecture with the NP1 MONI model, and initial testing with early users.", status: "current" },
    { phase: "Phase 2", title: "Product Refinement", desc: "Scaling infrastructure, improving Nepali language capabilities, and gathering user feedback.", status: "planned" },
    { phase: "Phase 3", title: "Vertical Solutions", desc: "Launching specialized AI assistants for Education, Agriculture, and Local Businesses.", status: "planned" },
    { phase: "Phase 4", title: "Ecosystem Expansion", desc: "Building Nepal-centric AI infrastructure and enabling third-party integrations.", status: "planned" },
  ];

  return (
    <section id="roadmap" className="mx-auto w-full max-w-5xl scroll-mt-32 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">Our Vision</h2>
        <p className="text-base text-zinc-400 sm:text-lg">From prototype to sovereign AI ecosystem for Nepal.</p>
      </div>

      <div className="relative">
        {/* Timeline line: drawn at the top of the grid so it never crosses card text */}
        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-blue/15 via-brand-blue/40 to-brand-blue/15" />
        
        <div className="grid md:grid-cols-4 gap-6 md:gap-4">
          {phases.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              {/* Timeline dot: aligned with the top line */}
              <div className="hidden md:flex absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className={`w-4 h-4 rounded-full border-4 ${item.status === 'current' ? 'bg-brand-blue border-brand-blue-bright' : 'bg-zinc-900 border-zinc-700'}`} />
              </div>

              <div className={`p-6 rounded-2xl border transition-all h-full ${
                item.status === 'current' 
                  ? 'bg-blue-500/10 border-brand-blue/30' 
                  : 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900/50'
              }`}>
                <div className="mb-4">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.phase}</span>
                  {item.status === 'current' && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30">
                      <span className="w-2 h-2 rounded-full bg-brand-blue-bright animate-pulse" />
                      <span className="text-xs font-medium text-blue-400">Current</span>
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-white/5 text-center">
        <p className="text-sm text-zinc-400">
          Our roadmap reflects realistic milestones focused on product quality and market fit. Timelines are indicative and subject to market conditions and funding availability.
        </p>
      </div>
    </section>
  );
}
