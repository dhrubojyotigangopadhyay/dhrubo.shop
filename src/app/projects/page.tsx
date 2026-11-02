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
    <Container className="py-10">
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
      <p className="eyebrow mb-3">Projects</p>
      <h1 className="font-display text-4xl sm:text-5xl">What is shipped, and what is not</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Four labels, used strictly. <strong>Released</strong> means tagged releases, tests, CI and distribution.{" "}
        <strong>Live</strong> means a public URL you can open. <strong>Functional</strong> means it runs and its tests
        pass in CI. <strong>Prototype</strong> means readable code that is not deployed. Numbers were verified on 2
        November 2026.
      </p>

      <h2 className="mt-12 font-display text-3xl">Released and live</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {shipped.map((p, i) => (
          <div key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={p} large={i === 0} />
          </div>
        ))}
      </div>

      <h2 className="mt-16 font-display text-3xl">Prototypes</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Python systems built between May and July 2026 and uploaded as single commits. Useful for reading the
        architecture; not evidence of production operation.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {prototypes.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <p className="mt-12 text-sm text-muted">
        Not listed on purpose: forks with no commits of my own, rebrands of other open-source projects, and private
        repositories a recruiter cannot inspect.
      </p>
    </Container>
  );
}
