"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { Download, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from "motion/react";

export function Investors() {
  return (
    <section id="investors" className="mx-auto w-full max-w-7xl scroll-mt-32 px-4 sm:px-6">
      <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-5 backdrop-blur-sm sm:p-8 md:p-12 lg:p-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Seed Round Open
            </div>
            <h2 className="mb-6 font-heading text-3xl text-white sm:text-4xl">Invest in the Future of Nepal's Digital Economy</h2>
            <p className="mb-8 text-base leading-relaxed text-zinc-400 sm:text-lg">
              We are raising NPR 1 Crore (approx $65,500 USD) to finalize the ChatNP NP1 launch, expand our engineering team, and execute our go-to-market strategy. Nepal's IT exports surpassed $1 billion in 2025—the time for a sovereign AI solution is now.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <DownloadLink className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 font-bold text-white shadow-lg shadow-orange-900/20 transition-colors hover:bg-orange-700 sm:w-auto sm:px-8"><Download className="w-4 h-4" />Download Master Document</DownloadLink>
              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-5 font-bold text-zinc-300 transition-colors hover:bg-zinc-800 sm:w-auto sm:px-8">
                Contact Founder
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <Users className="w-6 h-6 text-orange-400 mb-4" />
              <h4 className="text-white font-medium mb-1">16.6M Users</h4>
              <p className="text-sm text-zinc-500">Unlocking the massive underserved internet user base in Nepal.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <Zap className="w-6 h-6 text-orange-500 mb-4" />
              <h4 className="text-white font-medium mb-1">Cost-Optimized</h4>
              <p className="text-sm text-zinc-500">Multi-agent routing system ensures high margins.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <TrendingUp className="w-6 h-6 text-red-400 mb-4" />
              <h4 className="text-white font-medium mb-1">$25M SAM</h4>
              <p className="text-sm text-zinc-500">Serviceable Available Market in Nepal alone, expanding to South Asia.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
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
