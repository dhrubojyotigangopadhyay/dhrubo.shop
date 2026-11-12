"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { filmBus, sceneForRoute } from "@/components/film/bus";

const KICK_EVENTS = ["scroll", "touchstart", "pointerdown", "keydown"] as const;

/**
 * Site-wide stage, mounted once in the root layout. It owns the fixed
 * backdrop and the single WebGL scene, which therefore persists across
 * navigation: moving between pages re-forms the same particles instead of
 * starting over. It also runs the scroll reveals and the cursor light on
 * cards for every route. The homepage film takes over scene progress while
 * it is mounted; every other route rests on its own formation and drifts
 * with scroll. Without WebGL the CSS backdrop is all that shows.
 */
export function SceneHost({ releaseDates }: { releaseDates: string[] }) {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef(pathname);
  const [gl, setGl] = useState(false);

  // Boot once.
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lite = coarse || window.innerWidth < 900 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    root.classList.add("film-live");

    let cancelled = false;
    let onVis: (() => void) | undefined;
    const boot = async () => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas || saveData) return;
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
      try {
        const { createScene } = await import("@/components/film/scene");
        if (cancelled) return;
        const scene = createScene({ canvas, releaseDates, lite, reducedMotion: reduced });
        filmBus.scene = scene;
        scene.setProgress(filmBus.target);
        scene.setFocus(filmBus.focus);
        scene.setGain(pathRef.current === "/" ? 1 : sceneForRoute(pathRef.current).gain);
        const sync = () => (document.hidden ? scene.stop() : scene.start());
        onVis = sync;
        document.addEventListener("visibilitychange", sync);
        sync();
        root.classList.add("film-gl");
        setGl(true);
      } catch {
        /* the CSS backdrop remains */
      }
    };

    // Desktop starts when idle after the intro. Phones and low-core machines wait for the
    // first touch or scroll (or a quiet spell) so nothing competes with first paint.
    const wait = lite ? 7000 : root.classList.contains("film-intro") && pathRef.current === "/" ? 3100 : 250;
    let idle = 0;
    let booted = false;
    const kick = () => {
      if (booted) return;
      booted = true;
      window.clearTimeout(timer);
      for (const type of KICK_EVENTS) window.removeEventListener(type, kick);
      if (window.requestIdleCallback) idle = window.requestIdleCallback(() => void boot(), { timeout: 1500 });
      else void boot();
    };
    const timer = window.setTimeout(kick, wait);
    if (lite) for (const type of KICK_EVENTS) window.addEventListener(type, kick, { passive: true, once: true });

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      filmBus.scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      // Cursor light on cards.
      const card = (e.target as HTMLElement).closest?.<HTMLElement>(".card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onResize = () => filmBus.scene?.resize();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      for (const type of KICK_EVENTS) window.removeEventListener(type, kick);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      if (onVis) document.removeEventListener("visibilitychange", onVis);
      filmBus.scene?.dispose();
      filmBus.scene = null;
      root.classList.remove("film-live", "film-gl");
    };
  }, [releaseDates]);

  // Per route: park the scene on this page's formation and reveal its content.
  useEffect(() => {
    pathRef.current = pathname;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const home = pathname === "/";
    let raf = 0;
    if (!home) {
      const { chapter, gain } = sceneForRoute(pathname);
      filmBus.scene?.setGain(gain);
      filmBus.focus = 0;
      filmBus.scene?.setFocus(0);
      let lastY = -1;
      const tick = () => {
        const y = window.scrollY;
        if (y !== lastY) {
          lastY = y;
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          // Travel between the chapter's two camera marks as the page scrolls.
          filmBus.target = chapter + 0.3 + 0.4 * Math.min(1, y / max);
          filmBus.scene?.setProgress(filmBus.target);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else {
      filmBus.scene?.setGain(1);
    }

    const reveals = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          reveals.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    if (!reduced) document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => reveals.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      reveals.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div className="stage-back" aria-hidden="true">
        <div className="film-backdrop" />
        <canvas ref={canvasRef} className={`film-canvas${gl ? " ready" : ""}`} />
        <div className="film-vignette" />
      </div>
      <div className="film-grain" aria-hidden="true" />
    </>
  );
}
