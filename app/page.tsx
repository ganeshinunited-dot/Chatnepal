import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Founder } from '@/components/Founder';
import { ChatNPPreview } from '@/components/ChatNPPreview';
import { Investors } from '@/components/Investors';
import { Roadmap } from '@/components/Roadmap';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-orange-900/50 selection:text-white">
      <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Navbar />
      
      <div className="pt-24 pb-16 flex flex-col gap-32 sm:gap-40">
        <Hero />
        <About />
        <Founder />
        <ChatNPPreview />
        <Investors />
        <Roadmap />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
