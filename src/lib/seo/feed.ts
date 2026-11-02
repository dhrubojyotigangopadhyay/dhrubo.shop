import { articles } from "@/content/writing";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildFeed(): string {
  const items = [...articles]
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/writing/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/writing/${a.slug}</guid>
      <pubDate>${new Date(a.published).toUTCString()}</pubDate>
      <description>${esc(a.description)}</description>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dhrubo: writing</title>
    <link>${SITE_URL}/writing</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}
