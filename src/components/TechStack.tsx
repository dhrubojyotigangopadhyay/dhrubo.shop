'use client';

import React, { useState, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { techMatrix } from '@/data/site';

function TechPill({ 
  item, 
  isSelected, 
  onSelect 
}: { 
  item: typeof techMatrix[0]; 
  isSelected: boolean; 
  onSelect: () => void 
}) {
  const pillRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, hover: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      hover: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, hover: false }));
  };

  return (
    <div
      ref={pillRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 overflow-hidden border ${
        isSelected
          ? 'bg-[var(--panel-2)] border-[var(--aqua)] shadow-[0_0_16px_rgba(112,241,219,0.2)]'
          : 'bg-[rgba(13,18,23,0.7)] border-[rgba(165,227,217,0.12)] hover:border-[rgba(112,241,219,0.4)]'
      }`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {mousePos.hover && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(112, 241, 219, 0.22), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono-tech text-sm font-bold text-[var(--text)]">
          {item.name}
        </span>
        <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[var(--panel)] text-[var(--muted)] border border-[rgba(165,227,217,0.08)]">
          {item.category.split(' ')[0]}
        </span>
      </div>

      <p className="relative z-10 mt-1.5 text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedTech, setSelectedTech] = useState<typeof techMatrix[0] | null>(techMatrix[0]);

  const categories = [
    'ALL',
    'Backend & Systems',
    'Voice & Telephony',
    'Data & Storage',
    'Inference & LLMs',
    'Automation & Ops',
    'Agentic & Graph',
  ];

  const filteredItems = selectedCategory === 'ALL'
    ? techMatrix
    : techMatrix.filter((item) => item.category === selectedCategory);

  return (
    <section id="stack" className="py-16 sm:py-24 border-b border-[var(--line)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono-tech text-xs text-[var(--aqua)] tracking-wider uppercase mb-1">
              {"// INTERACTIVE TECH MATRIX"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
              Production Protocols &amp; Verified Stack
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[var(--muted)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--aqua)] animate-pulse" />
            SPOTLIGHT ACTIVE · CURSOR-INTERACTIVE
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[rgba(165,227,217,0.1)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--aqua)] text-[var(--bg)] font-bold shadow-[0_0_10px_rgba(112,241,219,0.25)]'
                  : 'bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--text)] border border-[rgba(165,227,217,0.1)]'
              }`}
            >
              {cat === 'ALL' ? '// ALL PROTOCOLS' : cat}
            </button>
          ))}
        </div>

        {/* Interactive Matrix Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <TechPill
              key={item.name}
              item={item}
              isSelected={selectedTech?.name === item.name}
              onSelect={() => setSelectedTech(item)}
            />
          ))}
        </div>

        {/* Inspector Panel for Selected Tech */}
        {selectedTech && (
          <div className="mt-8 p-4 sm:p-6 rounded-xl glass-panel-subtle border border-[var(--line)]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[rgba(165,227,217,0.1)]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[var(--aqua)]" />
                <span className="font-mono-tech text-xs text-[var(--aqua)] font-bold">
                  INSPECTOR // {selectedTech.name.toUpperCase()}
                </span>
              </div>
              <span className="font-mono-tech text-xs text-[var(--muted)]">
                PROTOCOL DOMAIN: {selectedTech.category}
              </span>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-[var(--soft)] font-mono-tech">
                {selectedTech.description}
              </p>
              <div className="shrink-0 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[rgba(112,241,219,0.08)] border border-[rgba(112,241,219,0.2)] text-[var(--aqua)] font-mono-tech text-xs">
                  VERIFIED IN PRODUCTION
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
