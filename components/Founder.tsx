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

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center mb-6 shadow-xl mx-auto">
              <span className="text-2xl font-heading font-bold text-orange-500">GK</span>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-semibold text-white mb-2">Ganesh Karki</p>
            <p className="text-base text-orange-500 font-medium tracking-wide uppercase mb-6">Founder & CEO, KarkTech</p>
          </div>
          
          <div className="space-y-6 text-center">
            <div>
              <Quote className="w-8 h-8 text-orange-500/40 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed italic">
                "Technology must adapt to the user, not the other way around. At KarkTech, we're building a future where language and digital literacy are no longer barriers for the people of Nepal."
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/5">
              <p className="text-zinc-400 leading-relaxed">
                Ganesh is leading KarkTech's mission to create AI products specifically designed for Nepal's unique language, culture, and local needs. With a focus on bridging the digital divide, he's building the infrastructure for Nepal's sovereign AI future.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
