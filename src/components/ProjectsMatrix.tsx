'use client';

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Terminal, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { flagshipProjects } from '@/data/site';

export default function ProjectsMatrix() {
  const [expandedCode, setExpandedCode] = useState<string | null>(flagshipProjects[0].code);

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-[var(--line)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono-tech text-xs text-[var(--aqua)] tracking-wider uppercase mb-1">
              {"// FEATURED WORK"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight font-mono-tech">
              Featured Engineering Systems
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[var(--muted)]">
            INDEXED FLAGSHIP ARCHITECTURES
          </div>
        </div>

        {/* Indexed Modular Cards */}
        <div className="space-y-6">
          {flagshipProjects.map((system) => {
            const isExpanded = expandedCode === system.code;

            return (
              <div
                key={system.code}
                className={`rounded-xl border transition-all duration-200 overflow-hidden glass-panel ${
                  isExpanded
                    ? 'border-[var(--aqua)] shadow-[0_0_20px_rgba(112,241,219,0.12)]'
                    : 'border-[var(--line)] hover:border-[rgba(112,241,219,0.3)]'
                }`}
              >
                {/* Header Bar */}
                <div
                  onClick={() => setExpandedCode(isExpanded ? null : system.code)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono-tech text-sm font-bold text-[var(--aqua)] px-3 py-1 rounded bg-[rgba(112,241,219,0.08)] border border-[rgba(112,241,219,0.2)]">
                      {system.code}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text)] font-mono-tech">
                        {system.title}
                      </h3>
                      <p className="text-xs font-mono-tech text-[var(--soft)] mt-0.5">
                        {system.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={system.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] hover:border-[var(--aqua)] text-xs font-mono-tech text-[var(--soft)] flex items-center gap-1.5 transition-colors"
                    >
                      CODE <span className="text-[var(--aqua)]">→</span>
                    </a>
                    <a
                      href={system.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg bg-[rgba(112,241,219,0.08)] border border-[rgba(112,241,219,0.25)] hover:bg-[var(--aqua)] hover:text-[var(--bg)] text-xs font-mono-tech text-[var(--aqua)] flex items-center gap-1.5 transition-colors"
                    >
                      LIVE DEMO <span className="text-[var(--aqua)]">→</span>
                    </a>
                    <button className="text-[var(--muted)] hover:text-[var(--text)] p-1 ml-1">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expandable Drawer */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[rgba(165,227,217,0.1)] bg-[rgba(5,7,10,0.55)]">
                    <p className="text-sm sm:text-base text-[var(--soft)] leading-relaxed mt-2">
                      {system.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 p-4 rounded-lg bg-[var(--panel)] border border-[var(--line)]">
                      <div className="font-mono-tech text-xs text-[var(--aqua)] font-semibold mb-2 flex items-center gap-2">
                        <Terminal size={14} /> ARCHITECTURAL SPECS &amp; TELEMETRY
                      </div>
                      <div className="space-y-2">
                        {system.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-mono-tech text-[var(--muted)]">
                            <span className="text-[var(--aqua)]">›</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stack Badges */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {system.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.1)] text-xs font-mono-tech text-[var(--soft)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={system.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-tech text-xs text-[var(--aqua)] hover:underline flex items-center gap-1"
                      >
                        AUDIT CODE AT GITHUB.COM/DHRUBOSHOP <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
