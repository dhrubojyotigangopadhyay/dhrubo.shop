import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {(eyebrow || title) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>}
            {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", className, onClick }: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-[opacity,background-color] focus-visible:outline-accent";
  const styles = {
    primary: "bg-ink text-paper hover:opacity-90",
    secondary: "border border-line-strong bg-surface hover:bg-surface-2",
    ghost: "hover:bg-surface-2",
  }[variant];
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, styles, className)} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, styles, className)} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "forest" | "cobalt" | "gold" }) {
  const tones = {
    neutral: "border-line text-muted",
    accent: "border-accent/40 text-accent",
    forest: "border-forest/40 text-forest",
    cobalt: "border-cobalt/40 text-cobalt",
    gold: "border-gold/60 text-gold",
  }[tone];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide", tones)}>
      {children}
    </span>
  );
}

export function Stat({ value, label, detail, href }: { value: string; label: string; detail?: string; href?: string }) {
  const body = (
    <>
      <p className="font-display text-4xl leading-none">{value}</p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {detail && <p className="mt-1 text-xs text-muted">{detail}</p>}
      {href && <p className="mt-2 text-xs text-accent">Open evidence &rarr;</p>}
    </>
  );
  if (!href) return <div className="card p-5">{body}</div>;
  const cls = "card block p-5 transition-colors hover:bg-surface-2 focus-visible:outline-accent";
  const name = `${value} ${label}: open evidence`;
  return /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={name}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls} aria-label={name}>
      {body}
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink-soft">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:underline underline-offset-4">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
