'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Database, 
  Workflow, 
  Zap
} from 'lucide-react';
import { profile } from '@/data/site';

function BentoTiltCard({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // 3D perspective mouse physics:
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotateY(x * 15);
    setRotateX(-y * 15);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
        transition: mousePos.isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`relative rounded-xl overflow-hidden glass-panel border border-[var(--line)] p-6 sm:p-8 select-none ${className}`}
    >
      {/* Radial Cursor-Following Spotlight Border */}
      {mousePos.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-150"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function BentoProfile() {
  return (
    <section id="profile" className="py-16 sm:py-24 border-b border-[var(--line)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <div className="font-mono-tech text-xs text-[var(--aqua)] tracking-wider uppercase mb-1">
              {"// SYSTEM PROFILE"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight font-mono-tech">
              Hello, I&apos;m Dhrubojyoti Gangopadhyay
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full font-mono-tech text-xs bg-[rgba(112,241,219,0.08)] text-[var(--aqua)] border border-[rgba(112,241,219,0.2)]">
              OPEN TO OPPORTUNITIES 2026
            </span>
          </div>
        </div>

        {/* Bento Grid with 4 Modules */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Card 1: Identity & Availability */}
          <BentoTiltCard className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="font-mono-tech text-xs text-[var(--aqua)]">
                  {"// OPERATOR_NODE: VERIFIED"}
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)] flex items-center gap-1">
                  <MapPin size={12} className="text-[var(--aqua)]" /> Kolkata, India [IST] · Shipping Worldwide
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden border-2 border-[var(--line)] shadow-xl">
                  <Image
                    src="/dhrubo-portrait.jpg"
                    alt="Dhrubojyoti Gangopadhyay"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[var(--green)] border-2 border-[var(--bg)] shadow-[0_0_8px_var(--green)]" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-mono-tech">
                    {profile.name} (Dhrubo)
                  </h3>
                  <p className="text-sm font-mono-tech text-[var(--aqua)] mt-0.5">
                    Applied AI Engineer
                  </p>
                  <p className="text-xs text-[var(--muted)] font-mono-tech mt-1">
                    16 Years Enterprise Revenue Operations · Now Building Applied AI Systems
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
                I build applied AI systems that connect language models to the tools, data and approval steps a business already runs on. Sixteen years running enterprise revenue operations taught me where those systems break; now I write the code that handles it.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[rgba(165,227,217,0.1)] flex flex-wrap gap-2">
              {['Applied AI Engineer', 'AI Agents', 'Workflow Automation', 'TypeScript', 'Python', 'Next.js'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded text-xs font-mono-tech bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)] text-[var(--soft)]">
                  {tag}
                </span>
              ))}
            </div>
          </BentoTiltCard>

          {/* Card 2: Forward Deployed Engineering */}
          <BentoTiltCard className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs text-[var(--aqua)]">
                  {"// HOW I WORK"}
                </span>
                <Zap size={16} className="text-[var(--aqua)]" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono-tech text-[var(--text)]">
                From Ambiguous Problem to Running Software
              </h3>
              <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
                Scope · Build · Deploy · Explain
              </p>

              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                I work where a vague operational problem has to become a working system — scoping it, building it, deploying it, and explaining it to the people who have to live with it. Having sat on the business side of the table, I can hold both conversations without translation loss.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[rgba(5,7,10,0.6)] border border-[rgba(112,241,219,0.2)]">
              <div className="flex items-baseline justify-between">
                <span className="font-mono-tech text-xl font-bold text-[var(--aqua)]">
                  OPEN SOURCE
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)]">
                  Inspectable
                </span>
              </div>
              <p className="text-[11px] font-mono-tech text-[var(--soft)] mt-1">
                Every project below is public: source, commit history, tests and releases.
              </p>
            </div>
          </BentoTiltCard>

          {/* Card 3: Applied AI & Orchestration */}
          <BentoTiltCard className="col-span-12 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs text-[var(--aqua)]">
                  {"// APPLIED AI & ORCHESTRATION"}
                </span>
                <Workflow size={16} className="text-[var(--aqua)]" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono-tech text-[var(--text)]">
                Agents Built for Operations, Not Demos
              </h3>
              <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
                LangGraph · Model Context Protocol · Claude · Gemini
              </p>

              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                I design around the boundary between what a model decides and what it is permitted to do: approval gates before externally-consequential actions, structured execution records instead of chat transcripts, and failure handling that degrades safely.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)]">
                <div className="font-mono-tech text-xs text-[var(--muted)]">Sahkarmi</div>
                <div className="text-base font-bold font-mono-tech text-[var(--aqua)]">230+ commits</div>
                <div className="text-[10px] text-[var(--muted)]">64 unit test suites</div>
              </div>
              <div className="p-3 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)]">
                <div className="font-mono-tech text-xs text-[var(--muted)]">Release Pipeline</div>
                <div className="text-base font-bold font-mono-tech text-[var(--green)]">15+ releases</div>
                <div className="text-[10px] text-[var(--muted)]">CI/CD on every commit</div>
              </div>
            </div>
          </BentoTiltCard>

          {/* Card 4: Platform & Operations */}
          <BentoTiltCard className="col-span-12 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs text-[var(--gold)]">
                  {"// 16 YEARS ENTERPRISE OPERATIONS"}
                </span>
                <Database size={16} className="text-[var(--gold)]" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono-tech text-[var(--text)]">
                Where the Domain Knowledge Comes From
              </h3>
              <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
                ACC Ltd · LafargeHolcim · MP Birla Cement · Star Cement · Shyam Steel
              </p>

              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                Sixteen years running enterprise revenue operations at AGM and Senior Manager level — dealer networks, channel performance, fulfilment and cash collection across multiple states. I know how commercial operations actually fail, which is why I build AI systems that assume they will.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[rgba(5,7,10,0.6)] border border-[rgba(240,189,69,0.2)]">
              <div className="flex items-baseline justify-between">
                <span className="font-mono-tech text-xl font-bold text-[var(--gold)]">
                  2007 &ndash; 2023
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)]">
                  Cement &amp; Steel Distribution
                </span>
              </div>
              <p className="text-[11px] font-mono-tech text-[var(--soft)] mt-1">
                Approval delays, unauditable changes and manual reconciliation — the problems I now build against.
              </p>
            </div>
          </BentoTiltCard>

        </div>
      </div>
    </section>
  );
}
