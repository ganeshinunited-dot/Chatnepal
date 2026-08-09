"use client";
import { motion } from "motion/react";
import { CheckCircle2, Code2, FileText, Zap } from "lucide-react";

export function TrustCredibility() {
  const credibilityItems = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Live ChatNP Prototype",
      description: "A working AI assistant available for testing right now. Try both Fast and Advanced modes.",
      color: "text-blue-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Secured Infrastructure",
      description: "Backed by scalable, secure server-side integrations powered by industry-standard APIs.",
      color: "text-orange-400"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Comprehensive Materials",
      description: "Detailed investor documentation and roadmap ready for due diligence and partnership discussions.",
      color: "text-emerald-400"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Clear Roadmap",
      description: "A realistic path from prototype to product to ecosystem, with transparent milestones.",
      color: "text-red-400"
    }
  ];

  return (
    <section className="mx-auto w-full max-w-7xl scroll-mt-32 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-4">What Exists Today</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          We're not just a concept. Here's what you can access and verify right now.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {credibilityItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <div className={`${item.color} mb-4`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
