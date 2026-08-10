import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'KarkTech cookie policy — how and why we use cookies on karktech.tech and our AI products.',
  alternates: { canonical: 'https://karktech.tech/cookie-policy' },
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen relative bg-[#050505] text-white selection:bg-blue-900/50">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-4xl md:text-5xl font-medium mb-8">Cookie Policy</h1>
        
        <div className="prose prose-invert prose-blue max-w-none space-y-6 text-zinc-400">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-white font-medium text-2xl mt-12 mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
          </p>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">How We Use Cookies</h2>
          <p>
            At KarkTech, we use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-zinc-200">Essential Cookies:</strong> Required for the website to function properly.</li>
            <li><strong className="text-zinc-200">Preference Cookies:</strong> To remember your settings and preferences (like acknowledging our cookie banner).</li>
            <li><strong className="text-zinc-200">Analytics Cookies:</strong> To understand how visitors interact with our website, helping us improve the user experience.</li>
          </ul>

          <h2 className="text-white font-medium text-2xl mt-12 mb-4">Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
