import { getProject, projects } from "@/content/projects";
import { articles, getArticle } from "@/content/writing";
import { renderOg } from "@/lib/seo/og";
import { STATIC_ROUTES } from "@/lib/seo/routes";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

const STATIC_TITLES: Record<string, { kicker: string; title: string }> = {
  about: { kicker: "About", title: "Forward deployed AI engineer with sixteen years inside enterprise operations." },
  projects: { kicker: "Projects", title: "Shipped, live and prototype: every public system with its honest status." },
  writing: { kicker: "Writing", title: "Notes on agentic systems, retrieval and forward deployed engineering." },
  services: { kicker: "Work with me", title: "Approval-gated agent workflows, integrations and retrieval with evaluation." },
  ask: { kicker: "Ask", title: "An assistant that only knows what this site says, and cites it." },
  contact: { kicker: "Contact", title: "Say what you are trying to do." },
  resume: { kicker: "Résumé", title: "One page. Every number links to its source." },
  privacy: { kicker: "Privacy", title: "What this site collects, and what it does not." },
};

export function generateStaticParams() {
  return [
    ...STATIC_ROUTES.filter((r) => r.path !== "/").map((r) => ({ slug: [r.path.slice(1)] })),
    ...projects.map((p) => ({ slug: ["projects", p.slug] })),
    ...articles.map((a) => ({ slug: ["writing", a.slug] })),
  ];
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const [head, tail] = slug;
  if (head === "projects" && tail) {
    const p = getProject(tail);
    if (p) return renderOg({ kicker: `Project · ${p.statusLabel}`, title: `${p.name}: ${p.oneLiner}`, footer: `dhrubo.shop/projects/${p.slug}` });
  }
  if (head === "writing" && tail) {
    const a = getArticle(tail);
    if (a) return renderOg({ kicker: `Writing · ${a.pillar}`, title: a.title, footer: a.published });
  }
  const s = STATIC_TITLES[head];
  return renderOg({ kicker: s?.kicker ?? "dhrubo.shop", title: s?.title ?? "Dhrubojyoti Gangopadhyay", footer: `dhrubo.shop/${head}` });
}
