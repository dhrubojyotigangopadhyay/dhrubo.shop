'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight, 
  Activity 
} from 'lucide-react';
import { timelineNodes, profile } from '@/data/site';

export default function HeroScrubber() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const activeNode = timelineNodes[activeNodeIndex];

  // Auto transition ticker when enabled or initial hint
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % timelineNodes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="timeline" className="relative pt-8 pb-16 lg:pb-24 border-b border-[var(--line)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--aqua)] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[var(--green)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Status & Node Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[rgba(165,227,217,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--aqua)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--aqua)]" />
            </span>
            <span className="font-mono-tech text-xs tracking-wider text-[var(--aqua)] font-semibold">
              {"// SYS_STATUS: OPERATIONAL"}
            </span>
            <span className="hidden sm:inline-block text-xs text-[var(--muted)]">•</span>
            <span className="hidden sm:inline-block font-mono-tech text-xs text-[var(--soft)]">
              LATENCY: &lt;250MS
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono-tech text-xs text-[var(--muted)]">
            <span className="px-2 py-0.5 rounded bg-[rgba(112,241,219,0.06)] border border-[rgba(112,241,219,0.15)] text-[var(--aqua)]">
              NODE: KOLKATA [IST]
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--panel-2)] border border-[var(--line)] text-[var(--soft)]">
              OPEN TO OPPORTUNITIES 2026
            </span>
          </div>
        </div>

        {/* Hero Title & Identity Hook */}
        <div className="pt-8 pb-10">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[var(--aqua)] uppercase mb-3">
            <span className="w-6 h-[1px] bg-[var(--aqua)]" />
            <span>High-Tech Systems Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-tight max-w-4xl">
            Enterprise Commercial Depth.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--aqua)] via-[var(--soft)] to-[var(--green)]">
              AI Systems That Ship.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            Full-stack developer and AI systems architect pairing <strong className="text-[var(--text)] font-medium">17 years of enterprise commercial operations</strong> with sub-250ms voice pipelines and stateful LangGraph agent swarms.
          </p>
        </div>

        {/* PINNED FRAME-SCRUBBED TIMELINE CONTROL */}
        <div className="p-4 sm:p-6 rounded-xl glass-panel relative border border-[var(--line)] shadow-2xl">
          {/* Scrubber Header / Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(165,227,217,0.1)]">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-wider text-[var(--aqua)] font-bold">
                TIMELINE: NODE 01-03
              </span>
              <span className="text-xs font-mono-tech text-[var(--muted)]">
                [{activeNodeIndex + 1} / {timelineNodes.length}]
              </span>
            </div>

            {/* Quick Segment Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {timelineNodes.map((node, idx) => (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveNodeIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono-tech transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeNodeIndex === idx
                      ? 'bg-[var(--aqua)] text-[var(--bg)] font-bold shadow-[0_0_12px_rgba(112,241,219,0.3)]'
                      : 'bg-[var(--panel-2)] text-[var(--muted)] hover:text-[var(--text)] border border-[rgba(165,227,217,0.1)]'
                  }`}
                >
                  <span>{node.id}</span>
                  <span className="hidden md:inline">{node.role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3-Segment Progress Track */}
          <div className="pt-4 pb-2">
            <div className="grid grid-cols-3 gap-2">
              {timelineNodes.map((node, idx) => (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeIndex(idx)}
                  className="cursor-pointer group py-2"
                >
                  <div className="h-1.5 w-full rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        activeNodeIndex === idx
                          ? 'w-full bg-[var(--aqua)] shadow-[0_0_8px_var(--aqua)]'
                          : activeNodeIndex > idx
                          ? 'w-full bg-[var(--green)]'
                          : 'w-0 group-hover:w-1/4 bg-[rgba(112,241,219,0.3)]'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1.5">
                    <span className="font-mono-tech text-[10px] text-[var(--muted)] group-hover:text-[var(--text)]">
                      {node.tag}
                    </span>
                    <span className={`text-[10px] font-mono-tech ${activeNodeIndex === idx ? 'text-[var(--aqua)] font-bold' : 'text-[var(--muted)]'}`}>
                      {node.role.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Scrubber Content Frame */}
          <div className="mt-4 p-5 sm:p-8 rounded-lg bg-[rgba(5,7,10,0.65)] border border-[rgba(165,227,217,0.15)] min-h-[340px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Left Column: Role & Architectural Description */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full font-mono-tech text-xs bg-[rgba(112,241,219,0.1)] text-[var(--aqua)] border border-[rgba(112,241,219,0.25)]">
                      {activeNode.status}
                    </span>
                    <span className="font-mono-tech text-xs text-[var(--gold)]">
                      {activeNode.latency}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-mono-tech text-[var(--text)] mt-2">
                    {activeNode.role}
                  </h2>
                  <h3 className="text-base sm:text-lg font-medium text-[var(--soft)] mt-1">
                    {activeNode.headline}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {activeNode.description}
                  </p>

                  {/* Stack Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {activeNode.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded bg-[var(--panel)] border border-[rgba(165,227,217,0.15)] text-xs font-mono-tech text-[var(--soft)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Live Telemetry Terminal Screen */}
                <div className="lg:col-span-5">
                  <div className="p-4 rounded-lg bg-[var(--panel)] border border-[var(--line)] shadow-inner">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[rgba(165,227,217,0.1)]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--green)]" />
                        <span className="ml-2 font-mono-tech text-[10px] text-[var(--muted)]">
                          telemetry://node_{activeNode.id}.log
                        </span>
                      </div>
                      <Activity size={13} className="text-[var(--aqua)] animate-pulse" />
                    </div>

                    <div className="space-y-2 font-mono-tech text-xs">
                      {Object.entries(activeNode.telemetry).map(([key, val]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between text-[11px] gap-0.5">
                          <span className="text-[var(--muted)]">{key}:</span>
                          <span className="text-[var(--aqua)] font-medium text-right truncate">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[rgba(165,227,217,0.1)] flex items-center justify-between text-[11px] font-mono-tech text-[var(--soft)]">
                      <span>VERIFIED_EXECUTION</span>
                      <span className="text-[var(--green)] flex items-center gap-1">
                        <CheckCircle2 size={12} /> 100% AUDITABLE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Scrubber Actions */}
            <div className="pt-6 mt-6 border-t border-[rgba(165,227,217,0.1)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-lg bg-[var(--aqua)] text-[var(--bg)] font-mono-tech text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 glow-aqua-sm"
                >
                  INITIALIZE DISPATCH <ArrowRight size={14} />
                </a>
                <a
                  href="#projects"
                  className="px-4 py-2 rounded-lg bg-[var(--panel)] border border-[var(--line)] text-[var(--soft)] font-mono-tech text-xs hover:border-[var(--aqua)] transition-all flex items-center gap-1.5"
                >
                  EXPLORE MATRIX <ChevronRight size={14} />
                </a>
              </div>

              <div className="flex items-center gap-3 font-mono-tech text-xs text-[var(--muted)]">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--aqua)] transition-colors flex items-center gap-1"
                >
                  GitHub @ganguydhrubo <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
