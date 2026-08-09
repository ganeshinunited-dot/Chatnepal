'use client';

import { motion } from 'motion/react';
import { Quote, Mail } from 'lucide-react';

const SOCIALS = [
  {
    label: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~0171b7fc2d10298c53',
    // Upwork brand green
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#14a800]" aria-hidden="true">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.071.008-.042c.207-1.143.849-3.06 2.837-3.06 1.492 0 2.703 1.212 2.703 2.703.001 1.49-1.211 2.697-2.702 2.697m.001-8.141c-1.891 0-3.286.92-4.135 2.184-.87 1.294-1.113 2.734-1.238 3.743l-.459.173c-.844-.892-1.94-1.719-4.161-1.719-3.072 0-4.895 2.293-4.895 5.237 0 3.14 2.109 5.16 4.468 5.16 2.749 0 4.308-1.853 4.629-4.545h2.405c-.189 1.366-.738 2.409-1.505 3.155.846.567 2.173 1.195 4.893 1.195 3.505 0 6.039-2.381 6.039-6.039 0-3.364-2.863-5.344-6.041-5.344M7.013 15.89c0 1.769-1.167 2.759-2.871 2.759-1.497 0-2.635-1.179-2.635-3.033 0-1.649 1.015-3.034 2.635-3.034 1.77 0 2.871 1.427 2.871 3.308" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ganesh-karki-260849250',
    // LinkedIn brand blue
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0A66C2]" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/9779842902535',
    // WhatsApp brand green
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:ganeshkarki@growentix.cloud',
    // Email brand red (Gmail-like)
    icon: <Mail className="w-4 h-4 text-[#EA4335]" />,
  },
];

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            {/* Founder photo */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6 shadow-xl overflow-hidden rounded-full ring-2 ring-white/10">
              <img
                src="/founder.webp"
                alt="Ganesh Karki — Founder & CEO, KarkTech"
                className="w-full h-full object-cover"
                width={144}
                height={144}
              />
            </div>
            <p className="text-2xl md:text-3xl font-heading font-semibold text-white mb-2">Ganesh Karki</p>
            <p className="text-base text-blue-500 font-medium tracking-wide uppercase mb-6">Founder & CEO, KarkTech</p>

            {/* Official brand social icons */}
            <div className="flex items-center justify-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-200 hover:scale-110 hover:bg-white/10"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6 text-center">
            <div>
              <Quote className="w-8 h-8 text-blue-500/40 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed italic">
                "Technology must adapt to the user, not the other way around. At KarkTech, we're building a future where language and digital literacy are no longer barriers for the people of Nepal."
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/5">
              <p className="text-zinc-400 leading-relaxed">
                Ganesh is leading KarkTech's mission to create AI products specifically designed for Nepal's unique language, culture, and local needs. He single-handedly built the complete ChatNP prototype and is now assembling a five-member core team — product, backend, AI/ML, frontend, and marketing.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              1 year of independent execution — product strategy, development, design
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
