import React from 'react';
import Image from 'next/image';
import { profile } from '@/data/site';
import HeroScrubber from '@/components/HeroScrubber';
import BentoProfile from '@/components/BentoProfile';
import TechStack from '@/components/TechStack';
import ProjectsMatrix from '@/components/ProjectsMatrix';
import LiveDispatchTerminal from '@/components/LiveDispatchTerminal';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://dhrubo.shop/#profile',
      url: 'https://dhrubo.shop/',
      name: 'Dhrubojyoti Gangopadhyay — Full-Stack Developer & AI Systems Architect',
      dateModified: '2026-09-06',
      mainEntity: { '@id': 'https://dhrubo.shop/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://dhrubo.shop/#person',
      name: 'Dhrubojyoti Gangopadhyay',
      alternateName: 'Dhrubo',
      url: 'https://dhrubo.shop/',
      image: 'https://dhrubo.shop/dhrubo-portrait.jpg',
      email: 'mailto:dhrubojyoti.gangopadhyay@gmail.com',
      telephone: '+918240801921',
      jobTitle: 'Full-Stack Developer & AI Systems Architect',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressCountry: 'IN',
      },
      sameAs: [profile.github, profile.linkedin, profile.x],
      knowsAbout: [
        'Full-stack web development',
        'AI agent systems',
        'LangGraph',
        'Model Context Protocol',
        'Voice AI',
        'FastAPI',
        'Next.js 15',
        'PostgreSQL',
        'Enterprise commercial operations',
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--aqua)] selection:text-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Persistent High-Tech Sticky Nav Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[rgba(5,7,10,0.85)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--line)] group-hover:border-[var(--aqua)] transition-colors">
              <Image
                src="/dhrubo-portrait.jpg"
                alt="Dhrubo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono-tech text-sm font-bold text-[var(--text)] tracking-wider">
                DHRUBO
              </span>
              <span className="font-mono-tech text-[9px] text-[var(--aqua)] tracking-widest -mt-1">
                SYSTEMS ARCHITECT
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 font-mono-tech text-xs text-[var(--muted)]">
            <a href="#timeline" className="hover:text-[var(--aqua)] transition-colors">// TIMELINE</a>
            <a href="#profile" className="hover:text-[var(--aqua)] transition-colors">// PROFILE</a>
            <a href="#stack" className="hover:text-[var(--aqua)] transition-colors">// TECH MATRIX</a>
            <a href="#projects" className="hover:text-[var(--aqua)] transition-colors">// ENGINEERING</a>
            <a href="#contact" className="hover:text-[var(--aqua)] transition-colors">// DISPATCH</a>
          </nav>

          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-lg bg-[rgba(112,241,219,0.1)] border border-[rgba(112,241,219,0.3)] hover:bg-[var(--aqua)] hover:text-[var(--bg)] transition-all font-mono-tech text-xs text-[var(--aqua)] font-semibold glow-aqua-sm"
          >
            INITIALIZE COMM
          </a>
        </div>
      </header>

      {/* Main High-Tech Sections */}
      <main id="top">
        {/* 1. Hero Scrubber with 3-Segment Timeline */}
        <HeroScrubber />

        {/* 2. Bento Profile with 3D Cursor-Tilt */}
        <BentoProfile />

        {/* 3. Interactive Tech Matrix with Cursor Spotlights */}
        <TechStack />

        {/* 4. Engineering Matrix with Numbered Cards */}
        <ProjectsMatrix />

        {/* 5. Live Dispatch Terminal with Real-Time JSON Synchronization */}
        <LiveDispatchTerminal />
      </main>

      {/* 6. Watermark Monospace Footer */}
      <Footer />

      {/* Floating AI Assistant */}
      <ChatWidget />
    </div>
  );
}
