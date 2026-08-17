import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'KarkTech privacy policy — how we collect, use, and protect your information when using ChatNP and other KarkTech AI services.',
  alternates: { canonical: 'https://karktech.tech/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen relative bg-[#050505] text-white selection:bg-blue-900/50">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 font-sans">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
          KarkTech Legal & Privacy
        </div>
        <h1 className="milky-heading text-4xl md:text-5xl text-white mb-6">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-blue max-w-none space-y-6 text-zinc-300 milky-text leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-white font-medium text-2xl mt-12 mb-4">1. Information We Collect</h2>
          <p>
            At KarkTech, we prioritize your privacy. We collect minimal information necessary to provide and improve ChatNP and our other AI services. This may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Usage data and interactions with our AI models.</li>
            <li>Contact information (such as email or name) if provided via our forms.</li>
            <li>Device and browser information for analytical purposes.</li>
          </ul>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used solely to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our native Nepali AI models.</li>
            <li>Respond to your inquiries and support requests.</li>
            <li>Analyze usage patterns to enhance user experience.</li>
          </ul>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. Your chat sessions with ChatNP are processed securely, and we do not sell your personal data to third parties.
          </p>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:ganesh@karktech.tech" className="text-blue-500 hover:underline">ganesh@karktech.tech</a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
