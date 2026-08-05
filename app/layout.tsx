import type { Metadata } from 'next';
import { Newsreader, Manrope } from 'next/font/google';
import './globals.css';
import { CookieBanner } from '../components/CookieBanner';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KarkTech | Building a Better Nepal with Artificial Intelligence',
  description: 'KarkTech is a Nepal-based AI startup focused on building AI products for Nepal, starting with ChatNP.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${manrope.variable} ${newsreader.variable} font-body bg-[#050505] text-white antialiased selection:bg-orange-900/50`} suppressHydrationWarning>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
