'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function Founder() {
  return (
    <section id="founder" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Quote className="w-10 h-10 text-orange-500/30 mx-auto mb-6" />
          <h2 className="text-2xl md:text-4xl font-heading font-medium text-white mb-8 leading-relaxed">
            &quot;Our mission is to build AI that understands our culture, our language, and our values. ChatNP is just the beginning of Nepal&apos;s sovereign AI journey.&quot;
          </h2>
          <div className="inline-flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center mb-4 shadow-xl">
              <span className="text-xl font-heading font-bold text-zinc-400">GK</span>
            </div>
            <p className="text-xl font-medium text-white mb-1">Ganesh Karki</p>
            <p className="text-sm text-orange-500 font-medium tracking-wide uppercase">Founder, KarkTech</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
