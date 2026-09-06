'use client';

import React from 'react';
import { ArrowUp, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';
import { profile } from '@/data/site';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 border-t border-[var(--line)] bg-[var(--bg)] overflow-hidden">
      
      {/* Giant Watermark Monospace Typography */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span className="watermark-text text-[15vw] font-black leading-none tracking-widest text-[rgba(112,241,219,0.025)]">
          DHRUBO
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Monospace System Tags Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 mb-8 border-b border-[rgba(165,227,217,0.1)] font-mono-tech text-xs">
          <div>
            <span className="text-[var(--muted)]">// ENCRYPTED PROTOCOL</span>
            <div className="text-[var(--aqua)] mt-0.5">TLS_1.3_VERIFIED</div>
          </div>
          <div>
            <span className="text-[var(--muted)]">// NODE COORDINATES</span>
            <div className="text-[var(--soft)] mt-0.5">KOLKATA_IN [22.5726° N, 88.3639° E]</div>
          </div>
          <div>
            <span className="text-[var(--muted)]">// SYS_STATUS</span>
            <div className="text-[var(--green)] mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-ping" />
              NOMINAL · PRODUCTION
            </div>
          </div>
          <div>
            <span className="text-[var(--muted)]">// REPO TARGET</span>
            <div className="text-[var(--soft)] mt-0.5">github.com/ganguydhrubo</div>
          </div>
        </div>

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold font-mono-tech text-[var(--text)]">
              {profile.name}
            </h3>
            <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
              Full-Stack Developer · AI Systems Architect · 17 Years Enterprise Commercial Operations
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono-tech text-xs text-[var(--muted)]">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--aqua)] transition-colors">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--aqua)] transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-[var(--aqua)] transition-colors">
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded bg-[var(--panel-2)] border border-[var(--line)] hover:border-[var(--aqua)] text-[var(--aqua)] transition-colors flex items-center gap-1 cursor-pointer ml-2"
            >
              <ArrowUp size={12} /> TOP
            </button>
          </div>
        </div>

        {/* Copyright Attribution */}
        <div className="mt-8 pt-6 border-t border-[rgba(165,227,217,0.06)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech text-[var(--muted)]">
          <div>
            © 2026 {profile.name} (Dhrubo). All systems verified and auditable.
          </div>
          <div>
            Production Surface: <span className="text-[var(--aqua)]">dhrubo.shop</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
