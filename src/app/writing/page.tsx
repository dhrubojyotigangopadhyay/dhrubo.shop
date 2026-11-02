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
    <Container className="py-10">
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
      <p className="eyebrow mb-3">Writing</p>
      <h1 className="font-display text-4xl sm:text-5xl">Notes from building</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Few pieces, each tied to something I shipped or ran. No listicles. An{" "}
        <a href="/feed.xml" className="underline underline-offset-4">
          RSS feed
        </a>{" "}
        exists.
      </p>
      <ul className="mt-10 divide-y divide-line">
        {sorted.map((a) => (
          <li key={a.slug} className="grid gap-2 py-7 md:grid-cols-[10rem_1fr]">
            <p className="font-mono text-xs text-muted">
              {a.published}
              <br />
              {a.readingMinutes} min · {a.pillar}
            </p>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">
                <Link href={`/writing/${a.slug}`} className="hover:underline underline-offset-4">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl text-ink-soft">{a.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
