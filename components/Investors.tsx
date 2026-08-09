"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { Download, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from "motion/react";

function FundsBar({ label, pct, note }: { label: string; pct: number; note: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-xs font-semibold text-blue-400">{note} · {pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-bright" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MarketStat({ value, label, desc }: { value: string; label: string; desc: string }) {
  return (
    <div className="text-center">
      <p className="text-lg sm:text-xl font-bold font-heading text-white">{value}</p>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-blue-bright mt-0.5">{label}</p>
      <p className="text-xs text-zinc-500 mt-1 leading-snug">{desc}</p>
    </div>
  );
}

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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3 hidden lg:block">Funding Opportunity</p>
            <h2 className="mb-6 font-heading text-3xl text-white sm:text-4xl">Invest in Nepal's AI Future</h2>
            <p className="mb-8 text-base leading-relaxed text-zinc-400 sm:text-lg">
              We are raising NPR 1 Crore (approx $65,500 USD) to accelerate ChatNP's development, scale our infrastructure, and execute our go-to-market strategy. Nepal's digital economy is growing rapidly—now is the time to build sovereign AI solutions.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Use of Funds</h4>
                <div className="space-y-3 mb-6">
                  <FundsBar label="AI Infrastructure &amp; Product Development" pct={40} note="NPR 40 Lakhs" />
                  <FundsBar label="Hiring &amp; Core Engineering Team" pct={30} note="NPR 30 Lakhs" />
                  <FundsBar label="Marketing &amp; User Acquisition" pct={20} note="NPR 20 Lakhs" />
                  <FundsBar label="Operations &amp; Compliance" pct={10} note="NPR 10 Lakhs" />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <DownloadLink className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 font-bold text-black shadow-lg shadow-blue-900/30 transition-colors hover:bg-zinc-200 sm:w-auto sm:px-8"><Download className="w-4 h-4" />View Investor Deck</DownloadLink>
                <a href="mailto:ganesh@karktech.tech" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-5 font-bold text-zinc-300 transition-colors hover:bg-zinc-800 sm:w-auto sm:px-8">
                  Contact Founder
                </a>
              </div>
            </div>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-8">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1">
                <Users className="w-6 h-6 text-brand-blue-bright mb-4" />
                <h4 className="text-white font-medium mb-1">16.6M+ Internet Users</h4>
                <p className="text-sm text-zinc-500">Massive underserved market in Nepal with growing digital adoption.</p>
              </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1 lg:mt-6">
              <Zap className="w-6 h-6 text-brand-blue-bright mb-4" />
              <h4 className="text-white font-medium mb-1">Proven Traction</h4>
              <p className="text-sm text-zinc-500">Live prototype, launched website, and complete product architecture in place.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1">
              <TrendingUp className="w-6 h-6 text-red-400 mb-4" />
              <h4 className="text-white font-medium mb-1">Profitability by Year 3</h4>
              <p className="text-sm text-zinc-500">Path to $2M revenue in Year 5 with a 1:12 CAC/LTV efficiency ratio.</p>
            </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1 lg:mt-6">
                <div className="w-6 h-6 text-brand-blue-bright mb-4 font-bold font-heading">B2C/B2B</div>
                <h4 className="text-white font-medium mb-1">Freemium Model</h4>
                <p className="text-sm text-zinc-500">Free, Pro ($5/mo), Business ($20/mo) &amp; API tiers with 2–5% conversion target.</p>
              </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 sm:p-5">
            <MarketStat value="$294.16B" label="TAM" desc="Global AI market (2025)" />
            <MarketStat value="~$25M" label="SAM" desc="Nepal AI software/services annually" />
            <MarketStat value="$320K" label="SOM" desc="Year 3 target: 5% of internet users" />
          </div>
        </div>
      </div>
    </section>
  );
}
