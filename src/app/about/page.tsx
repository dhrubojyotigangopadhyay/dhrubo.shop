import Image from "next/image";
import github from "@/generated/github.json";
import Link from "next/link";
import { headers } from "next/headers";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Breadcrumbs, Container, Section } from "@/components/ui/primitives";
import { faqs } from "@/content/faq";
import { profile } from "@/content/profile";
import { breadcrumbJsonLd, graph, profilePageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "About Dhrubojyoti Gangopadhyay, forward deployed AI engineer in Kolkata",
  description:
    "Who Dhrubo is: forward deployed and applied AI engineer, builder of Sahkarmi, sixteen years of enterprise revenue operations at AGM level. Timeline, verified facts and answers to common questions.",
  path: "/about",
  keywords: ["Dhrubojyoti Gangopadhyay", "Dhrubo Kolkata", "applied AI engineer biography", "forward deployed engineer India"],
});

export default async function AboutPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <JsonLd
        data={graph(
          profilePageJsonLd("/about", `About ${profile.name}`, profile.verifiedOn),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
        nonce={nonce}
      />
      <Container className="pt-10">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        <div className="grid gap-10 md:grid-cols-[1fr_18rem]">
          <div>
            <p className="eyebrow mb-3">About</p>
            <h1 className="font-display text-4xl sm:text-5xl">Dhrubojyoti Gangopadhyay</h1>
            <p className="mt-3 text-xl text-ink-soft">
              {profile.headline}. {profile.location.city}, {profile.location.country}.
            </p>
            <div className="prose-site mt-8">
              <p>
                I build agentic systems that connect language models to the tools, data and approval steps a business
                already runs on. The flagship is <Link href="/projects/sahkarmi">Sahkarmi</Link>, an open-source
                Windows desktop platform where AI coworkers do real work inside sandboxed browsers and stop for a
                human before anything consequential. It has {github.releaseCount} published releases, a Microsoft Store listing and about
                650 unit tests, and every line of it is public.
              </p>
              <p>
                Since July 2026 I have been the Forward Deployed AI Engineer at 1XL Universe, owning AI adoption across
                HR, sales, marketing, operations, support, finance and technology: scoping departmental problems into
                LLM workflows, writing role-specific curricula and field manuals, and advising on WhatsApp and
                agentic-workflow infrastructure.
              </p>
              <p>
                Before that I spent sixteen years in enterprise revenue operations in cement, steel and consumer
                healthcare, finishing at AGM level. Dealer networks, rebate schemes, collections and MIS taught me that
                plausible output from a trusted system is the most dangerous kind of wrong. That instinct is why my
                agent systems have structural gates and structured records rather than good intentions.
              </p>
              <p>
                Software engineering is a recent and deliberate second career. Public, iterative code starts in 2026; I
                say so plainly because the commit history does.
              </p>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius)] border border-line">
              <Image src={profile.portrait} alt="Portrait of Dhrubojyoti Gangopadhyay" fill sizes="18rem" className="object-cover object-top" priority />
            </div>
            <dl className="card divide-y divide-line text-sm">
              <Row k="Based in">{profile.location.city}, India (IST)</Row>
              <Row k="Open to">Roles in India or remote; scoped engagements</Row>
              <Row k="Languages">{profile.languages.join(", ")}</Row>
              <Row k="Education">
                {profile.education.degree}, {profile.education.school}
              </Row>
              <Row k="Code">
                <TrackedLink href={profile.github} className="underline underline-offset-4">
                  github.com/ganguydhrubo
                </TrackedLink>
              </Row>
              <Row k="Profile">
                <TrackedLink href={profile.linkedin} className="underline underline-offset-4">
                  LinkedIn
                </TrackedLink>
              </Row>
            </dl>
          </aside>
        </div>
      </Container>

      <Section eyebrow="Timeline" title="2007 to now">
        <ol className="relative border-l border-line pl-6">
          {profile.roles.map((r) => (
            <li key={`${r.org}-${r.period}`} className="relative mb-8">
              <span className="absolute -left-[1.7rem] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" aria-hidden="true" />
              <p className="font-mono text-xs text-muted">{r.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{r.title}</h3>
              <p className="text-sm text-muted">{r.org}</p>
              <p className="mt-2 max-w-2xl text-sm text-ink-soft">{r.summary}</p>
            </li>
          ))}
          <li className="relative">
            <span className="absolute -left-[1.7rem] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-muted" aria-hidden="true" />
            <p className="font-mono text-xs text-muted">{profile.education.years}</p>
            <h3 className="mt-1 text-lg font-semibold">{profile.education.degree}</h3>
            <p className="text-sm text-muted">{profile.education.school}, West Bengal</p>
          </li>
        </ol>
      </Section>

      <Section eyebrow="Questions people ask" title="Straight answers" className="border-t border-line bg-surface/40">
        <dl className="grid gap-6 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.id} id={f.id} className="card scroll-mt-24 p-6">
              <dt className="font-display text-xl">{f.question}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-soft">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-2 px-4 py-2.5">
      <dt className="text-muted">{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}
