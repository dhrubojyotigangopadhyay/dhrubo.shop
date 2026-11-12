import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { getProject } from "@/content/projects";
import { articles, getArticle } from "@/content/writing";
import { articleJsonLd, breadcrumbJsonLd, graph } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.description,
    path: `/writing/${a.slug}`,
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated ?? a.published,
    keywords: a.keywords,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { default: Body } = await import(`@/content/writing/${a.slug}.mdx`);
  const related = a.relatedProjects.map(getProject).filter(Boolean);

  return (
    <Container className="stage-pad">
      <JsonLd
        data={graph(
          articleJsonLd({ path: `/writing/${a.slug}`, title: a.title, description: a.description, datePublished: a.published, dateModified: a.updated, keywords: a.keywords }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/writing" },
            { name: a.title, path: `/writing/${a.slug}` },
          ]),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Writing", href: "/writing" }, { name: a.title, href: `/writing/${a.slug}` }]} />
      <article className="plate mx-auto max-w-4xl">
        <header>
          <p className="slate">
            <b>Note</b>
            {a.pillar}
          </p>
          <h1 className="poster article-title">{a.title}</h1>
          <p className="mt-6 font-display text-2xl italic text-ink-soft">{a.description}</p>
          <p className="mt-4 font-mono text-xs text-muted">
            By <Link href="/about" className="underline underline-offset-4">Dhrubojyoti Gangopadhyay</Link> · published {a.published}
            {a.updated ? ` · updated ${a.updated}` : ""} · {a.readingMinutes} min read
          </p>
        </header>
        <hr className="my-8 border-line" />
        <div className="prose-site">
          <Body />
        </div>
        {related.length > 0 && (
          <aside className="mt-12 card p-6">
            <p className="eyebrow mb-3">Projects referenced</p>
            <ul className="space-y-2 text-sm">
              {related.map((p) => (
                <li key={p!.slug}>
                  <Link href={`/projects/${p!.slug}`} className="font-medium underline underline-offset-4">
                    {p!.name}
                  </Link>{" "}
                  <span className="text-muted">· {p!.statusLabel}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </Container>
  );
}
