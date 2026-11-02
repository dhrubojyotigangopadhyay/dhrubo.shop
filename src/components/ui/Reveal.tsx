import type { ReactNode } from "react";

/**
 * Deliberately a no-op wrapper. An earlier version animated opacity on
 * scroll; it hid below-the-fold content from full-page screenshots,
 * reduced-motion users and any renderer that does not fire
 * IntersectionObserver, which is a bad trade for a portfolio whose job is
 * to be read. Motion is reserved for interactive components.
 */
export function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}
