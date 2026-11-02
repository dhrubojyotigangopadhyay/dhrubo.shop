import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ApprovalFlow } from "@/components/sections/ApprovalFlow";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Container, Section, Stat } from "@/components/ui/primitives";
import { JsonLd } from "@/components/site/JsonLd";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { articles } from "@/content/writing";
import { graph, profilePageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: ["Dhrubojyoti Gangopadhyay", "Dhrubo", "Dhrubo AI Builder", "forward deployed AI engineer", "applied AI engineer Kolkata", "agentic AI engineer India", "Sahkarmi"],
});

const paths = [
  {
    who: "Hiring for forward deployed, applied AI or solutions roles?",
    what: "Start with the one-page résumé and the Sahkarmi case study. Every number links to its source.",
    href: "/resume",
    cta: "Résumé and evidence",
  },
  {
    who: "Running operations and considering agents?",
    what: "See how approval-gated workflows are scoped and built, and what they will not do.",
    href: "/services",
    cta: "Work with me",
  },
  {
    who: "Engineer curious how it works?",
    what: "Architecture notes, decisions and honest limitations for each system, plus the writing.",
    href: "/writing",
    cta: "Read the notes",
  },
];

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <JsonLd data={graph(profilePageJsonLd("/", `${profile.name}: ${profile.headline}`, profile.verifiedOn))} nonce={nonce} />
      <Hero />

      <Section eyebrow="Verified on the record" title="Numbers you can click on">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.proof.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <Stat value={p.value} label={p.label} detail={p.detail} href={p.href} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How I build"
        title="The model proposes. A human approves. The decision is recorded."
        intro="This is the architecture inside Sahkarmi. Pick an action to see how the permission policy routes it."
        className="border-y border-line bg-surface/40"
      >
        <ApprovalFlow />
        <p className="mt-4 text-sm text-muted">
          Read the design in full:{" "}
          <Link href="/writing/approval-gates-for-ai-agents" className="underline underline-offset-4">
            Approval gates for AI agents
          </Link>
          .
        </p>
      </Section>

      <Section eyebrow="Selected systems" title="Shipped, with the caveats attached">
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className={i === 0 ? "lg:col-span-3" : ""}>
              <ProjectCard project={p} large={i === 0} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/projects" variant="secondary">
            All projects, including prototypes <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </Section>

      <Section eyebrow="Where this comes from" title="Sixteen years inside the operations I now automate" className="border-y border-line bg-surface/40">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="prose-site">
            <p>
              Before writing software full time I ran revenue operations for cement and steel businesses: dealer
              networks, rebate schemes, collections, MIS. At AGM level the job is to make a chain of hand-offs
              auditable. That is also the job when the hand-offs are between a language model and a bank API.
            </p>
            <p>
              It shapes the engineering: structural gates instead of procedural ones, execution records instead of
              transcripts, and an evaluation set before any demo is called done.
            </p>
            <p>
              <Link href="/about">The full timeline</Link> ·{" "}
              <Link href="/writing/revenue-operations-taught-me-to-distrust-automation">Why operations taught me to distrust automation</Link>
            </p>
          </div>
          <ol className="space-y-3 border-l border-line pl-5">
            {profile.roles.slice(0, 5).map((r) => (
              <li key={r.org} className="relative">
                <span className="absolute -left-[1.45rem] top-2 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <p className="font-mono text-[11px] text-muted">{r.period}</p>
                <p className="font-medium">{r.title}</p>
                <p className="text-sm text-muted">{r.org}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Writing" title="Notes from building">
        <ul className="grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <li key={a.slug} className="card p-6">
              <p className="eyebrow">{a.pillar}</p>
              <h3 className="mt-2 font-display text-2xl">
                <Link href={`/writing/${a.slug}`} className="hover:underline underline-offset-4">
                  {a.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{a.description}</p>
              <p className="mt-3 font-mono text-[11px] text-muted">
                {a.published} · {a.readingMinutes} min
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <p className="eyebrow mb-4">Where to next</p>
          <div className="grid gap-4 md:grid-cols-3">
            {paths.map((p) => (
              <div key={p.href} className="card flex flex-col p-6">
                <h2 className="font-display text-2xl">{p.who}</h2>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{p.what}</p>
                <ButtonLink href={p.href} variant="secondary" className="mt-5 self-start">
                  {p.cta} <ArrowRight size={14} />
                </ButtonLink>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
