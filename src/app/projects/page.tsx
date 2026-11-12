import { workMedia } from "@/content/film";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/stage/PageHero";
import { headers } from "next/headers";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { projects, statusOrder } from "@/content/projects";
import { breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const description =
  "Every public project by Dhrubojyoti Gangopadhyay with its real status: Sahkarmi (released), three live web products, and LangGraph and RAG prototypes. Each entry links to the repository and lists limitations.";

export const metadata = pageMetadata({
  title: "Projects: Sahkarmi, live products and AI prototypes",
  description,
  path: "/projects",
  keywords: ["Sahkarmi", "AI agent projects", "LangGraph projects", "RAG prototype", "Dhrubo projects"],
});

export default async function ProjectsPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const sorted = [...projects].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  const shipped = sorted.filter((p) => p.status !== "prototype");
  const prototypes = sorted.filter((p) => p.status === "prototype");
  return (
    <Container className="stage-pad">
      <JsonLd
        data={graph(
          webPageJsonLd("/projects", "Projects", description),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} />
      <PageHero
        no="04"
        label="Projects"
        ghost="Built"
        title={
          <>
            What is shipped, <em>and what is not</em>
          </>
        }
        lede={
          <p>
            Four labels, used strictly. <strong>Released</strong> means tagged releases, tests, CI and distribution.{" "}
            <strong>Live</strong> means a public URL you can open. <strong>Functional</strong> means it runs and its
            tests pass in CI. <strong>Prototype</strong> means readable code that is not deployed.
          </p>
        }
      />

      <h2 className="poster section-title" data-reveal>
        Released and live
      </h2>
      <div className="showcase">
        {shipped.map((p, i) => {
          const media = workMedia[p.slug];
          if (!media) return <ProjectCard key={p.slug} project={p} />;
          return (
            <article key={p.slug} className={`work showcase-row${i % 2 ? " flip" : ""}`} data-reveal>
              <div>
                <Link href={`/projects/${p.slug}`} className="work-shot" aria-label={`${p.name} case study`}>
                  <div className="work-frame">
                    <Image src={media.desktop} alt={media.alt} width={1440} height={900} sizes="(max-width: 899px) 92vw, 52vw" priority={i === 0} />
                  </div>
                  <div className="work-phone">
                    <Image src={media.mobile} alt="" width={600} height={1298} sizes="(max-width: 899px) 20vw, 11vw" />
                  </div>
                </Link>
                <p className="work-cap">
                  Live site, captured {media.captured} · {p.liveLabel}
                </p>
              </div>
              <div>
                <span className="work-no">
                  {String(i + 1).padStart(2, "0")} · {p.period}
                </span>
                <h3>{p.name}</h3>
                <p className="work-line">{p.oneLiner}</p>
                <p className="work-status">{p.statusLabel}</p>
                <ul className="work-facts">
                  {p.evidence.slice(0, 3).map((e) => (
                    <li key={e.label}>
                      <span>{e.label}</span>
                      {e.value}
                    </li>
                  ))}
                </ul>
                <div className="work-links">
                  <Link className="btn btn-solid" href={`/projects/${p.slug}`}>
                    Case study <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  {p.live && (
                    <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer">
                      {p.liveLabel} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <h2 className="poster section-title mt-24" data-reveal>
        Prototypes
      </h2>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Python systems built between May and July 2026 and uploaded as single commits. Useful for reading the
        architecture; not evidence of production operation.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {prototypes.map((p) => (
          <div key={p.slug} data-reveal>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted">
        Not listed on purpose: forks with no commits of my own, rebrands of other open-source projects, and private
        repositories a recruiter cannot inspect.
      </p>
    </Container>
  );
}
