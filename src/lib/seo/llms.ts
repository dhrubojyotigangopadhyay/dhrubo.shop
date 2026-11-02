import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { articles } from "@/content/writing";
import { SITE_URL } from "@/lib/site";

/**
 * llms.txt is generated from the same content modules as the pages, so it
 * can never drift from what the site says. Note: as of Nov 2026 no major
 * search or answer engine documents using this file; it is published because
 * it is cheap, accurate and harmless, not because it guarantees anything.
 */
export function buildLlmsTxt(): string {
  const lines = [
    `# ${profile.name} (${profile.shortName})`,
    "",
    `> ${profile.headline}. ${profile.tagline}`,
    "",
    `Site: ${SITE_URL}`,
    `Location: ${profile.location.city}, ${profile.location.country}`,
    `Business name: ${profile.businessName}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `YouTube: ${profile.youtube}`,
    `X: ${profile.x}`,
    `Instagram: ${profile.instagram}`,
    `Facebook: ${profile.facebook}`,
    `dev.to: ${profile.devto}`,
    `Email: ${profile.email}`,
    `Facts last verified: ${profile.verifiedOn}`,
    "",
    "## Identity",
    "",
    `${profile.name} is a forward deployed and applied AI engineer based in Kolkata, India. He builds agentic systems that connect language models to the tools, data and approval steps a business already runs on. He spent ${profile.yearsEnterprise} years (2007 to 2023) in enterprise revenue operations at AGM level in cement and steel before moving into applied AI engineering.`,
    "",
    "## Current roles",
    "",
    ...profile.roles.slice(0, 2).map((r) => `- ${r.title}, ${r.org} (${r.period}): ${r.summary}`),
    "",
    "## Projects (verified)",
    "",
    ...projects.map((p) => `- [${p.name}](${SITE_URL}/projects/${p.slug}): ${p.oneLiner} Status: ${p.statusLabel}. Code: ${p.repo}`),
    "",
    "## Writing",
    "",
    ...articles.map((a) => `- [${a.title}](${SITE_URL}/writing/${a.slug}): ${a.description}`),
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about): biography, timeline, verified facts and answers to common questions`,
    `- [Projects](${SITE_URL}/projects): every public project with its honest status`,
    `- [Work with me](${SITE_URL}/services): engagement types for employers and businesses`,
    `- [Ask](${SITE_URL}/ask): retrieval-grounded assistant answering only from this site's content`,
    `- [Résumé](${SITE_URL}/resume): one-page CV (PDF)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
  ];
  return lines.join("\n");
}

