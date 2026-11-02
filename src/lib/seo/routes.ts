import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { articles } from "@/content/writing";
import { SITE_URL } from "@/lib/site";

/** Build-time constant so lastModified is honest: it changes only on deploy. */
const BUILD_DATE = new Date();

export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/writing", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ask", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/resume", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export function buildSitemap(): MetadataRoute.Sitemap {
  const statics = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "/" : r.path}`,
    lastModified: BUILD_DATE,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  const projectUrls = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.9 : 0.6,
  }));
  const articleUrls = articles.map((a) => ({
    url: `${SITE_URL}/writing/${a.slug}`,
    lastModified: new Date(a.updated ?? a.published),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...statics, ...projectUrls, ...articleUrls];
}

