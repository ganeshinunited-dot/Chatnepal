import Link from 'next/link';
import { Menu } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">K</span>
          </div>
          KarkTech
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#chatnp" className="hover:text-white transition-colors">ChatNP</Link>
          <Link href="#investors" className="hover:text-white transition-colors">Investors</Link>
          <Link href="#roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/chat" className="hidden sm:flex items-center justify-center h-9 px-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Try ChatNP
          </Link>
          <button className="md:hidden text-zinc-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
