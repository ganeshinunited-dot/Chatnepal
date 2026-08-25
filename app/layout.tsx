import type { Metadata } from 'next';
import { Mukta, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CookieBanner } from '../components/CookieBanner';

// Mukta: Nepali Devanagari-optimized modern sans (supports नेपाली script natively)
const mukta = Mukta({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'devanagari'],
  variable: '--font-mukta',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
});

// Plus Jakarta Sans: modern geometric heading font
const jakarta = Plus_Jakarta_Sans({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
});

const SITE_URL = 'https://karktech.tech';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'KarkTech — Building AI for Nepal and South Asia',
    template: '%s | KarkTech',
  },
  description:
    'KarkTech is a Nepal-based AI company building contextual AI products for Nepal and South Asia, starting with ChatNP, an AI platform designed around Nepal\'s language, culture, businesses, and local needs.',
  keywords: ['KarkTech', 'ChatNP', 'Nepal AI', 'Nepali AI', 'sovereign AI', 'Nepal artificial intelligence'],
  authors: [{ name: 'Ganesh Karki' }],
  creator: 'KarkTech',
  publisher: 'KarkTech',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'KarkTech',
    title: 'KarkTech — Building AI for Nepal and South Asia',
    description:
      "KarkTech is a Nepal-based AI company building contextual AI products for Nepal and South Asia, starting with ChatNP, an AI platform designed around Nepal's language, culture, businesses, and local needs.",
  },
  twitter: {
    card: 'summary_large_image',
    site: '@karktech',
    title: 'KarkTech — Building AI for Nepal and South Asia',
    description:
      "KarkTech is a Nepal-based AI company building contextual AI products for Nepal and South Asia, starting with ChatNP, an AI platform designed around Nepal's language, culture, businesses, and local needs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KarkTech',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        founder: {
          '@type': 'Person',
          name: 'Ganesh Karki',
          jobTitle: 'Founder & CEO',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Birtabazar',
          addressRegion: 'Jhapa',
          addressCountry: 'NP',
        },
        sameAs: [
          'https://www.linkedin.com/in/ganesh-karki-260849250',
          'https://www.upwork.com/freelancers/~0171b7fc2d10298c53',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'KarkTech',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
      },
    ],
  };
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
        />
      </body>
    </html>
  );
}
