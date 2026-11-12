import { PageHero } from "@/components/stage/PageHero";
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
      <Container className="stage-pad-top">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        <PageHero
          no="02"
          label="About"
          ghost="16 yrs"
          title={
            <>
              Dhrubojyoti <em>Gangopadhyay</em>
            </>
          }
          lede={
            <p>
              {profile.headline}. {profile.location.city}, {profile.location.country}.
            </p>
          }
        />
        <div className="grid gap-12 md:grid-cols-[1fr_22rem]">
          <div>
            <div className="prose-site" data-reveal>
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
          <aside className="space-y-4" data-reveal>
            <div className="about-portrait">
              <Image src="/media/portrait-cinematic.webp" alt="Portrait of Dhrubojyoti Gangopadhyay" width={800} height={800} sizes="(max-width: 767px) 92vw, 22rem" priority />
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
        <ol className="timeline">
          {profile.roles.map((r) => (
            <li key={`${r.org}-${r.period}`} data-reveal>
              <p className="timeline-when">{r.period}</p>
              <div>
                <h3>{r.title}</h3>
                <p className="timeline-org">{r.org}</p>
                <p className="timeline-what">{r.summary}</p>
              </div>
            </li>
          ))}
          <li data-reveal>
            <p className="timeline-when">{profile.education.years}</p>
            <div>
              <h3>{profile.education.degree}</h3>
              <p className="timeline-org">{profile.education.school}, West Bengal</p>
            </div>
          </li>
        </ol>
      </Section>

      <Section eyebrow="Questions people ask" title="Straight answers" >
        <dl className="grid gap-6 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.id} id={f.id} className="card scroll-mt-24 p-6" data-reveal>
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
