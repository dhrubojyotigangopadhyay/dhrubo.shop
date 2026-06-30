"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const context = gsap.context(() => {
      gsap.fromTo(".preloader", { autoAlpha: 1 }, { autoAlpha: 0, delay: 0.55, duration: 0.6, ease: "power2.out", pointerEvents: "none" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34, autoAlpha: 0, clipPath: "inset(12% 0% 0% 0%)" },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((el) => {
        const target = Number(el.dataset.count || 0);
        if (!target) return;
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${el.dataset.prefix || ""}${Math.round(obj.value)}${el.dataset.suffix || ""}`;
          },
        });
      });

      gsap.to(".hero-canvas", {
        opacity: 0,
        yPercent: -10,
        scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <div className="preloader">
        <div className="preloader-mark">DHRUBO</div>
        <div className="preloader-line" />
      </div>
      {children}
    </>
  );
}
