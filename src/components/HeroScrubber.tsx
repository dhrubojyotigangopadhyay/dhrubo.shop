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

  // Draw frame helper on canvas with device pixel ratio scaling
  const drawFrame = useCallback((index: number, currentProgress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width || 420;
    const displayHeight = rect.height || 420;

    if (canvas.width !== Math.floor(displayWidth * dpr) || canvas.height !== Math.floor(displayHeight * dpr)) {
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const iw = img.naturalWidth || 640;
    const ih = img.naturalHeight || 640;
    const scale = Math.max(displayWidth / iw, displayHeight / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (displayWidth - nw) / 2;
    const cy = (displayHeight - nh) / 2;

    ctx.drawImage(img, cx, cy, nw, nh);

    // Subtle holographic scanlines & grid
    ctx.strokeStyle = 'rgba(112, 241, 219, 0.1)';
    ctx.lineWidth = 1;
    const step = 42;
    for (let x = 0; x < displayWidth; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, displayHeight);
      ctx.stroke();
    }
    for (let y = 0; y < displayHeight; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(displayWidth, y);
      ctx.stroke();
    }

    // Telemetry HUD overlay on canvas
    ctx.font = '10px monospace';
    ctx.fillStyle = '#70f1db';
    ctx.fillText(`FRAME: ${String(index).padStart(2, '0')}/${TOTAL_FRAMES}`, 16, 24);
    ctx.fillStyle = 'rgba(238, 248, 244, 0.6)';
    ctx.fillText(`SCRUB: ${(currentProgress * 100).toFixed(1)}%`, 16, 38);

    ctx.restore();
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

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * TOTAL_FRAMES))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex, latest));
      }

      // Synchronize 3 Stages:
      // 0.00 – 0.33: Stage 0
      // 0.34 – 0.66: Stage 1
      // 0.67 – 1.00: Stage 2
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

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current, progressRef.current);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  const activeNode = timelineNodes[activeStage] || timelineNodes[0];

  // Calculate segmented progress fills
  const seg1 = Math.min(1, Math.max(0, progress / 0.33));
  const seg2 = Math.min(1, Math.max(0, (progress - 0.33) / 0.33));
  const seg3 = Math.min(1, Math.max(0, (progress - 0.67) / 0.33));
  const segmentFills = [seg1, seg2, seg3];

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="relative h-[350vh] bg-[var(--bg)]"
    >
      {/* Viewport Pinned Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-3 border-b border-[var(--line)]">
        
        {/* Top Segmented Timeline HUD Pinned Under Navbar */}
        <div className="max-w-7xl w-full mx-auto pt-2 z-20">
          
          {/* Live Status Beacon Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[rgba(165,227,217,0.1)]">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--green)]" />
              </span>
              <span className="font-mono-tech text-xs tracking-wider text-[var(--green)] font-semibold flex items-center gap-1.5">
                STATUS: AVAILABLE FOR APPLIED AI &amp; PLATFORM CONTRACTS
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono-tech text-xs text-[var(--muted)]">
              <span className="px-2.5 py-0.5 rounded bg-[rgba(112,241,219,0.06)] border border-[rgba(112,241,219,0.15)] text-[var(--aqua)]">
                NODE: KOLKATA [IST]
              </span>
              <span className="hidden md:inline px-2 py-0.5 rounded bg-[var(--panel-2)] border border-[var(--line)] text-[var(--soft)]">
                OPEN TO OPPORTUNITIES 2026
              </span>
            </div>
          </div>

          {/* Top Segmented Timeline HUD Track */}
          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {timelineNodes.map((node, idx) => (
                <div key={node.id} className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-full rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div 
                      className="h-full bg-[var(--aqua)] transition-all duration-75 shadow-[0_0_8px_var(--aqua)]"
                      style={{ width: `${segmentFills[idx] * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech">
                    <span className={activeStage === idx ? 'text-[var(--aqua)] font-bold' : 'text-[var(--muted)]'}>
                      {node.tag}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[var(--muted)]">
                      {Math.round(segmentFills[idx] * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Stage: Interactive Canvas + Synchronized 3D Text Transitions */}
        <div className="max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-2">
          
          {/* Left Column: Synchronized Mission Headline & Meta */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full font-mono-tech text-xs bg-[rgba(112,241,219,0.1)] text-[var(--aqua)] border border-[rgba(112,241,219,0.25)] flex items-center gap-1.5">
                <Zap size={12} /> {activeNode.status}
              </span>
              <span className="font-mono-tech text-xs text-[var(--gold)]">
                {activeNode.latency}
              </span>
            </div>

            {/* 3D Flip/Blur Transition Header */}
            <div 
              key={activeNode.id}
              className="transition-all duration-300 transform"
              style={{
                perspective: '1200px',
                animation: 'textFlipIn 0.38s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
              }}
            >
              <div className="font-mono-tech text-xs text-[var(--muted)] uppercase tracking-widest mb-1">
                {activeNode.prefix}
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-mono-tech text-[var(--text)] tracking-tight leading-none">
                {activeNode.headline}
              </h1>

              <div className="mt-4 p-4 rounded-lg bg-[rgba(13,18,23,0.7)] border border-[rgba(165,227,217,0.15)] max-w-2xl">
                <div className="font-mono-tech text-xs text-[var(--aqua)] font-bold mb-1">
                  {activeNode.missionCode}
                </div>
                <p className="text-sm sm:text-base text-[var(--text)] font-medium leading-relaxed">
                  {activeNode.missionDescription}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {activeNode.extendedDetails}
                </p>
              </div>
            </div>

            {/* Stack Badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {activeNode.stack.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.12)] text-xs font-mono-tech text-[var(--soft)]"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-[var(--aqua)] text-[var(--bg)] font-mono-tech text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 glow-aqua-sm cursor-pointer"
              >
                [ VIEW SYSTEMS ] <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] hover:border-[var(--aqua)] font-mono-tech text-xs text-[var(--soft)] transition-colors flex items-center gap-2 cursor-pointer"
              >
                [ DISPATCH NODE ] <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: HTML5 Canvas Frame Scrubbing Engine */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden glass-panel border border-[var(--line)] shadow-2xl p-2.5">
              
              {/* Corner HUD Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--aqua)] z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--aqua)] z-20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--aqua)] z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--aqua)] z-20 pointer-events-none" />

              {/* HTML5 Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-xl object-cover block bg-[var(--panel)]"
              />

              {/* Frame Preloading Indicator */}
              {loadedFrames < TOTAL_FRAMES && (
                <div className="absolute inset-0 bg-[rgba(5,7,10,0.85)] backdrop-blur-sm flex flex-col items-center justify-center z-30 font-mono-tech text-xs text-[var(--aqua)]">
                  <Activity size={24} className="animate-spin mb-2" />
                  <span>PRELOADING 3D DEPTH SLICES {loadedFrames}/{TOTAL_FRAMES}</span>
                </div>
              )}

              {/* Bottom Holographic HUD overlay */}
              <div className="absolute bottom-4 inset-x-4 px-3 py-1.5 rounded bg-[rgba(5,7,10,0.75)] backdrop-blur-md border border-[rgba(165,227,217,0.15)] flex items-center justify-between text-[10px] font-mono-tech z-20">
                <span className="text-[var(--muted)]">CANVAS_ENGINE // 3D_TURNAROUND</span>
                <span className="text-[var(--aqua)] flex items-center gap-1">
                  <CheckCircle2 size={11} /> SCROLL_SYNC_DPR
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Pinned Footer Cue with Pulsing Indicator */}
        <div className="max-w-7xl w-full mx-auto pb-2 flex items-center justify-between border-t border-[rgba(165,227,217,0.1)] pt-2.5 text-[11px] font-mono-tech text-[var(--muted)] z-20">
          <div className="flex items-center gap-2">
            <span className="text-[var(--aqua)] animate-bounce font-bold">↓</span>
            <span className="text-[var(--aqua)] tracking-wider">SCROLL TO SCRUB TIMELINE</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--aqua)] flex items-center gap-1">
              GitHub @dhruboshop <ExternalLink size={11} />
            </a>
          </div>
        </div>

      </div>

      {/* Global CSS for 3D Text Flip Animation */}
      <style jsx global>{`
        @keyframes textFlipIn {
          from {
            opacity: 0;
            transform: translateY(18px) rotateX(-45deg);
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
