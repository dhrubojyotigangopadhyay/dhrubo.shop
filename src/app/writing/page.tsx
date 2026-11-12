import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/stage/PageHero";
import Link from "next/link";
import { headers } from "next/headers";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { articles } from "@/content/writing";
import { breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const description =
  "Notes on agentic systems, forward deployed AI engineering, retrieval and operations, written from shipped work: approval gates, hybrid retrieval with rank fusion, what an FDE actually does.";

export const metadata = pageMetadata({
  title: "Writing on agentic systems, retrieval and forward deployed AI",
  description,
  path: "/writing",
  keywords: ["AI agent architecture", "forward deployed engineer", "hybrid retrieval", "RAG evaluation", "enterprise AI adoption"],
});

export default async function WritingIndex() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const sorted = [...articles].sort((a, b) => (a.published < b.published ? 1 : -1));
  return (
    <Container className="stage-pad">
      <JsonLd
        data={graph(
          webPageJsonLd("/writing", "Writing", description),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/writing" },
          ]),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Writing", href: "/writing" }]} />
      <PageHero
        no="05"
        label="Writing"
        ghost="Notes"
        title={
          <>
            Notes from <em>building</em>
          </>
        }
        lede={
          <p>
            Few pieces, each tied to something I shipped or ran. No listicles. An <a href="/feed.xml">RSS feed</a>{" "}
            exists.
          </p>
        }
      />
      <ul className="index-list">
        {sorted.map((a, i) => (
          <li key={a.slug} data-reveal>
            <Link href={`/writing/${a.slug}`} className="index-row">
              <span className="index-no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="index-body">
                <span className="index-meta">
                  {a.published} · {a.readingMinutes} min · {a.pillar}
                </span>
                <h2>{a.title}</h2>
                <span className="index-desc">{a.description}</span>
              </span>
              <ArrowRight className="index-arrow" size={28} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
