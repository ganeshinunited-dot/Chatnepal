"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { Download, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from "motion/react";

export function Investors() {
  return (
    <section id="investors" className="px-6 max-w-7xl mx-auto w-full scroll-mt-32">
      <div className="rounded-3xl bg-zinc-900/20 border border-white/5 p-8 md:p-12 lg:p-16 backdrop-blur-sm">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Seed Round Open
            </div>
            <h2 className="font-heading text-4xl text-white mb-6">Invest in the Future of Nepal's Digital Economy</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              We are raising NPR 1 Crore (approx $65,500 USD) to finalize the ChatNP NP1 launch, expand our engineering team, and execute our go-to-market strategy. Nepal's IT exports surpassed $1 billion in 2025—the time for a sovereign AI solution is now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <DownloadLink className="flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/20"><Download className="w-4 h-4" />Download Master Document</DownloadLink>
              <button className="flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 font-bold hover:bg-zinc-800 transition-colors">
                Contact Founder
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <Users className="w-6 h-6 text-orange-400 mb-4" />
              <h4 className="text-white font-medium mb-1">16.6M Users</h4>
              <p className="text-sm text-zinc-500">Unlocking the massive underserved internet user base in Nepal.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <Zap className="w-6 h-6 text-orange-500 mb-4" />
              <h4 className="text-white font-medium mb-1">Cost-Optimized</h4>
              <p className="text-sm text-zinc-500">Multi-agent routing system ensures high margins.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <TrendingUp className="w-6 h-6 text-red-400 mb-4" />
              <h4 className="text-white font-medium mb-1">$25M SAM</h4>
              <p className="text-sm text-zinc-500">Serviceable Available Market in Nepal alone, expanding to South Asia.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-6 h-6 text-orange-600 mb-4 font-bold font-heading text-xl">B2B</div>
              <h4 className="text-white font-medium mb-1">Freemium SaaS</h4>
              <p className="text-sm text-zinc-500">Clear path to revenue via hybrid B2C/B2B freemium model.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
