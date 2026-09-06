'use client';

import React, { useState, useRef } from 'react';
import { Terminal, CheckCircle2 } from 'lucide-react';
import { techStackCategories } from '@/data/site';

function TechPill({ 
  name, 
  desc, 
  category, 
  isSelected, 
  onSelect 
}: { 
  name: string; 
  desc: string; 
  category: string; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  const pillRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div
      ref={pillRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 overflow-hidden border select-none ${
        isSelected
          ? 'bg-[var(--panel-2)] border-[var(--aqua)] shadow-[0_0_16px_rgba(112,241,219,0.22)]'
          : 'bg-[rgba(13,18,23,0.7)] border-[rgba(165,227,217,0.12)] hover:border-[rgba(112,241,219,0.4)]'
      }`}
    >
      {/* Dynamic Cursor Hover Spotlight */}
      {mousePos.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-150"
          style={{
            background: `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, rgba(112, 241, 219, 0.22), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono-tech text-sm font-bold text-[var(--text)]">
          {name}
        </span>
        <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[var(--panel)] text-[var(--muted)] border border-[rgba(165,227,217,0.08)]">
          {category.split(' ')[0]}
        </span>
      </div>

      <p className="relative z-10 mt-1.5 text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
        {desc}
      </p>
    </div>
  );
}

export default function TechStack() {
  const [selectedItem, setSelectedItem] = useState<{ name: string; desc: string; category: string } | null>({
    name: "Groq LPUs",
    desc: "Ultra-low latency inference for streaming agent loops & real-time extraction",
    category: "AI & Model Orchestration",
  });

  return (
    <section id="stack" className="py-16 sm:py-24 border-b border-[var(--line)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <div className="font-mono-tech text-xs text-[var(--aqua)] tracking-wider uppercase mb-1">
              {"// TECHNICAL STACK"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight font-mono-tech">
              Technologies Under Management
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[var(--muted)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--aqua)] animate-pulse" />
            DYNAMIC CURSOR-TRACKING SPOTLIGHTS
          </div>
        </div>

        {/* 3 High-Density Groupings */}
        <div className="space-y-8">
          {techStackCategories.map((group) => (
            <div key={group.category} className="p-5 sm:p-6 rounded-xl glass-panel-subtle border border-[var(--line)]">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[rgba(165,227,217,0.1)]">
                <div>
                  <h3 className="font-mono-tech text-base font-bold text-[var(--aqua)]">
                    {group.category}
                  </h3>
                  <p className="text-xs font-mono-tech text-[var(--muted)] mt-0.5">
                    {group.description}
                  </p>
                </div>
                <span className="text-xs font-mono-tech text-[var(--soft)] px-2 py-0.5 rounded bg-[var(--panel)] border border-[rgba(165,227,217,0.1)]">
                  {group.items.length} MODULES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {group.items.map((item) => (
                  <TechPill
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    category={group.category}
                    isSelected={selectedItem?.name === item.name}
                    onSelect={() => setSelectedItem({ name: item.name, desc: item.desc, category: group.category })}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Module Live Telemetry Inspector */}
        {selectedItem && (
          <div className="mt-8 p-4 sm:p-6 rounded-xl glass-panel border border-[var(--line)]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[rgba(165,227,217,0.1)]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[var(--aqua)]" />
                <span className="font-mono-tech text-xs text-[var(--aqua)] font-bold">
                  TELEMETRY INSPECTOR // {selectedItem.name.toUpperCase()}
                </span>
              </div>
              <span className="font-mono-tech text-xs text-[var(--muted)]">
                GROUP: {selectedItem.category}
              </span>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-mono-tech text-[var(--soft)]">
                {selectedItem.desc}
              </p>
              <div className="shrink-0 flex items-center gap-2 font-mono-tech text-xs text-[var(--green)]">
                <CheckCircle2 size={13} /> 100% PRODUCTION VERIFIED
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
