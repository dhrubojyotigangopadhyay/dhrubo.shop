import type { Metadata } from "next";
import Image from "next/image";
import "../../film.css";
import { ReleaseChart } from "@/components/film/ReleaseChart";
import { workMedia } from "@/content/film";
import github from "@/generated/github.json";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { ApprovalFlow } from "@/components/sections/ApprovalFlow";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Badge, Breadcrumbs, Container } from "@/components/ui/primitives";
import { ProjectViewTracker } from "@/components/sections/ProjectViewTracker";
import { getProject, projects } from "@/content/projects";
import { articles } from "@/content/writing";
import { breadcrumbJsonLd, graph, softwareJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name}: ${p.oneLiner.replace(/\.$/, "")}`,
    description: `${p.summary.slice(0, 150).replace(/\s+\S*$/, "")}… Status: ${p.statusLabel}.`,
    path: `/projects/${p.slug}`,
    keywords: [p.name, ...p.keywords, ...p.stack.slice(0, 5)],
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const related = articles.filter((a) => a.relatedProjects.includes(p.slug));
  const media = workMedia[p.slug];
  const checked = new Date(github.checkedOn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <div className="film case">
    <Container className="pb-16 pt-24">
      <ProjectViewTracker slug={p.slug} status={p.status} />
      <JsonLd
        data={graph(
          webPageJsonLd(`/projects/${p.slug}`, p.name, p.oneLiner),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: p.name, path: `/projects/${p.slug}` },
          ]),
          ...(p.slug === "sahkarmi" ? [softwareJsonLd(p)] : []),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }, { name: p.name, href: `/projects/${p.slug}` }]} />

      <header className="grid gap-8 md:grid-cols-[1fr_16rem]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={p.status === "production" ? "forest" : p.status === "live" ? "cobalt" : p.status === "functional" ? "gold" : "neutral"}>
              {p.statusLabel}
            </Badge>
            <span className="font-mono text-xs text-muted">{p.period}</span>
          </div>
          <h1 className="case-title mt-5">{p.name}</h1>
          <p className="mt-5 max-w-2xl text-xl text-ink-soft">{p.oneLiner}</p>
        </div>
        <aside className="card self-start p-5 text-sm">
          <p className="eyebrow mb-3">Inspect</p>
          <ul className="space-y-2">
            <li>
              <TrackedLink href={p.repo} className="inline-flex items-center gap-1.5 underline underline-offset-4">
                <GitBranch size={14} /> Source repository
              </TrackedLink>
            </li>
            {p.live && (
              <li>
                <TrackedLink href={p.live} className="inline-flex items-center gap-1.5 underline underline-offset-4">
                  <ArrowUpRight size={14} /> {p.liveLabel}
                </TrackedLink>
              </li>
            )}
            {p.slug === "sahkarmi" && (
              <li>
                <TrackedLink href="https://apps.microsoft.com/detail/9PD6BP3NGVST" className="inline-flex items-center gap-1.5 underline underline-offset-4">
                  <ArrowUpRight size={14} /> Microsoft Store listing
                </TrackedLink>
              </li>
            )}
          </ul>
          <p className="mt-4 text-xs text-muted">{p.slug === "sahkarmi" ? `Repository numbers read from GitHub on ${checked}.` : "Facts verified 2 Nov 2026."}</p>
        </aside>
      </header>

      {media && (
        <figure className="case-shot">
          <div className="work-frame">
            <Image src={media.desktop} alt={media.alt} width={1440} height={900} sizes="(max-width: 1100px) 92vw, 1000px" priority />
          </div>
          <div className="work-phone">
            <Image src={media.mobile} alt="" width={600} height={1298} sizes="(max-width: 1100px) 20vw, 210px" />
          </div>
          <figcaption className="work-cap">
            {p.liveLabel}, as it looked on {media.captured}. Unretouched screenshots of the live site.
          </figcaption>
        </figure>
      )}

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_16rem]">
        <div className="prose-site">
          <h2>Summary</h2>
          <p>{p.summary}</p>
          <h2>The problem</h2>
          <p>{p.problem}</p>
          <h2>Architecture</h2>
          <ul>
            {p.architecture.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          {p.slug === "sahkarmi" && (
            <>
              <h2>Release history</h2>
              <p>
                {github.releaseCount} published releases, {github.commits} commits and {github.mergedPrs} merged pull requests on the public
                repository. One square is one release.
              </p>
              <div className="not-prose my-6">
                <ReleaseChart />
              </div>
              <h2>The approval path, interactively</h2>
              <div className="not-prose my-6">
                <ApprovalFlow />
              </div>
            </>
          )}
          <h2>Decisions</h2>
          {p.decisions.map((d) => (
            <div key={d.title}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </div>
          ))}
          <h2>Limitations and honest status</h2>
          <ul>
            {p.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          {related.length > 0 && (
            <>
              <h2>Related writing</h2>
              <ul>
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/writing/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <div>
            <p className="eyebrow mb-3">Evidence</p>
            <dl className="space-y-2">
              {p.evidence.map((e) => (
                <div key={e.label} className="rounded-lg bg-surface-2 px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-muted">{e.label}</dt>
                  <dd className="text-sm font-medium">{e.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow mb-3">Stack</p>
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
    </div>
  );
}
