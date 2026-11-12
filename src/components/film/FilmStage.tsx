"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Volume2, VolumeX } from "lucide-react";
import { track } from "@/lib/analytics";
import type { SceneApi } from "@/components/film/scene";

type Chapter = { id: string; no: string; name: string };

const INTRO_KEY = "dhrubo.intro";
const INTRO_MS = 3000;

/**
 * Client conductor for the homepage film. It owns the sticky backdrop
 * (WebGL canvas with a CSS fallback), the chapter HUD, smooth scrolling and
 * the one scroll loop that drives pinned chapters and the camera.
 * All chapter content is server-rendered outside this component; with
 * JavaScript off, reduced motion on, or WebGL missing, the page still reads
 * top to bottom as a normal document.
 */
export function FilmStage({ chapters, releaseDates }: { chapters: readonly Chapter[]; releaseDates: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneApi | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const [active, setActive] = useState(0);
  const [intro, setIntro] = useState(false);
  const [sound, setSound] = useState(false);
  const [gl, setGl] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const film = document.getElementById("film");
    if (!film) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lite = coarse || window.innerWidth < 900 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    root.classList.add(reduced ? "film-static" : "film-on");

    // Intro plays once per session and never under reduced motion.
    let introTimer = 0;
    const endIntro = () => {
      root.classList.remove("film-intro");
      setIntro(false);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
      window.clearTimeout(introTimer);
      window.removeEventListener("wheel", endIntro);
      window.removeEventListener("touchmove", endIntro);
      window.removeEventListener("keydown", endIntro);
    };
    if (reduced) root.classList.remove("film-intro");
    else if (root.classList.contains("film-intro")) {
      setIntro(true);
      introTimer = window.setTimeout(endIntro, INTRO_MS);
      window.addEventListener("wheel", endIntro, { passive: true });
      window.addEventListener("touchmove", endIntro, { passive: true });
      window.addEventListener("keydown", endIntro);
    }

    const lenis = reduced ? null : new Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
    lenisRef.current = lenis;

    const sections = Array.from(film.querySelectorAll<HTMLElement>("[data-chapter]"));
    const pins = Array.from(film.querySelectorAll<HTMLElement>("[data-pin]")).map((el) => ({
      el,
      steps: Number(el.dataset.steps ?? 1),
      items: Array.from(el.querySelectorAll<HTMLElement>("[data-step-item]")),
      dots: Array.from(el.querySelectorAll<HTMLElement>("[data-goto-step]")),
      track: el.querySelector<HTMLElement>("[data-reel-track]"),
      focus: el.dataset.pin === "system",
      step: -1,
      top: 0,
      height: 0,
    }));
    let tops: { top: number; height: number }[] = [];
    let vh = window.innerHeight;
    let dirty = true;
    let lastY = -1;
    let activeIdx = -1;
    let raf = 0;

    const measure = () => {
      vh = window.innerHeight;
      const y = window.scrollY;
      tops = sections.map((s) => {
        const r = s.getBoundingClientRect();
        return { top: r.top + y, height: r.height };
      });
      for (const p of pins) {
        const r = p.el.getBoundingClientRect();
        p.top = r.top + y;
        p.height = r.height;
      }
      dirty = true;
    };

    const update = (y: number) => {
      const mid = y + vh / 2;
      let idx = 0;
      for (let i = 0; i < tops.length; i++) if (mid >= tops[i].top) idx = i;
      const t = tops[idx];
      const local = t ? Math.min(0.999, Math.max(0, (mid - t.top) / t.height)) : 0;
      sceneRef.current?.setProgress(idx + local);
      sections[idx]?.style.setProperty("--p", local.toFixed(4));
      if (idx !== activeIdx) {
        activeIdx = idx;
        setActive(idx);
      }
      if (reduced) return;
      const desktop = window.innerWidth >= 900;
      for (const p of pins) {
        if (y + vh < p.top || y > p.top + p.height) continue;
        const sp = Math.min(1, Math.max(0, (y - p.top) / Math.max(1, p.height - vh)));
        p.el.style.setProperty("--sp", sp.toFixed(4));
        const step = Math.min(p.steps - 1, Math.floor(sp * p.steps));
        if (step !== p.step) {
          p.step = step;
          p.el.dataset.step = String(step);
          p.items.forEach((it) => it.classList.toggle("on", Number(it.dataset.stepItem) === step));
          p.dots.forEach((d) => {
            const on = Number(d.dataset.gotoStep) === step;
            d.classList.toggle("on", on);
            if (on) d.setAttribute("aria-current", "step");
            else d.removeAttribute("aria-current");
          });
          if (p.focus) sceneRef.current?.setFocus(step + 1);
        }
        if (p.track) {
          const overflow = Math.max(0, p.track.scrollWidth - window.innerWidth);
          p.track.style.transform = desktop ? `translate3d(${(-sp * overflow).toFixed(1)}px,0,0)` : "";
        }
      }
    };

    const tick = () => {
      const y = window.scrollY;
      if (dirty || y !== lastY) {
        dirty = false;
        lastY = y;
        update(y);
      }
      raf = requestAnimationFrame(tick);
    };

    // Step dots and system-map labels jump to their place in the pinned scroll.
    const onClick = (e: MouseEvent) => {
      const dot = (e.target as HTMLElement).closest<HTMLElement>("[data-goto-step]");
      if (!dot) return;
      const pin = pins.find((p) => p.el.contains(dot));
      if (!pin || reduced) return;
      const i = Number(dot.dataset.gotoStep);
      const to = pin.top + ((i + 0.5) / pin.steps) * (pin.height - vh);
      if (lenis) lenis.scrollTo(to, { duration: 0.9 });
      else window.scrollTo({ top: to });
    };
    film.addEventListener("click", onClick);

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      sceneRef.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Reveals: content is visible by default; the film only delays what is still below the fold.
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          reveals.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    if (!reduced) film.querySelectorAll("[data-reveal]").forEach((el) => reveals.observe(el));

    const ro = new ResizeObserver(measure);
    ro.observe(film);
    const onResize = () => {
      measure();
      sceneRef.current?.resize();
    };
    window.addEventListener("resize", onResize);
    measure();
    raf = requestAnimationFrame(tick);

    // WebGL arrives after first paint, off the critical path, and only when it is welcome.
    let cancelled = false;
    let onVis: (() => void) | undefined;
    let io: IntersectionObserver | undefined;
    const boot = async () => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas || saveData) return;
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
      try {
        const { createScene } = await import("@/components/film/scene");
        if (cancelled) return;
        const scene = createScene({ canvas, releaseDates, lite, reducedMotion: reduced });
        sceneRef.current = scene;
        let visible = true;
        const sync = () => (visible && !document.hidden ? scene.start() : scene.stop());
        onVis = sync;
        document.addEventListener("visibilitychange", sync);
        io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          sync();
        });
        io.observe(canvas);
        dirty = true;
        sync();
        root.classList.add("film-gl");
        setGl(true);
      } catch {
        /* the CSS backdrop remains */
      }
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(() => void boot(), { timeout: 1200 }) : window.setTimeout(() => void boot(), 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      window.clearTimeout(introTimer);
      window.removeEventListener("wheel", endIntro);
      window.removeEventListener("touchmove", endIntro);
      window.removeEventListener("keydown", endIntro);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      film.removeEventListener("click", onClick);
      if (onVis) document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
      ro.disconnect();
      reveals.disconnect();
      lenis?.destroy();
      lenisRef.current = null;
      sceneRef.current?.dispose();
      sceneRef.current = null;
      root.classList.remove("film-on", "film-static", "film-gl");
    };
  }, [releaseDates]);

  useEffect(
    () => () => {
      void audioRef.current?.ctx.close();
    },
    [],
  );

  const skipIntro = () => {
    document.documentElement.classList.remove("film-intro");
    setIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // A quiet synthesised room tone. Nothing is downloaded and nothing plays until asked.
  const toggleSound = () => {
    const next = !sound;
    if (next && !audioRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      filter.connect(gain).connect(ctx.destination);
      for (const [freq, level] of [[55, 0.5], [55.6, 0.4], [82.4, 0.22], [110.3, 0.1]] as const) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.value = level;
        osc.connect(g).connect(filter);
        osc.start();
      }
      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
      noise.buffer = buffer;
      noise.loop = true;
      const air = ctx.createBiquadFilter();
      air.type = "bandpass";
      air.frequency.value = 900;
      air.Q.value = 0.4;
      const airGain = ctx.createGain();
      airGain.gain.value = 0.05;
      noise.connect(air).connect(airGain).connect(gain);
      noise.start();
      audioRef.current = { ctx, gain };
    }
    const audio = audioRef.current;
    if (audio) {
      void audio.ctx.resume();
      audio.gain.gain.setTargetAtTime(next ? 0.11 : 0, audio.ctx.currentTime, 0.6);
    }
    setSound(next);
    track("film_sound", { on: next });
  };

  const current = chapters[active] ?? chapters[0];

  return (
    <>
      <div className="film-back" aria-hidden="true">
        <div className="film-backdrop" />
        <canvas ref={canvasRef} className={`film-canvas${gl ? " ready" : ""}`} />
        <div className="film-vignette" />
      </div>
      <div className="film-hud">
        <div className="film-grain" aria-hidden="true" />
        <div className="film-bars" aria-hidden="true" />
        <div className="film-floor" aria-hidden="true" />
        {intro && (
          <button type="button" className="film-skip" onClick={skipIntro}>
            Skip intro
          </button>
        )}
        <p className="film-slate" aria-hidden="true">
          <span>{current.no}</span>
          <i />
          {current.name}
        </p>
        <nav className="film-rail" aria-label="Chapters">
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} aria-current={i === active ? "true" : undefined}>
                  <span className="film-rail-name">{c.name}</span>
                  <span className="film-rail-no">{c.no}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <button type="button" className="film-sound" onClick={toggleSound} aria-pressed={sound}>
          {sound ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
          <span>Sound {sound ? "on" : "off"}</span>
        </button>
      </div>
    </>
  );
}
