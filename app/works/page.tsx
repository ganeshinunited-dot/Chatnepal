'use client';

const projects = [
  ['Unique', 'Web design', 'https://framerusercontent.com/images/IklMuuZoQb7lMAGk9Q3vadE2Lbw.png?width=2731&height=4096'],
  ['Net partners', 'Branding · Strategy', 'https://framerusercontent.com/images/VWJ3RtDDax4VGMq0kt3SJEsDo.webp?width=4016&height=6016'],
  ['Creative dev portfolio', 'Web design', 'https://framerusercontent.com/images/sxKqSIqa8G1m6UReiXyzbXcwiLA.jpg?width=2000&height=2666'],
  ['Ovula', 'Strategy · Branding', 'https://framerusercontent.com/images/cCGilJr9mhid0I2gKBqI36owCUM.jpg?width=5760&height=3840'],
  ['Pegasus Solar', 'Web design · Branding', 'https://framerusercontent.com/images/UAR4o9epjGDcb82UC27HQs5KdSY.png?width=1600&height=1200'],
];

export default function WorksPage() {
  return <main className="inner-page works-page"><Header /><section className="works-intro"><p className="section-kicker">Selected works</p><h1>Selected<br /><em>works</em></h1><span className="count">[05]</span></section><section className="project-list">{projects.map(([name, type, src], i) => <article className={`project-row project-${i + 1}`} key={name}><div className="project-meta"><span>0{i + 1}</span><h2>{name}</h2><p>{type}</p></div><div className="project-photo"><img src={src} alt={name} /><span>View project ↗</span></div></article>)}</section><Footer /></main>;
}

function Header() { return <header className="site-header"><a href="/" className="wordmark">Karolina Hess</a><nav className="top-nav"><a href="/">Home</a><a className="selected" href="/works">Works</a><a href="/about">About</a></nav><a className="contact-pill" href="mailto:hesskarolina@gmail.com">Contact <span>↗</span></a></header>; }
function Footer() { return <footer><span>©2026</span><span>Karolina Hess</span><a href="/">Back home ↑</a></footer>; }
