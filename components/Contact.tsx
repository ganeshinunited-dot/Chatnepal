"use client";
/* eslint-disable react/no-unescaped-entities */
import { MapPin, Mail, Linkedin } from 'lucide-react';
import { motion } from "motion/react";

export function Contact() {
  return (
    <section id="contact" className="px-6 max-w-7xl mx-auto w-full scroll-mt-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <h2 className="font-heading text-4xl text-white mb-6">Get in Touch</h2>
          <p className="text-zinc-400 text-lg mb-12">
            Whether you are an investor, developer, or potential partner, we'd love to hear from you. Let's build Nepal's AI future together.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Email Founder</p>
                <a href="mailto:ganesh@karktech.tech" className="text-white hover:text-blue-400 transition-colors">ganesh@karktech.tech</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">WhatsApp</p>
                <a href="https://wa.me/9779842902535" className="text-white hover:text-blue-400 transition-colors">+977 9842902535</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">LinkedIn</p>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">linkedin.com/in/ganeshkarki</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Headquarters (Planned)</p>
                <p className="text-white">Birtabazar, Jhapa, Nepal</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-sm"
        >
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">First Name</label>
                <input type="text" className="w-full h-12 bg-zinc-800 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Last Name</label>
                <input type="text" className="w-full h-12 bg-zinc-800 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email Address</label>
              <input type="email" className="w-full h-12 bg-zinc-800 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Message</label>
              <textarea className="w-full h-32 bg-zinc-800 border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"></textarea>
            </div>
            <button type="button" className="w-full h-12 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-blue-bright transition-colors shadow-lg shadow-blue-900/30">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
