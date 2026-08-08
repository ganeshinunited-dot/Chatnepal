"use client";
import { motion } from "motion/react";

export function Roadmap() {
  const milestones = [
    { q: "Q2 2026", title: "Prototype", desc: "Core architecture & functional prototype completed.", status: "completed" },
    { q: "Q3 2026", title: "Website & Reg", desc: "Corporate entity registered, web portal launched.", status: "completed" },
    { q: "Q3 2026", title: "NP1 Launch", desc: "Core chat, translation, and writing features live.", status: "planned" },
    { q: "Q4 2026", title: "Vertical AI", desc: "Education & Agriculture Information Assistants.", status: "planned" },
    { q: "Q1 2027", title: "Multimodal", desc: "Voice AI & Native Image Generation features.", status: "planned" },
    { q: "Q3 2027", title: "Enterprise API", desc: "B2B API access and custom integrations.", status: "planned" },
  ];

  return (
    <section id="roadmap" className="mx-auto w-full max-w-5xl scroll-mt-32 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="mb-4 font-heading text-3xl text-white sm:text-4xl">Product Roadmap</h2>
        <p className="text-base text-zinc-400 sm:text-lg">Our strategic timeline for the next 18 months.</p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
        <div className="md:hidden absolute top-0 bottom-0 left-[-1px] w-0.5 bg-white/10" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full md:hidden ${m.status === 'completed' ? 'bg-orange-500' : 'bg-zinc-700'}`} />
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{m.q}</span>
                  {m.status === 'completed' && (
                    <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">Achieved</span>
                  )}
                </div>
                <h4 className="text-lg font-medium text-white mb-2">{m.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
