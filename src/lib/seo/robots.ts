import { SITE_URL } from "@/lib/site";

/**
 * Crawler governance policy (decided 2 Nov 2026, see docs/crawler-policy.md):
 *  - Search engines and AI answer/retrieval crawlers may index and cite public pages.
 *  - /api/ is private for every crawler. Google applies only the most specific
 *    user-agent group, so every named group repeats the Disallow.
 *  - Pure model-training crawlers are declined. Google-Extended is left allowed
 *    on purpose: per Google's docs it also gates Gemini grounding and has no
 *    effect on Search ranking or AI Overviews.
 *  - Content-Signal is Cloudflare's proposal; Google ignores unknown fields.
 * Served as a static route so the file can carry comments and grouped agents,
 * which the Next 15 robots() helper cannot express.
 */
const SEARCH_AND_ANSWER_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "bingbot",
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "DuckAssistBot",
  "meta-webindexer",
  "MistralAI-Index",
  "YouBot",
  "Applebot",
  "Amzn-SearchBot",
];

const TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "CCBot",
  "Bytespider",
  "MistralAI-Training",
  "Amazonbot",
  "Timpibot",
];

export function buildRobotsTxt(siteUrl = SITE_URL): string {
  const lines: string[] = [
    "# dhrubo.shop crawler policy (2026-11-02)",
    "# Search engines and AI answer engines: allowed to index and cite public pages.",
    "# Model-training crawlers: declined. Google-Extended intentionally allowed (controls Gemini grounding, not Search).",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "# Content signal (Cloudflare proposal, not a robots directive): search=yes, ai-input=yes, ai-train=no",
    "",
    "# Search and AI-answer retrieval",
    ...SEARCH_AND_ANSWER_BOTS.map((ua) => `User-agent: ${ua}`),
    "Allow: /",
    "Disallow: /api/",
    "",
    "# AI training crawlers",
    ...TRAINING_BOTS.map((ua) => `User-agent: ${ua}`),
    "Disallow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ];
  return lines.join("\n");
}

