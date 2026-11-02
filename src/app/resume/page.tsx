import Link from "next/link";
import { headers } from "next/headers";
import { Download, FileText } from "lucide-react";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { ResumeViewTracker } from "@/components/sections/ResumeViewTracker";
import { profile } from "@/content/profile";
import { breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const description =
  "One-page résumé of Dhrubojyoti Gangopadhyay: Forward Deployed AI Engineer at 1XL Universe, builder of Sahkarmi, three live web products, sixteen years of enterprise revenue operations. PDF, ATS-friendly.";

export const metadata = pageMetadata({ title: "Résumé", description, path: "/resume" });

const competencies = [
  ["Agentic & LLM systems", "LLM agents and tool use, MCP servers and clients, human-in-the-loop approval design, LangGraph multi-agent graphs, hybrid RAG, prompt engineering, LLM-as-judge evaluation"],
  ["Engineering", "TypeScript, Python, Node.js, Electron, SolidJS/React, Next.js, Astro, FastAPI, PostgreSQL/Supabase (RLS), Redis, Docker, Vitest, Playwright, pytest, GitHub Actions CI/CD, Cloudflare Workers/KV, Vercel"],
  ["Models & integrations", "Anthropic Claude (Agent SDK), OpenAI Codex, Google Gemini, Groq, local models; WhatsApp Cloud and Evolution API, Telegram Bot API, Composio, Razorpay, PayPal, Resend, Instagram Graph, X OAuth"],
  ["Enterprise domain", "Revenue operations, channel and distributor management, pricing, rebate and incentive systems, sales MIS, AI adoption training and change management"],
];

export default async function ResumePage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <Container className="py-10">
      <ResumeViewTracker />
      <JsonLd
        data={graph(
          webPageJsonLd("/resume", "Résumé", description),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Résumé", path: "/resume" },
          ]),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Résumé", href: "/resume" }]} />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Résumé</p>
          <h1 className="font-display text-4xl sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-lg text-ink-soft">{profile.headline} · {profile.location.city}, India · open to remote and relocation</p>
        </div>
        <TrackedLink href={profile.resumePath} event="resume_download" className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper" download>
          <Download size={16} /> Download PDF (one page)
        </TrackedLink>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="prose-site max-w-none">
          <h2>Summary</h2>
          <p>
            Applied AI engineer who ships. Sole builder of Sahkarmi, an open-source desktop AI-coworker platform
            (Electron, TypeScript, Claude Agent SDK, Model Context Protocol) with 50 tagged releases, a Microsoft Store
            listing and human approval gates on every sensitive action; also three live web products and a dozen public
            LangGraph and RAG prototypes. Preceded by 16 years of revenue-operations leadership at AGM level in cement,
            steel and industrial distribution. Bridges executive stakeholders and code with no hand-off: discovery,
            scoping, build, deployment and adoption.
          </p>
          <h2>Core competencies</h2>
          <dl>
            {competencies.map(([k, v]) => (
              <div key={k} className="mb-2">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-sm text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
          <h2>Experience</h2>
          {profile.roles.map((r) => (
            <div key={`${r.org}-${r.period}`}>
              <h3>
                {r.title} · {r.org}
              </h3>
              <p className="text-sm text-muted">{r.period}</p>
              <p>{r.summary}</p>
            </div>
          ))}
          <h2>Selected engineering projects</h2>
          <p>
            Full case studies with evidence and limitations are on the <Link href="/projects">projects page</Link>.
          </p>
          <h2>Education</h2>
          <p>
            {profile.education.degree}, {profile.education.school}, {profile.education.years}.
          </p>
        </div>
        <aside className="card self-start p-5 text-sm">
          <p className="eyebrow mb-3">The PDF</p>
          <p className="text-ink-soft">
            Single A4 page, single column, selectable text, standard fonts, real hyperlinks. Built for applicant
            tracking systems; last regenerated 2 November 2026.
          </p>
          <TrackedLink href={profile.resumePath} className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
            <FileText size={14} /> Open in browser
          </TrackedLink>
        </aside>
      </div>
    </Container>
  );
}
