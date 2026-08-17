import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="font-heading text-xl font-semibold tracking-tight text-white flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-brand-blue to-brand-red flex items-center justify-center">
                <span className="text-xs font-bold text-white">K</span>
              </div>
              KarkTech
            </Link>
            <p className="text-sm text-zinc-500">
              Building a Better Nepal with Artificial Intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-zinc-500">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#chatnp" className="hover:text-white transition-colors">ChatNP</Link></li>
              <li><Link href="/#roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-sm text-zinc-600">
          <p>© {new Date().getFullYear()} KarkTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
