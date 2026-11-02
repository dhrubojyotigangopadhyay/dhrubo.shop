"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { outboundEventFor, track, type AnalyticsEvent } from "@/lib/analytics";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** Override the auto-classified event name. */
  event?: AnalyticsEvent;
  label?: string;
}

/**
 * External/mailto link that emits exactly one typed analytics event on click
 * and carries the correct rel attributes.
 */
export function TrackedLink({ href, children, event, label, onClick, ...rest }: Props) {
  const external = /^https?:\/\//.test(href) && !href.includes("dhrubo.shop");
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        track(event ?? outboundEventFor(href), { href, label: label ?? String(children) });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
      {external && !isMail ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
