import Link from 'next/link';
import { DownloadLink } from './DownloadLink';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-heading text-xl font-semibold tracking-tight text-white flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">K</span>
              </div>
              KarkTech
            </Link>
            <p className="text-sm text-zinc-500">
              Building a Better Nepal with Artificial Intelligence.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="#about" className="hover:text-white transition-colors">About KarkTech</Link></li>
              <li><Link href="#chatnp" className="hover:text-white transition-colors">ChatNP</Link></li>
              <li><Link href="#roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</Link></li>
              <li><DownloadLink className="hover:text-white transition-colors">Download Investor PDF</DownloadLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <p>© {new Date().getFullYear()} KarkTech. All rights reserved.</p>
          <p className="text-orange-500 uppercase tracking-widest text-[10px] font-bold">Nepali AI Excellence</p>
        </div>
      </div>
    </footer>
  );
}
