import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, Globe2, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Founder } from '@/components/Founder';
import { Navbar } from '@/components/Navbar';

const SITE_URL = 'https://karktech.tech';

export const metadata: Metadata = {
  title: 'About KarkTech — Building AI for Nepal',
  description:
    'Learn about KarkTech, a Nepal-based AI research and product company building contextual, native-language intelligence for Nepal and South Asia.',
  keywords: [
    'About KarkTech',
    'KarkTech Nepal',
    'Nepal AI company',
    'Nepali artificial intelligence',
    'contextual AI Nepal',
    'ChatNP team',
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about`,
    siteName: 'KarkTech',
    title: 'About KarkTech — Building AI for Nepal',
    description:
      'KarkTech is building contextual, native-language intelligence for Nepal and South Asia, starting with ChatNP.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About KarkTech — Building AI for Nepal',
    description:
      'Discover KarkTech\'s mission to build AI that understands Nepal\'s language, culture, and local context.',
  },
};

const aboutPageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#aboutpage`,
      url: `${SITE_URL}/about`,
      name: 'About KarkTech',
      description: metadata.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/about#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About KarkTech', item: `${SITE_URL}/about` },
      ],
    },
  ],
};

const principles = [
  {
    icon: Globe2,
    title: 'Localization first',
    text: 'Technology must adapt to the user, not the other way around. Our products are designed around Nepal\'s language, culture, and local context.',
  },
  {
    icon: Sparkles,
    title: 'Useful by design',
    text: 'We focus on practical AI that helps people learn, work, communicate, and make better decisions in everyday life.',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible progress',
    text: 'We are committed to building ethical, transparent, and secure AI systems that earn trust through the quality of their work.',
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-blue-900/50 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-[-12%] top-[-10%] h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-[-14%] left-[-12%] h-[460px] w-[460px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute left-1/2 top-[28%] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-indigo-500/[0.04] blur-[110px]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-16">
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-400">About KarkTech</p>
            <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Building AI that understands <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent">Nepal.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              KarkTech is a Nepal-based AI research and product company building contextual, native-language intelligence for Nepal and South Asia.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/chat" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                Try ChatNP <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#mission" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                Explore our mission
              </a>
            </div>
          </div>

          <div className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <div><p className="text-sm font-semibold text-white">Based in Nepal</p><p className="mt-1 text-sm text-zinc-500">Birtabazar, Jhapa</p></div>
            </div>
            <div className="flex items-start gap-3">
              <BrainCircuit className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <div><p className="text-sm font-semibold text-white">Our first product</p><p className="mt-1 text-sm text-zinc-500">ChatNP, powered by NP1 MONI</p></div>
            </div>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <div><p className="text-sm font-semibold text-white">Our ambition</p><p className="mt-1 text-sm text-zinc-500">Native AI for South Asia</p></div>
            </div>
          </div>
        </section>

        <section id="mission" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Who we are</p>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">Context is not a feature. It is the foundation.</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-zinc-400 sm:text-lg">
              <p>Global AI platforms have made powerful tools widely available, but they often leave local language, culture, and everyday context behind. KarkTech exists to close that gap for Nepal.</p>
              <p>We build products that treat Nepali language and local knowledge as first-class inputs. Our work begins with ChatNP, a Nepal-first AI platform designed to make useful intelligence more accessible to people, schools, and businesses.</p>
              <p>From our base in Birtabazar, Jhapa, we are developing a long-term product and research foundation for responsible AI innovation across Nepal and South Asia.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">What guides us</p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">Principles for building with purpose.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.12] via-white/[0.03] to-transparent p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Our mission</p>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">Make advanced AI feel native to Nepal.</h2>
                <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">We aim to build AI products that deeply understand Nepal&apos;s language, culture, education, businesses, agriculture, and public services, making advanced intelligence more accessible for everyone.</p>
              </div>
              <Link href="/chat" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-500 px-5 text-sm font-semibold text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">Meet ChatNP <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <Founder />

        <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Start with the product</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">Experience a more local way to use AI.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-500">ChatNP is KarkTech&apos;s working prototype for Nepal-first, Nepali-language AI.</p>
          <Link href="/chat" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">Launch ChatNP <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </div>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageStructuredData) }} />
    </main>
  );
}
