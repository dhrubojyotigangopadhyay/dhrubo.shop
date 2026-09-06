'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  ExternalLink, 
  Activity, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { timelineNodes, profile } from '@/data/site';

const TOTAL_FRAMES = 48;

export default function HeroScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const [loadedFrames, setLoadedFrames] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0); // 0, 1, 2
  const [progress, setProgress] = useState<number>(0);

  // Framer Motion useScroll over 350vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Draw frame helper on canvas
  const drawFrame = useCallback((index: number, currentProgress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Maintain aspect ratio fill/contain
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 640;
    const ih = img.naturalHeight || 640;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.drawImage(img, cx, cy, nw, nh);

    // Subtle holographic grid scan on canvas
    ctx.strokeStyle = 'rgba(112, 241, 219, 0.12)';
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < cw; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ch);
      ctx.stroke();
    }
    for (let y = 0; y < ch; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cw, y);
      ctx.stroke();
    }

    // Dynamic telemetry stamp
    ctx.font = '10px monospace';
    ctx.fillStyle = '#70f1db';
    ctx.fillText(`FRAME: ${String(index).padStart(2, '0')}/${TOTAL_FRAMES}`, 16, 26);
    ctx.fillStyle = 'rgba(238, 248, 244, 0.6)';
    ctx.fillText(`SCRUB_POS: ${(currentProgress * 100).toFixed(1)}%`, 16, 40);
  }, []);

  // Preload all 48 canvas frames
  useEffect(() => {
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/frame_${frameNum}.webp`;
      img.onload = () => {
        count++;
        setLoadedFrames(count);
        // Draw the first frame immediately when ready
        if (i === 0 && canvasRef.current) {
          drawFrame(0, 0);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [drawFrame]);

  // Synchronize canvas draw on scroll ticks via requestAnimationFrame
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      setProgress(latest);
      progressRef.current = latest;

      // Frame mapping
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * TOTAL_FRAMES))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex, latest));
      }

      // Stage synchronization
      // 0.00 – 0.33: Stage 0 (CREATIVE DEVELOPER)
      // 0.34 – 0.66: Stage 1 (AI SYSTEMS ARCHITECT)
      // 0.67 – 1.00: Stage 2 (SCALABLE SYSTEMS)
      if (latest < 0.34) {
        setActiveStage(0);
      } else if (latest < 0.67) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, drawFrame]);

  // Handle canvas sizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = 540;
        canvasRef.current.height = 540;
        drawFrame(currentFrameRef.current, progressRef.current);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  const activeNode = timelineNodes[activeStage] || timelineNodes[0];

  // Calculate individual segment fills (0 to 1)
  const segment1Fill = Math.min(1, Math.max(0, progress / 0.33));
  const segment2Fill = Math.min(1, Math.max(0, (progress - 0.33) / 0.33));
  const segment3Fill = Math.min(1, Math.max(0, (progress - 0.67) / 0.33));
  const segmentFills = [segment1Fill, segment2Fill, segment3Fill];

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="relative h-[350vh] bg-[var(--bg)]"
    >
      {/* Pinned Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-4 border-b border-[var(--line)]">
        
        {/* Top Segment Timeline Scrubber */}
        <div className="max-w-7xl w-full mx-auto pt-2 z-20">
          
          {/* Status Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[rgba(165,227,217,0.1)]">
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
              <span className="hidden md:inline px-2 py-0.5 rounded bg-[var(--panel-2)] border border-[var(--line)] text-[var(--soft)]">
                OPEN TO OPPORTUNITIES 2026
              </span>
            </div>
          </div>

          {/* 3-Segment Progress Bar Track */}
          <div className="pt-3">
            <div className="flex items-center justify-between font-mono-tech text-xs text-[var(--aqua)] mb-1.5 font-bold">
              <span>{"TIMELINE: NODE 01-03"}</span>
              <span className="text-[var(--muted)] font-normal">
                STAGE {activeStage + 1}/3 · SCRUB: {Math.round(progress * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {timelineNodes.map((node, idx) => (
                <div key={node.id} className="flex flex-col gap-1">
                  <div className="h-2 w-full rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div 
                      className="h-full bg-[var(--aqua)] transition-all duration-75 shadow-[0_0_8px_var(--aqua)]"
                      style={{ width: `${segmentFills[idx] * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono-tech">
                    <span className={activeStage === idx ? 'text-[var(--aqua)] font-bold' : 'text-[var(--muted)]'}>
                      {node.tag}
                    </span>
                    <span className="hidden sm:inline text-[var(--soft)] text-[9px]">
                      {node.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Stage: Interactive Canvas + Synchronized 3D Flip Text */}
        <div className="max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-4">
          
          {/* Left: Synchronized 3D Text Flip / Blur Stage */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Dynamic Stage Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full font-mono-tech text-xs bg-[rgba(112,241,219,0.1)] text-[var(--aqua)] border border-[rgba(112,241,219,0.25)] flex items-center gap-1.5">
                <Zap size={12} /> {activeNode.status}
              </span>
              <span className="font-mono-tech text-xs text-[var(--gold)]">
                {activeNode.latency}
              </span>
            </div>

            {/* 3D Flip Header with CSS Perspective Transitions */}
            <div 
              key={activeNode.id}
              className="transition-all duration-300 transform"
              style={{
                perspective: '1000px',
                animation: 'textFlipIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-extrabold font-mono-tech text-[var(--text)] tracking-tight">
                {activeNode.role}
              </h2>
              <h3 className="text-lg sm:text-2xl font-medium text-[var(--soft)] mt-2">
                {activeNode.headline}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-xl">
                {activeNode.description}
              </p>
            </div>

            {/* Stack Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {activeNode.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-md bg-[var(--panel-2)] border border-[rgba(165,227,217,0.15)] text-xs font-mono-tech text-[var(--soft)]"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-[var(--aqua)] text-[var(--bg)] font-mono-tech text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 glow-aqua-sm"
              >
                INITIALIZE COMM <ArrowRight size={14} />
              </a>
              <a
                href="#projects"
                className="px-4 py-2.5 rounded-lg bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--aqua)] font-mono-tech text-xs text-[var(--soft)] transition-colors flex items-center gap-1.5"
              >
                SYSTEMS MATRIX <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: Canvas Frame Scrubbing Engine */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden glass-panel border border-[var(--line)] shadow-2xl p-2.5">
              
              {/* Corner HUD Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--aqua)] z-20" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--aqua)] z-20" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--aqua)] z-20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--aqua)] z-20" />

              {/* The HTML5 Scrollytelling Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-xl object-cover block bg-[var(--panel)]"
              />

              {/* Loading Overlay if frames are downloading */}
              {loadedFrames < TOTAL_FRAMES && (
                <div className="absolute inset-0 bg-[rgba(5,7,10,0.8)] backdrop-blur-sm flex flex-col items-center justify-center z-30 font-mono-tech text-xs text-[var(--aqua)]">
                  <Activity size={24} className="animate-spin mb-2" />
                  <span>STREAMING FRAMES {loadedFrames}/{TOTAL_FRAMES}</span>
                </div>
              )}

              {/* Bottom Holographic HUD telemetry */}
              <div className="absolute bottom-4 inset-x-4 px-3 py-1.5 rounded bg-[rgba(5,7,10,0.7)] backdrop-blur-md border border-[rgba(165,227,217,0.15)] flex items-center justify-between text-[10px] font-mono-tech z-20">
                <span className="text-[var(--muted)]">CANVAS_ENGINE // DEPTH_PARALLAX</span>
                <span className="text-[var(--aqua)] flex items-center gap-1">
                  <CheckCircle2 size={11} /> SCROLL_SYNCHRONIZED
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Pinned Footer Cue */}
        <div className="max-w-7xl w-full mx-auto pb-2 flex items-center justify-between border-t border-[rgba(165,227,217,0.1)] pt-3 text-[11px] font-mono-tech text-[var(--muted)] z-20">
          <div className="flex items-center gap-2">
            <span className="text-[var(--aqua)]">↓</span>
            <span>SCROLL TO SCRUB TIMELINE NODES</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--aqua)] flex items-center gap-1">
              GitHub @ganguydhrubo <ExternalLink size={11} />
            </a>
          </div>
        </div>

      </div>

      {/* Global Style for 3D Text Flip Animation */}
      <style jsx global>{`
        @keyframes textFlipIn {
          from {
            opacity: 0;
            transform: translateY(16px) rotateX(-35deg);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }
      `}</style>
    </section>
  );
}
