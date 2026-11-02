import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * JSON-LD builders. Types follow Google Search Central's supported list as of
 * Nov 2026: Person + ProfilePage, WebSite (no SearchAction: the sitelinks
 * search box was retired), BreadcrumbList, TechArticle with author, and
 * SoftwareApplication for Sahkarmi. No FAQPage (rich result deprecated May
 * 2026), no LocalBusiness/ProfessionalService (no public office exists).
 */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: [profile.shortName, profile.businessName],
    url: `${SITE_URL}/`,
    image: absoluteUrl(profile.portrait),
    jobTitle: profile.headline,
    description:
      "Forward deployed and applied AI engineer in Kolkata, India. Builder of Sahkarmi, an open-source desktop AI-coworker platform with human approval gates; 16 years of enterprise revenue operations before that.",
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.countryCode,
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    worksFor: { "@type": "Organization", name: "1XL Universe" },
    knowsLanguage: profile.languages,
    sameAs: [profile.github, profile.linkedin, profile.x, profile.youtube, profile.instagram, profile.facebook, profile.devto, "https://sahkarmi.site"],
    knowsAbout: [
      "Applied AI engineering",
      "Forward deployed engineering",
      "AI agent systems",
      "Model Context Protocol",
      "Claude Agent SDK",
      "LangGraph",
      "Retrieval-augmented generation",
      "Workflow automation",
      "Electron",
      "TypeScript",
      "Python",
      "Enterprise revenue operations",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: "dhrubo.shop",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageJsonLd(path: string, name: string, dateModified: string) {
  return {
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(path)}#profile`,
    url: absoluteUrl(path),
    name,
    dateModified,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function webPageJsonLd(path: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function softwareJsonLd(project: Project) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(`/projects/${project.slug}`)}#software`,
    name: project.name,
    description: project.oneLiner,
    url: project.live ?? project.repo,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows",
    softwareVersion: "0.17.1",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    isAccessibleForFree: true,
    author: { "@id": PERSON_ID },
    codeRepository: project.repo,
    installUrl: "https://apps.microsoft.com/detail/9PD6BP3NGVST",
  };
}

export function articleJsonLd(input: {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@type": "TechArticle",
    "@id": `${absoluteUrl(input.path)}#article`,
    mainEntityOfPage: absoluteUrl(input.path),
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: absoluteUrl(`/og${input.path}`),
    inLanguage: "en",
    keywords: input.keywords?.join(", "),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
