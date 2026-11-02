import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { articles } from "@/content/writing";
import { buildFeed } from "@/lib/seo/feed";
import { articleJsonLd, breadcrumbJsonLd, graph, personJsonLd, softwareJsonLd } from "@/lib/seo/jsonld";
import { buildLlmsTxt } from "@/lib/seo/llms";
import { buildRobotsTxt } from "@/lib/seo/robots";
import { STATIC_ROUTES, buildSitemap } from "@/lib/seo/routes";
import { SITE_URL } from "@/lib/site";

describe("robots.txt", () => {
  const txt = buildRobotsTxt();
  const groups = txt.split(/\n\s*\n/).filter((g) => /user-agent/i.test(g));
  it("blocks /api/ in every user-agent group that allows crawling", () => {
    for (const g of groups) {
      if (/Allow: \//.test(g)) expect(g).toMatch(/Disallow: \/api\//);
    }
  });
  it("allows Googlebot and OAI-SearchBot, declines GPTBot and ClaudeBot, never names Google-Extended", () => {
    const allow = groups.find((g) => /Googlebot\n/.test(g))!;
    expect(allow).toMatch(/OAI-SearchBot/);
    expect(allow).toMatch(/Allow: \//);
    const deny = groups.find((g) => /GPTBot/.test(g))!;
    expect(deny).toMatch(/ClaudeBot/);
    expect(deny).toMatch(/Disallow: \/$/m);
    expect(deny).not.toMatch(/Allow:/);
    expect(txt).not.toMatch(/^User-agent: Google-Extended/m);
  });
  it("declares the sitemap on the canonical www host and has no Host directive", () => {
    expect(txt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    expect(txt).not.toMatch(/^Host:/m);
  });
});

describe("sitemap", () => {
  const entries = buildSitemap();
  it("covers every static route, project and article exactly once on the www host", () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.length).toBe(STATIC_ROUTES.length + projects.length + articles.length);
    for (const u of urls) expect(u.startsWith("https://www.dhrubo.shop")).toBe(true);
    expect(urls).toContain("https://www.dhrubo.shop/projects/sahkarmi");
  });
  it("never lists API or private paths", () => {
    expect(entries.some((e) => e.url.includes("/api/"))).toBe(false);
  });
});

describe("JSON-LD", () => {
  it("builds a Person with working sameAs links and the real GitHub handle", () => {
    const p = personJsonLd();
    expect(p.sameAs).toContain("https://github.com/ganguydhrubo");
    expect(JSON.stringify(p)).not.toContain("dhruboshop");
    expect(p["@id"]).toBe(`${SITE_URL}/#person`);
  });
  it("emits SoftwareApplication only for Sahkarmi with repository and store links", () => {
    const s = softwareJsonLd(projects[0]);
    expect(s["@type"]).toBe("SoftwareApplication");
    expect(s.codeRepository).toContain("github.com/ganguydhrubo/sahakarmi");
    expect(s.installUrl).toContain("9PD6BP3NGVST");
  });
  it("builds ordered breadcrumbs and a TechArticle with an author reference", () => {
    const b = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Writing", path: "/writing" },
    ]);
    expect(b.itemListElement[1].position).toBe(2);
    const a = articleJsonLd({ path: "/writing/x", title: "T", description: "D", datePublished: "2026-11-02" });
    expect(a["@type"]).toBe("TechArticle");
    expect(a.author["@id"]).toBe(`${SITE_URL}/#person`);
    expect(graph(a)["@context"]).toBe("https://schema.org");
  });
});

describe("feed and llms.txt", () => {
  it("produces valid-looking RSS with one item per article", () => {
    const xml = buildFeed();
    expect(xml.startsWith('<?xml version="1.0"')).toBe(true);
    expect(xml.match(/<item>/g)?.length).toBe(articles.length);
    expect(xml).not.toMatch(/&(?!amp;|lt;|gt;|quot;)/);
  });
  it("llms.txt lists every project with its status and never claims the dead handle", () => {
    const txt = buildLlmsTxt();
    for (const p of projects) expect(txt).toContain(p.name);
    expect(txt).toContain("Prototype");
    expect(txt).not.toContain("dhruboshop");
    expect(txt).not.toMatch(/31\+? (public|production)/);
  });
});
