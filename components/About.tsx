"use client";
/* eslint-disable react/no-unescaped-entities */
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="px-6 max-w-7xl mx-auto w-full scroll-mt-32">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-white mb-6">
            About KarkTech
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Global AI platforms are trained predominantly on English data, leaving morphologically complex languages like Nepali with significant capability gaps. KarkTech exists to bridge this divide. We are a Nepal-based AI research and product company dedicated to building contextual, native-language intelligence.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-medium text-lg mb-2">Our Mission</h3>
              <p className="text-zinc-500 leading-relaxed">
                To build AI products that deeply understand Nepal's language, culture, education, businesses, agriculture, and public services, making advanced AI accessible for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium text-lg mb-2">Our Vision</h3>
              <p className="text-zinc-500 leading-relaxed">
                To become Nepal's leading AI company, envisioning a future where language and digital literacy are no longer barriers to accessing world-class technology.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
              <span className="text-orange-400 font-bold">1</span>
            </div>
            <h4 className="text-white font-medium mb-2">Localization First</h4>
            <p className="text-sm text-zinc-500">Technology must adapt to the user, not the other way around.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <span className="text-red-400 font-bold">2</span>
            </div>
            <h4 className="text-white font-medium mb-2">Inclusivity</h4>
            <p className="text-sm text-zinc-500">Accessible to everyone, regardless of technical background or English proficiency.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <span className="text-blue-400 font-bold">3</span>
            </div>
            <h4 className="text-white font-medium mb-2">Integrity</h4>
            <p className="text-sm text-zinc-500">Committed to building ethical, transparent, and secure AI systems.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
              <span className="text-emerald-400 font-bold">4</span>
            </div>
            <h4 className="text-white font-medium mb-2">High Impact</h4>
            <p className="text-sm text-zinc-500">Driving tangible, positive changes in Nepal's socio-economic landscape.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
