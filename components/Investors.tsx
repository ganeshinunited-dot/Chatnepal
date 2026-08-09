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
            <h2 className="mb-6 font-heading text-3xl text-white sm:text-4xl">Invest in Nepal's AI Future</h2>
            <p className="mb-8 text-base leading-relaxed text-zinc-400 sm:text-lg">
              We are raising NPR 1 Crore (approx $65,500 USD) to accelerate ChatNP's development, scale our infrastructure, and execute our go-to-market strategy. Nepal's digital economy is growing rapidly—now is the time to build sovereign AI solutions.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Use of Funds</h4>
                <ul className="space-y-2 text-sm text-zinc-400 mb-6">
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span> Engineering: Expand AI research and development team
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span> Infrastructure: Scale secure, high-performance computing
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">→</span> Go-to-Market: Execute launch strategy and user acquisition
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <DownloadLink className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 font-bold text-black shadow-lg shadow-blue-900/30 transition-colors hover:bg-zinc-200 sm:w-auto sm:px-8"><Download className="w-4 h-4" />View Investor Deck</DownloadLink>
                <a href="mailto:ganesh@karktech.tech" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-5 font-bold text-zinc-300 transition-colors hover:bg-zinc-800 sm:w-auto sm:px-8">
                  Contact Founder
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <Users className="w-6 h-6 text-brand-blue-bright mb-4" />
              <h4 className="text-white font-medium mb-1">16.6M+ Internet Users</h4>
              <p className="text-sm text-zinc-500">Massive underserved market in Nepal with growing digital adoption.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <Zap className="w-6 h-6 text-brand-blue-bright mb-4" />
              <h4 className="text-white font-medium mb-1">Scalable Infrastructure</h4>
              <p className="text-sm text-zinc-500">Built for growth with efficient, cost-optimized architecture.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <TrendingUp className="w-6 h-6 text-red-400 mb-4" />
              <h4 className="text-white font-medium mb-1">Growing Digital Economy</h4>
              <p className="text-sm text-zinc-500">Nepal's IT sector expanding rapidly with strong export growth.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6">
              <div className="w-6 h-6 text-brand-blue-bright mb-4 font-bold font-heading text-xl">B2C/B2B</div>
              <h4 className="text-white font-medium mb-1">Freemium Model</h4>
              <p className="text-sm text-zinc-500">Clear path to revenue through freemium and enterprise tiers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
