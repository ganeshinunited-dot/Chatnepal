import { Hero } from '@/components/Hero';
import { ProblemSolution } from '@/components/ProblemSolution';
import { About } from '@/components/About';
import { ChatNPProduct } from '@/components/ChatNPProduct';
import { Founder } from '@/components/Founder';
import { TrustCredibility } from '@/components/TrustCredibility';
import { Roadmap } from '@/components/Roadmap';
import { Investors } from '@/components/Investors';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { FloatingSummary } from '@/components/FloatingSummary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KarkTech — Building AI for Nepal and South Asia',
  description:
    "KarkTech is a Nepal-based AI company building contextual AI products for Nepal and South Asia, starting with ChatNP, an AI platform designed around Nepal's language, culture, businesses, and local needs.",
  alternates: { canonical: 'https://karktech.tech/' },
};

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-blue-900/50 selection:text-white">
      <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Navbar />
      
      <div className="pt-24 pb-16 flex flex-col gap-32 sm:gap-40">
        <Hero />
        <ProblemSolution />
        <About />
        <ChatNPProduct />
        <Founder />
        <TrustCredibility />
        <Roadmap />
        <Investors />
        <Contact />
      </div>

      <Footer />
      <FloatingSummary />
    </main>
  );
}
