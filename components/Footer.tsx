import React from "react";
import Link from "next/link";
import Logo from "./Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="py-14 bg-[var(--bg-base)] border-t border-[var(--border-card)] text-xs text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo size="md" />
            <p className="text-[var(--text-tertiary)] mt-1">
              Building a Better Nepal with Artificial Intelligence.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-medium">
            <Link href="/#about" className="hover:text-[var(--text-primary)] transition-colors">About</Link>
            <Link href="/#chatnp" className="hover:text-[var(--text-primary)] transition-colors">ChatNP</Link>
            <Link href="/#roadmap" className="hover:text-[var(--text-primary)] transition-colors">Roadmap</Link>
            <Link href="/#investors" className="hover:text-[var(--text-primary)] transition-colors">Investors</Link>
            <Link href="/#contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-[var(--text-primary)] transition-colors">Cookie Policy</Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-card)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-tertiary)]">
          <div>© {new Date().getFullYear()} KarkTech. All rights reserved. Birtabazar, Jhapa, Nepal.</div>
          <div className="font-mono text-[10px]">Sovereign Context Engine • NP1 Architecture</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
