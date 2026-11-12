import type { CSSProperties, ReactNode } from "react";

/**
 * Marks its children for a scroll reveal. The content is plain, visible HTML
 * by default; SceneHost adds the motion only when JavaScript is running and
 * the visitor has not asked for reduced motion, so crawlers, screenshots and
 * no-script readers always get the full page.
 */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={className} data-reveal style={delay ? ({ "--d": Math.round(delay * 20) } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}
