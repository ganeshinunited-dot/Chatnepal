import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for KarkTech AI products, including ChatNP — usage terms, user responsibilities, and service guidelines.',
  alternates: { canonical: 'https://karktech.tech/terms-of-service' },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen relative bg-[#050505] text-white selection:bg-blue-900/50">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 font-sans">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
          KarkTech Legal & Agreement
        </div>
        <h1 className="milky-heading text-4xl md:text-5xl text-white mb-6">Terms of Service</h1>
        
        <div className="prose prose-invert prose-blue max-w-none space-y-6 text-zinc-300 milky-text leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-white font-medium text-2xl mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using KarkTech and the ChatNP platform, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on KarkTech&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
          
          <h2 className="text-white font-medium text-2xl mt-12 mb-4">3. AI Service Limitations</h2>
          <p>
            ChatNP is an experimental AI service. While we strive for accuracy, the AI may occasionally generate incorrect or culturally inaccurate information. Users should not rely on ChatNP for critical, medical, legal, or financial advice.
          </p>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">4. Limitations</h2>
          <p>
            In no event shall KarkTech or its suppliers be liable for any damages arising out of the use or inability to use the materials on KarkTech&apos;s website or ChatNP.
          </p>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">5. Revisions</h2>
          <p>
            We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
