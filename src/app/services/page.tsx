import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, ButtonLink, Container, Section } from "@/components/ui/primitives";
import { services } from "@/content/services";
import { breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const description =
  "How to work with Dhrubojyoti Gangopadhyay: forward deployed / applied AI engineering roles, approval-gated agent workflows for operations, messaging and data integration builds, and retrieval systems with evaluation.";

export const metadata = pageMetadata({
  title: "Work with me: applied AI engineering for operations",
  description,
  path: "/services",
  keywords: ["AI implementation consultant India", "AI workflow automation Kolkata", "agentic AI engineer for hire", "forward deployed AI engineer contract"],
});

export default async function ServicesPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd("/services", "Work with me", description),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work with me", path: "/services" },
          ]),
        )}
        nonce={nonce}
      />
      <Container className="pt-10">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work with me", href: "/services" }]} />
        <p className="eyebrow mb-3">Work with me</p>
        <h1 className="font-display text-4xl sm:text-5xl">Four ways this tends to start</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Each one is described by what gets delivered and what already exists in public as proof. No client names
          are listed here because none have agreed to be; the public systems stand in for them.
        </p>
      </Container>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.id} id={s.id} className="card scroll-mt-24 flex flex-col p-6 sm:p-7">
              <p className="eyebrow">{s.audience}</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">{s.title}</h2>
              <p className="mt-3 text-ink-soft">{s.summary}</p>
              <h3 className="mt-5 text-sm font-semibold">What you get</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <h3 className="mt-5 text-sm font-semibold">Proof</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {s.proof.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="rounded-full border border-line px-3 py-1 text-xs hover:border-line-strong">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="How a project starts" title="Scope first, then code" className="border-y border-line bg-surface/40">
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            ["Discovery call", "Thirty minutes on the actual workflow: inputs, outputs, who approves today, what breaks."],
            ["One-page scope", "Written within a week: metric, failure handling, approval categories, what the system will not do. Free, and yours to keep."],
            ["Build and hand over", "Fixed deliverables with tests and a deployment you can operate. I stay until the metric moves."],
          ].map(([t, d], i) => (
            <li key={t} className="card p-6">
              <p className="font-mono text-xs text-muted">0{i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">
            Start a conversation <ArrowRight size={16} />
          </ButtonLink>
          <ButtonLink href="/resume" variant="secondary">
            Hiring? Résumé
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
