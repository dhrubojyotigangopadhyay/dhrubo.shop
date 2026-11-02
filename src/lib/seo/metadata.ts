import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Builds consistent per-page metadata: unique title, description, canonical
 * on the www host, Open Graph and Twitter cards pointing at the generated
 * OG image for that route.
 */
export function pageMetadata(meta: PageMeta): Metadata {
  const url = absoluteUrl(meta.path);
  const ogImage = absoluteUrl(`/og${meta.path === "/" ? "" : meta.path}`);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    robots: meta.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: SITE_NAME,
      type: meta.type ?? "website",
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta.title }],
      ...(meta.type === "article"
        ? { publishedTime: meta.publishedTime, modifiedTime: meta.modifiedTime, authors: [absoluteUrl("/about")] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
      creator: "@DhruboZ4U",
    },
  };
}
