import type { Metadata } from 'next';
import { Mukta, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CookieBanner } from '../components/CookieBanner';

// Mukta: Nepali Devanagari-optimized modern sans (supports नेपाली script natively)
const mukta = Mukta({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'devanagari'],
  variable: '--font-body',
  display: 'swap',
});

// Plus Jakarta Sans: modern geometric heading font
const jakarta = Plus_Jakarta_Sans({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-heading',
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
      <body className={`${jakarta.variable} ${mukta.variable} font-body bg-[#050505] text-white antialiased selection:bg-blue-900/50`} suppressHydrationWarning>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
