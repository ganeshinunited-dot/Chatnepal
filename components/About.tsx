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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue mb-3 hidden lg:block">Who We Are</p>
          <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">KarkTech</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-4">
            KarkTech is a Nepal-based AI research and product company building contextual, native-language intelligence — bridging the gap left by global AI platforms trained predominantly on English data.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Based in <span className="text-zinc-400 font-medium">Birtabazar, Jhapa, Nepal</span>. Empowering Nepal through Artificial Intelligence.
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
                To integrate ChatNP into every smartphone, school, and business in Nepal — making Nepal a regional leader in AI innovation across South Asia.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-8"
        >
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <h4 className="text-white font-medium mb-2">Localization First</h4>
            <p className="text-sm text-zinc-500">Technology must adapt to the user, not the other way around.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:-translate-y-1 lg:mt-6">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <span className="text-red-400 font-bold">2</span>
            </div>
            <h4 className="text-white font-medium mb-2">Inclusivity</h4>
            <p className="text-sm text-zinc-500">Accessible to everyone, regardless of technical background or English proficiency.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <span className="text-blue-400 font-bold">3</span>
            </div>
            <h4 className="text-white font-medium mb-2">Integrity</h4>
            <p className="text-sm text-zinc-500">Committed to building ethical, transparent, and secure AI systems.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:-translate-y-1 lg:mt-6">
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
