import React from "react";
import Link from "next/link";

export const Investors: React.FC = () => {
  const funds = [
    { label: "AI Infrastructure & Product Development", amount: "NPR 40 Lakhs", pct: "40%" },
    { label: "Hiring & Core Engineering Team", amount: "NPR 30 Lakhs", pct: "30%" },
    { label: "Marketing & User Acquisition", amount: "NPR 20 Lakhs", pct: "20%" },
    { label: "Operations & Compliance", amount: "NPR 10 Lakhs", pct: "10%" },
  ];

  return (
    <section id="investors" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] mb-4">
            Seed Round Open • Funding Opportunity
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Invest in Nepal&apos;s AI Future
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)]">
            We are raising <strong className="text-[var(--text-primary)]">NPR 1 Crore</strong> (approx $65,500 USD) to accelerate ChatNP&apos;s development, scale our infrastructure, and execute our go-to-market strategy.
          </p>
        </div>

        {/* Use of Funds Grid */}
        <div className="p-8 sm:p-10 rounded-3xl card-contour mb-12">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Use of Funds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funds.map((f, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
                <div className="text-2xl font-bold text-[var(--accent-gold)]">{f.pct}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mt-1">{f.amount}</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 leading-snug">{f.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-card)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[var(--text-secondary)]">
              Path to $2M revenue in Year 5 with a 1:12 CAC/LTV efficiency ratio. Supported via <strong className="text-[var(--text-primary)]">eSewa • Khalti • Fonepay • Bank Wire</strong>
            </div>
            <div className="flex gap-3">
              <a
                href="/ChatNpdeck.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
              >
                View Investor Deck
              </a>
              <Link
                href="#contact"
                className="px-5 py-2.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all"
              >
                Contact Founder
              </Link>
            </div>
          </div>
        </div>

        {/* TAM / SAM / SOM Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
            <span className="text-xs font-mono text-[var(--text-tertiary)]">TAM</span>
            <div className="text-3xl font-bold text-[var(--text-primary)] mt-1">$294.16B</div>
            <div className="text-xs text-[var(--text-secondary)] mt-2">Global AI market (2025/2026).</div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
            <span className="text-xs font-mono text-[var(--accent-gold)]">SAM</span>
            <div className="text-3xl font-bold text-[var(--accent-gold)] mt-1">~$25M</div>
            <div className="text-xs text-[var(--text-secondary)] mt-2">Nepal AI software/services annually.</div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)]">
            <span className="text-xs font-mono text-[var(--text-tertiary)]">SOM</span>
            <div className="text-3xl font-bold text-[var(--text-primary)] mt-1">$320K</div>
            <div className="text-xs text-[var(--text-secondary)] mt-2">Year 3 target: 5% of internet power users.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investors;
