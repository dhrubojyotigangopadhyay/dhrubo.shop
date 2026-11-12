import type { ReactNode } from "react";

/**
 * Opening frame for every inner page: a numbered slate, a poster headline
 * with one serif-italic phrase, an outlined ghost word behind it, and room
 * for a lede and actions. Mirrors the chapter grammar of the homepage film.
 */
export function PageHero({
  no,
  label,
  title,
  ghost,
  lede,
  children,
  compact = false,
}: {
  no: string;
  label: string;
  title: ReactNode;
  ghost?: string;
  lede?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <header className={`page-hero${compact ? " compact" : ""}`}>
      {ghost && (
        <span className="page-ghost" aria-hidden="true">
          {ghost}
        </span>
      )}
      <p className="slate" data-reveal>
        <b>{no}</b>
        {label}
      </p>
      <h1 className="poster page-title" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
        {title}
      </h1>
      {lede && (
        <div className="lede" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          {lede}
        </div>
      )}
      {children && (
        <div className="page-hero-actions" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
          {children}
        </div>
      )}
    </header>
  );
}
