"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "NP">("EN");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { labelEn: "About", labelNp: "हाम्रो बारेमा", href: "/#about" },
    { labelEn: "ChatNP", labelNp: "च्याटएनपी", href: "/#chatnp" },
    { labelEn: "Roadmap", labelNp: "योजना", href: "/#roadmap" },
    { labelEn: "Investors", labelNp: "लगानीकर्ता", href: "/#investors" },
    { labelEn: "Contact", labelNp: "सम्पर्क", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-[var(--border-card)] py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo size="md" />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {lang === "EN" ? link.labelEn : link.labelNp}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "EN" ? "NP" : "EN")}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            aria-label="Switch Language"
          >
            <span className={lang === "NP" ? "text-[var(--accent-gold)] font-bold" : "opacity-60"}>
              नेपा
            </span>
            <span className="opacity-30">/</span>
            <span className={lang === "EN" ? "text-[var(--accent-gold)] font-bold" : "opacity-60"}>
              EN
            </span>
          </button>

          <Link
            href="/chat"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-lg bg-[var(--text-primary)] text-[var(--bg-base)] hover:opacity-90 transition-all duration-200 shadow-xs"
          >
            {lang === "EN" ? "Launch ChatNP" : "च्याट सुरु गर्नुहोस्"}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === "EN" ? "NP" : "EN")}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
          >
            {lang === "EN" ? "नेपाली" : "English"}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-[var(--border-card)] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1"
              >
                {lang === "EN" ? link.labelEn : link.labelNp}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border-card)]">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-semibold rounded-lg bg-[var(--text-primary)] text-[var(--bg-base)]"
            >
              {lang === "EN" ? "Launch ChatNP" : "च्याट सुरु गर्नुहोस्"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
