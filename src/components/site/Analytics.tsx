"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/site";
import { track } from "@/lib/analytics";

const CONSENT_KEY = "dhrubo.consent.v1";
type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function applyConsent(value: Consent) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

/**
 * GA4 with Consent Mode v2. The default state is set before the tag loads
 * (beforeInteractive), analytics storage stays denied until the visitor
 * accepts, and advertising signals are always denied: this site runs no ads.
 * The measurement ID is the property that has been attached to dhrubo.shop
 * since January 2026, so historical data continues in the same property.
 */
/** Inline, nonce-tagged, rendered in the root layout <head> before the GA tag loads. */
export const CONSENT_DEFAULT = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});";

export function Analytics({ nonce }: { nonce?: string }) {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} nonce={nonce} />
      <ConsentBanner />
      <ScrollDepth />
    </>
  );
}

function ConsentBanner() {
  const [state, setState] = useState<Consent | null | "unknown">("unknown");

  useEffect(() => {
    const saved = readConsent();
    setState(saved);
    if (saved) applyConsent(saved);
  }, []);

  if (state !== null) return null;

  const choose = (value: Consent) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* private mode */
    }
    applyConsent(value);
    track("consent_update", { value });
    setState(value);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-xl border border-line bg-surface p-4 shadow-card sm:inset-x-auto sm:right-4 sm:bottom-4"
    >
      <p className="text-sm text-ink-soft">
        This site uses Google Analytics to understand which pages and projects are useful. No advertising, no cross-site
        tracking. Accept to allow an analytics cookie; decline and only cookieless, aggregated pings are sent.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-lg border border-line-strong px-3.5 py-2 text-sm font-medium hover:bg-surface-2"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

/** Fires scroll_depth once per threshold per page view. */
function ScrollDepth() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();
    const thresholds = [25, 50, 75, 90];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
        for (const t of thresholds) {
          if (pct >= t && !fired.current.has(t)) {
            fired.current.add(t);
            track("scroll_depth", { percent: t, page_path: pathname });
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
