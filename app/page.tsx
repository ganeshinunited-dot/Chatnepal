'use client';

import { useEffect, useState } from 'react';

const assets = {
  portrait: 'https://framerusercontent.com/images/FjHT4pcgeHQXiJWtiHF7nTmlb2E.webp',
  avatar: 'https://framerusercontent.com/images/IcZHZATtnSoQVRs6mNCkK5ygPk.png?width=584&height=584',
  work1: 'https://framerusercontent.com/images/IklMuuZoQb7lMAGk9Q3vadE2Lbw.png?width=2731&height=4096',
  work2: 'https://framerusercontent.com/images/VWJ3RtDDax4VGMq0kt3SJEsDo.webp?width=4016&height=6016',
  work3: 'https://framerusercontent.com/images/sxKqSIqa8G1m6UReiXyzbXcwiLA.jpg?width=2000&height=2666',
  work4: 'https://framerusercontent.com/images/cCGilJr9mhid0I2gKBqI36owCUM.jpg?width=5760&height=3840',
  work5: 'https://framerusercontent.com/images/UAR4o9epjGDcb82UC27HQs5KdSY.png?width=1600&height=1200',
  work6: 'https://framerusercontent.com/images/QCPDRXKEUobZMEdfKC7BqigiLE.jpg?width=4006&height=6009',
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="portfolio-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="wordmark">Karolina Hess</a>
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#top">Home</a><a href="/works">Works</a><a href="/about">About</a>
        </nav>
        <button className="contact-pill" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact <span>↗</span></button>
      </header>

      <button className="quick-tab" onClick={() => setQuickOpen((v) => !v)}>Quick info</button>
      {quickOpen && <aside className="quick-card"><button onClick={() => setQuickOpen(false)} aria-label="Close quick info">×</button><p>Available for select freelance projects.</p><a href="mailto:hesskarolina@gmail.com">hesskarolina@gmail.com</a><div className="socials"><a href="https://www.instagram.com/karo.dsgn/">Instagram</a><a href="https://x.com/karolina_hess">X</a></div></aside>}

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Creative Web<br /><span>Designer</span></h1>
          <p>specialized in branding and no-code development</p>
        </div>
        <img className="hero-portrait" src={assets.portrait} alt="Karolina Hess portrait" />
        <div className="hero-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="bottom-dock"><a className="active" href="#top">Home</a><a href="/works">Works</a><a href="/about">About</a></div>
        <a className="scroll-cue" href="#about" aria-label="Scroll down">↓</a>
      </section>

      <section className="green-panel" id="about">
        <div className="section-kicker">Designer/developer <em>hybrid</em></div>
        <h2>I design with <em>care.</em><br />No templates, no shortcuts.</h2>
        <button className="reel-button"><span>PLAY REEL</span><b>↗</b></button>
        <p className="manifesto">Just <em>custom-made</em>, thoughtful design<br />— built and brought to life with <em>no-code.</em></p>
      </section>

      <section className="works" id="works">
        <div className="works-heading"><span>Selected projects</span><h2>Recent works</h2><span>Scroll to explore ↘</span></div>
        <div className="work-grid">
          <Work src={assets.work1} title="Visual identity" meta="Branding · 2024" />
          <Work src={assets.work2} title="Editorial direction" meta="Art direction · 2024" />
          <Work src={assets.work3} title="Digital experience" meta="Web design · 2023" />
          <Work src={assets.work4} title="New perspectives" meta="Campaign · 2023" wide />
          <Work src={assets.work5} title="Quietly bold" meta="Identity · 2022" />
          <Work src={assets.work6} title="Studio notes" meta="Web design · 2022" />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-image"><img src={assets.avatar} alt="Karolina Hess" /></div>
        <div><p className="section-kicker">Let’s work</p><h2>together</h2><p className="email-label">Drop me an email:</p><a className="email" href="mailto:hesskarolina@gmail.com">hesskarolina@gmail.com</a><div className="contact-links"><a href="https://www.instagram.com/karo.dsgn/">Instagram ↗</a><a href="https://pin.it/7exJq5ZjV">Pinterest ↗</a><a href="https://x.com/karolina_hess">X ↗</a></div></div>
      </section>

      <footer><span>©2026 Karolina Hess</span><span>Thoughtful digital design, from idea to life.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

function Work({ src, title, meta, wide = false }: { src: string; title: string; meta: string; wide?: boolean }) {
  return <article className={`work-card ${wide ? 'wide' : ''}`}><div className="work-image"><img src={src} alt={title} loading="lazy" /><span>View project ↗</span></div><div className="work-caption"><h3>{title}</h3><p>{meta}</p></div></article>;
}
