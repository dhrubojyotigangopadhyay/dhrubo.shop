'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Database, 
  ArrowUpRight, 
  Workflow, 
  Cpu 
} from 'lucide-react';
import { profile } from '@/data/site';

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={`relative rounded-xl overflow-hidden glass-panel border border-[var(--line)] p-6 sm:p-8 ${className}`}
    >
      {/* Glare spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(112, 241, 219, ${glare.opacity}), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function BentoProfile() {
  return (
    <section id="profile" className="py-16 sm:py-24 border-b border-[var(--line)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Monospace Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <div className="font-mono-tech text-xs text-[var(--aqua)] tracking-wider uppercase mb-1">
              {"// SYSTEM PROFILE"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
              Enterprise Cognition &amp; Production Architecture
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full font-mono-tech text-xs bg-[rgba(112,241,219,0.08)] text-[var(--aqua)] border border-[rgba(112,241,219,0.2)]">
              OPEN TO OPPORTUNITIES 2026
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Card 1: Identity & Operator Persona */}
          <TiltCard className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="font-mono-tech text-xs text-[var(--aqua)]">
                  {"// IDENTITY_NODE: VERIFIED"}
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)] flex items-center gap-1">
                  <MapPin size={12} className="text-[var(--aqua)]" /> Kolkata, India [IST] · Remote
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
                  <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[var(--green)] border-2 border-[var(--bg)]" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-mono-tech">
                    {profile.name}
                  </h3>
                  <p className="text-sm font-mono-tech text-[var(--aqua)] mt-0.5">
                    {profile.role}
                  </p>
                  <p className="text-xs text-[var(--muted)] font-mono-tech mt-1">
                    17 Years Enterprise Commercial Ops · Full-Stack AI Engineer
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
                Operating at the nexus of production agentic AI and mission-critical enterprise systems. I build end-to-end architectures—from reactive 60fps frontend surfaces and sub-250ms voice pipelines to database-tier stored procedures.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[rgba(165,227,217,0.1)] flex flex-wrap gap-2">
              {['Next.js 15', 'FastAPI', 'LangGraph', 'Vapi Voice AI', 'Supabase', 'PostgreSQL'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded text-xs font-mono-tech bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)] text-[var(--soft)]">
                  {tag}
                </span>
              ))}
            </div>
          </TiltCard>

          {/* Card 2: 17 Years Enterprise Commercial Operations */}
          <TiltCard className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs text-[var(--gold)]">
                  {"// 17 YEARS ENTERPRISE COMMERCIAL OPS"}
                </span>
                <Database size={16} className="text-[var(--gold)]" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono-tech text-[var(--text)]">
                Commercial Operations &amp; Database-Tier Logic
              </h3>
              <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
                ACC Ltd · Lafarge · MP Birla Group (AGM / Senior Manager level)
              </p>

              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                17 years directing commercial operations, distributor network analytics, and multi-million dollar rebate logic. I translate complex supply chains, dealer incentives, and ERP specifications into robust database-tier rules (PL/pgSQL) and deterministic agent guardrails.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[rgba(5,7,10,0.6)] border border-[rgba(240,189,69,0.2)]">
              <div className="flex items-baseline justify-between">
                <span className="font-mono-tech text-2xl font-bold text-[var(--gold)]">
                  40% FASTER
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)]">
                  Decision Latency Reduction
                </span>
              </div>
              <p className="text-[11px] font-mono-tech text-[var(--soft)] mt-1">
                Evaluated at DB-tier rather than fragile application loops. Zero RevOps leakage.
              </p>
            </div>
          </TiltCard>

          {/* Card 3: AI Systems & Architecture Depth */}
          <TiltCard className="col-span-12 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs text-[var(--aqua)]">
                  {"// AGENTIC GRAPH & PROTOCOLS"}
                </span>
                <Workflow size={16} className="text-[var(--aqua)]" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono-tech text-[var(--text)]">
                Production Agent Engineering
              </h3>
              <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
                LangGraph · Model Context Protocol · Vapi · Supabase
              </p>

              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                Engineering stateful supervisor graphs, custom MCP stdio/SSE tool registries, parent-doc memory checkpointing, and sub-250ms voice-to-JSON serialization pipelines. Built for auditable production reliability.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)]">
                <div className="font-mono-tech text-xs text-[var(--muted)]">Voice Latency</div>
                <div className="text-base font-bold font-mono-tech text-[var(--aqua)]">&lt;250ms</div>
                <div className="text-[10px] text-[var(--muted)]">Speech to typed CRM</div>
              </div>
              <div className="p-3 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)]">
                <div className="font-mono-tech text-xs text-[var(--muted)]">Auditable Repos</div>
                <div className="text-base font-bold font-mono-tech text-[var(--green)]">31+ Systems</div>
                <div className="text-[10px] text-[var(--muted)]">Public on GitHub</div>
              </div>
            </div>
          </TiltCard>

          {/* Card 4: Open Roles & Engagement */}
          <TiltCard className="col-span-12 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs text-[var(--green)]">
                  {"// ENGAGEMENT POSTURE 2026"}
                </span>
                <Cpu size={16} className="text-[var(--green)]" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono-tech text-[var(--text)]">
                Open to High-Impact Opportunities
              </h3>
              <p className="text-xs font-mono-tech text-[var(--muted)] mt-1">
                Available Immediately · Remote / Async Worldwide
              </p>

              <div className="mt-4 space-y-2">
                {[
                  { role: 'AI Systems Architect', desc: 'Designing production agentic systems, MCP registries, and stateful graphs' },
                  { role: 'Applied AI Engineer', desc: 'Sub-250ms voice pipelines, hybrid RAG networks, deterministic automation' },
                  { role: 'AI Platform Engineer', desc: 'Evaluation harnesses, tool registries, observability, model-gateways' },
                  { role: 'Founding Engineer', desc: 'Early-stage AI-native products demanding 17yr enterprise operating depth' },
                ].map((item) => (
                  <div key={item.role} className="flex items-start gap-2 text-xs">
                    <span className="text-[var(--aqua)] font-mono-tech mt-0.5">›</span>
                    <div>
                      <strong className="text-[var(--text)] font-mono-tech">{item.role}:</strong>{' '}
                      <span className="text-[var(--muted)]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(165,227,217,0.1)] flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[var(--soft)]">Ready for Immediate Q1 Deployments</span>
              <a href="#contact" className="font-mono-tech text-xs text-[var(--aqua)] hover:underline flex items-center gap-1">
                DISPATCH DIRECTIVE <ArrowUpRight size={13} />
              </a>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
