import knowledge from "@/generated/knowledge.json";
import { buildLlmsTxt } from "@/lib/seo/llms";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Full-text companion to llms.txt: every passage the assistant can cite, grouped by page. */
export function GET() {
  const byUrl = new Map<string, { title: string; parts: string[] }>();
  for (const c of knowledge.chunks) {
    const key = c.url.split("#")[0];
    const entry = byUrl.get(key) ?? { title: c.title, parts: [] };
    entry.parts.push(`${c.section}: ${c.text}`);
    byUrl.set(key, entry);
  }
  const body = Array.from(byUrl.entries())
    .map(([url, e]) => `## ${e.title}\n${SITE_URL}${url}\n\n${e.parts.join("\n\n")}`)
    .join("\n\n---\n\n");
  return new Response(`${buildLlmsTxt()}\n\n# Full text\n\n${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
