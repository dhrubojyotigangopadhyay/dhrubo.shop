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
      gsap.fromTo(
        ".site-nav",
        { y: -18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project-visual").forEach((visual) => {
        gsap.fromTo(
          visual,
          { backgroundPositionY: "0%" },
          {
            backgroundPositionY: "100%",
            ease: "none",
            scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      });
    });

    return () => context.revert();
  }, []);

  return <>{children}</>;
}
