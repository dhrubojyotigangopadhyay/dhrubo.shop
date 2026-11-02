/**
 * Canonical site configuration. The live host is www.dhrubo.shop
 * (the apex 308-redirects to www on Vercel), so every canonical URL,
 * sitemap entry and JSON-LD @id is built from this one value.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dhrubo.shop").replace(/\/$/, "");
export const SITE_NAME = "Dhrubo";
export const SITE_TITLE = "Dhrubojyoti Gangopadhyay (Dhrubo) | Forward Deployed & Applied AI Engineer";
export const SITE_DESCRIPTION =
  "Dhrubojyoti Gangopadhyay (Dhrubo) is a forward deployed / applied AI engineer in Kolkata, India. He built Sahkarmi, an open-source desktop AI-coworker platform with human approval gates, and ships agentic systems for business operations after 16 years in enterprise revenue operations.";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-1M1HKNCHYB";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/services", label: "Work with me" },
  { href: "/about", label: "About" },
  { href: "/ask", label: "Ask" },
] as const;
