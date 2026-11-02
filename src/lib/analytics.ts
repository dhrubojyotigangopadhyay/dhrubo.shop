"use client";

/**
 * Typed GA4 event layer. One function, one taxonomy, no duplicate firing:
 * every component calls track() and nothing else talks to gtag directly.
 * Events are only sent when the gtag function exists (i.e. the GA4 tag is
 * mounted) and never throw.
 */
export type AnalyticsEvent =
  | "scroll_depth"
  | "project_view"
  | "case_study_view"
  | "github_click"
  | "linkedin_click"
  | "contact_click"
  | "email_click"
  | "whatsapp_click"
  | "enquiry_start"
  | "enquiry_submit"
  | "ai_assistant_open"
  | "ai_question_submit"
  | "ai_response_received"
  | "ai_source_click"
  | "resume_view"
  | "resume_download"
  | "outbound_link_click"
  | "theme_toggle"
  | "consent_update";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, { ...params, transport_type: "beacon" });
    }
  } catch {
    /* analytics must never break the page */
  }
}

/** Classify an outbound href so one click handler can emit the right event. */
export function outboundEventFor(href: string): AnalyticsEvent {
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("wa.me") || href.includes("whatsapp")) return "whatsapp_click";
  if (href.includes("github.com")) return "github_click";
  if (href.includes("linkedin.com")) return "linkedin_click";
  return "outbound_link_click";
}
