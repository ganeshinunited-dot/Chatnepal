'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#chatnp', label: 'ChatNP' },
  { href: '#investors', label: 'Investors' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-orange-500 to-red-600">
            <span className="text-xs font-bold text-white">K</span>
          </div>
          KarkTech
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/chat" className="hidden h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 sm:flex">
            Try ChatNP
          </Link>
          <button
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 bg-[#090909] px-4 py-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/chat"
              onClick={closeMenu}
              className="mt-2 flex h-11 items-center justify-center rounded-xl bg-orange-600 px-4 text-sm font-bold text-white transition-colors hover:bg-orange-700"
            >
              Try ChatNP
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
