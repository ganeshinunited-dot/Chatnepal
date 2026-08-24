import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import ChatNPProduct from "@/components/ChatNPProduct";
import ChatNPPreview from "@/components/ChatNPPreview";
import Founder from "@/components/Founder";
import TrustCredibility from "@/components/TrustCredibility";
import Roadmap from "@/components/Roadmap";
import Investors from "@/components/Investors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata = {
  title: "KarkTech — Building AI for Nepal and South Asia",
  description: "ChatNP is the Nepal-first AI platform — purpose-built contextual intelligence for Nepal's language, culture, and local context.",
  openGraph: {
    title: "KarkTech — Building AI for Nepal and South Asia",
    description: "Purpose-built contextual intelligence for Nepal's language, culture, and local context.",
    url: "https://karktech.tech",
    siteName: "KarkTech",
    locale: "ne_NP",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent-gold-soft)]">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <ChatNPProduct />
      <ChatNPPreview />
      <Founder />
      <TrustCredibility />
      <Roadmap />
      <Investors />
      <Contact />
      <Footer />
      <CookieBanner />
    </main>
  );
}
