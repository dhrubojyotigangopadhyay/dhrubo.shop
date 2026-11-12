import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { FilmStage } from "@/components/film/FilmStage";
import { MethodCases } from "@/components/film/MethodCases";
import { ReleaseChart } from "@/components/film/ReleaseChart";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { chapters, journey, principles, systemNodes, workMedia } from "@/content/film";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import github from "@/generated/github.json";
import { graph, profilePageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: [
    "Dhrubojyoti Gangopadhyay",
    "Dhrubo",
    "Forward Deployed AI Engineer",
    "Applied AI Engineer",
    "Agentic AI Engineer",
    "MCP integration",
    "enterprise AI automation",
    "AI coworker platform",
    "revenue operations",
    "AI systems builder",
    "Sahkarmi",
  ],
});

const REEL = ["sahkarmi", "atittle", "auraleads", "zappy"];
const work = REEL.map((slug) => projects.find((p) => p.slug === slug)!);
const repos = projects.filter((p) => !REEL.includes(p.slug));
const steps = (n: number) => ({ "--steps": n }) as CSSProperties;
const delay = (n: number) => ({ "--d": n }) as CSSProperties;
const order = (n: number) => ({ "--i": n }) as CSSProperties;

function Slate({ index }: { index: number }) {
  const c = chapters[index];
  return (
    <p className="slate" data-reveal>
      <b>{c.no}</b>
      {c.name}
    </p>
  );
}

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <div className="film" id="film">
      <JsonLd data={graph(profilePageJsonLd("/", `${profile.name}: ${profile.headline}`, profile.verifiedOn))} nonce={nonce} />
      <FilmStage chapters={chapters} />

      {/* 01 ---------------------------------------------------------- */}
      <section id="opening" data-chapter className="ch ch-opening" aria-labelledby="opening-title">
        <p className="intro-line" aria-hidden="true">
          The future doesn&rsquo;t
          <br />
          build itself.
        </p>
        <div className="hero">
          <div className="hero-portrait">
            <Image
              src="/media/portrait-cinematic.webp"
              alt="Portrait of Dhrubojyoti Gangopadhyay in a dark suit, lit from one side."
              width={800}
              height={800}
              priority
              sizes="(max-width: 899px) 112vw, 62vw"
            />
          </div>
          <p className="hero-kicker" style={order(0)}>
            The future doesn&rsquo;t build itself.
          </p>
          <h1 id="opening-title" style={order(1)}>
            <span className="hero-name">
              Dhrubo<i>.</i>
            </span>
            <span className="sr-only"> Dhrubojyoti Gangopadhyay, Forward Deployed AI Engineer</span>
          </h1>
          <p className="hero-build" style={order(2)}>
            Building intelligent systems.
          </p>
          <p className="hero-meta" style={order(3)}>
            <strong>Forward Deployed AI Engineer</strong>
            Agentic Systems <span aria-hidden="true">|</span> Applied AI <span aria-hidden="true">|</span> Enterprise Automation
          </p>
          <div className="hero-cta" style={order(4)}>
            <a className="btn btn-solid" href="#journey">
              Begin <ArrowDown size={14} aria-hidden="true" />
            </a>
            <Link className="btn" href="/resume">
              Résumé
            </Link>
            <a className="btn" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* 02 ---------------------------------------------------------- */}
      <section id="journey" data-chapter className="ch ch-journey" aria-labelledby="journey-title">
        <div className="ch-inner">
          <Slate index={1} />
          <h2 id="journey-title" className="poster" data-reveal style={delay(1)}>
            Sixteen years where a wrong number <em>costs real money.</em>
          </h2>
          <p className="lede" data-reveal style={delay(2)}>
            Before the code there was cement, steel and industrial distribution: dealer networks, rebate schemes,
            collections and the revenue operations that hold them together. That is where the engineering comes from.
          </p>
        </div>
        <div className="pin" data-pin="journey" data-steps={journey.length} style={steps(journey.length)}>
          <div className="pin-stage journey-stage">
            <ol className="journey-list">
              {journey.map((j, i) => (
                <li key={j.span} data-step-item={i} className={`journey-item${"turn" in j ? " turn" : ""}${i === 0 ? " on" : ""}`}>
                  <span className="journey-year" aria-hidden="true">
                    {j.years}
                  </span>
                  <span className="journey-span">
                    {j.span} · {j.sector}
                  </span>
                  <h3 className="journey-role">{j.role}</h3>
                  <p className="journey-org">{j.org}</p>
                  <p className="journey-line">{j.line}</p>
                </li>
              ))}
            </ol>
            <div className="journey-nav" aria-hidden="true">
              {journey.map((j, i) => (
                <button key={j.span} type="button" tabIndex={-1} data-goto-step={i} className={i === 0 ? "on" : undefined}>
                  {j.years}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="journey-coda">
          <blockquote data-reveal>
            At AGM level the job is to make a chain of hand-offs auditable. That is also the job when the hand-offs are
            between <em>a language model and a bank API.</em>
          </blockquote>
          <p className="lede" data-reveal style={delay(1)}>
            <Link className="text-link" href="/about">
              The full timeline
            </Link>{" "}
            ·{" "}
            <Link className="text-link" href="/writing/revenue-operations-taught-me-to-distrust-automation">
              Why operations taught me to distrust automation
            </Link>
          </p>
        </div>
      </section>

      {/* 03 ---------------------------------------------------------- */}
      <section id="engineer" data-chapter className="ch ch-engineer" aria-labelledby="engineer-title">
        <div className="ch-inner">
          <Slate index={2} />
          <h2 id="engineer-title" className="poster" data-reveal style={delay(1)}>
            Seven parts. <em>One system.</em>
          </h2>
          <p className="lede" data-reveal style={delay(2)}>
            Agents, tools, retrieval and automation are only useful once they are wired together and somebody is
            accountable for what they do. This is the system I build, and how its parts connect.
          </p>
        </div>
        <div className="pin" data-pin="system" data-steps={systemNodes.length} style={steps(systemNodes.length)}>
          <div className="pin-stage sys-stage">
            <div className="sys-labels">
              {systemNodes.map((n, i) => (
                <button key={n.key} type="button" className={`sys-label${i === 0 ? " on" : ""}`} data-sysnode={i} data-goto-step={i}>
                  {n.label}
                </button>
              ))}
            </div>
            <div className="sys-panel">
              {systemNodes.map((n, i) => (
                <article key={n.key} className={`sys-card${i === 0 ? " on" : ""}`} data-step-item={i}>
                  <span className="sys-no">
                    {String(i + 1).padStart(2, "0")} / {String(systemNodes.length).padStart(2, "0")} · {n.label}
                  </span>
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                  <p className="sys-link">{n.link}</p>
                  <p className="sys-proof">Built in: {n.proof}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 ---------------------------------------------------------- */}
      <section id="builder" data-chapter className="ch ch-builder" aria-labelledby="builder-title">
        <div className="pin" data-pin="reel" data-steps={work.length} style={steps(work.length)}>
          <div className="pin-stage reel-stage">
            <div className="reel-head">
              <Slate index={3} />
              <h2 id="builder-title" className="poster" data-reveal style={delay(1)}>
                Four products. <em>Shipped.</em>
              </h2>
            </div>
            <div className="reel-track" data-reel-track>
              {work.map((p, i) => {
                const media = workMedia[p.slug];
                return (
                  <article key={p.slug} className="work">
                    <div>
                      <Link href={`/projects/${p.slug}`} className="work-shot" aria-label={`${p.name} case study`}>
                        <div className="work-frame">
                          <Image src={media.desktop} alt={media.alt} width={1440} height={900} sizes="(max-width: 899px) 92vw, 48vw" loading="lazy" />
                        </div>
                        <div className="work-phone">
                          <Image src={media.mobile} alt="" width={600} height={1298} sizes="(max-width: 899px) 20vw, 10vw" loading="lazy" />
                        </div>
                      </Link>
                      <p className="work-cap">
                        Live site, captured {media.captured} · {p.liveLabel}
                      </p>
                    </div>
                    <div>
                      <span className="work-no">
                        {String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
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
              <div className="reel-end">
                <p>And a dozen public prototypes, each with its caveats attached.</p>
                <div>
                  <Link className="btn" href="/projects">
                    All projects <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="reel-progress" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 05 ---------------------------------------------------------- */}
      <section id="thinker" data-chapter className="ch ch-thinker" aria-labelledby="thinker-title">
        <div className="ch-inner">
          <Slate index={4} />
          <h2 id="thinker-title" className="poster" data-reveal style={delay(1)}>
            From a business problem to <em>a production outcome.</em>
          </h2>
          <p className="lede" data-reveal style={delay(2)}>
            The same seven steps every time, whether the subject is a dealer incentive scheme or an AI coworker. The
            sixth step is the one most automation skips.
          </p>
        </div>
        <MethodCases />
      </section>

      {/* 06 ---------------------------------------------------------- */}
      <section id="proof" data-chapter className="ch ch-proof" aria-labelledby="proof-title">
        <div className="ch-inner">
          <Slate index={5} />
          <h2 id="proof-title" className="poster" data-reveal style={delay(1)}>
            Don&rsquo;t take <em>my word</em> for it.
          </h2>
          <p className="lede" data-reveal style={delay(2)}>
            Every number here opens the public record it came from. Sahkarmi is one repository, built in the open under
            Apache-2.0.
          </p>
          <ul className="proof-stats">
            <li data-reveal>
              <a href={`${github.url}/releases`} target="_blank" rel="noopener noreferrer">
                <strong>{github.releaseCount}</strong>
                <span>Published releases</span>
                <small>
                  {github.first.tag} to {github.latest.tag}
                </small>
              </a>
            </li>
            <li data-reveal style={delay(1)}>
              <a href={`${github.url}/commits`} target="_blank" rel="noopener noreferrer">
                <strong>{github.commits}</strong>
                <span>Commits on main</span>
                <small>github.com/{github.repo}</small>
              </a>
            </li>
            <li data-reveal style={delay(2)}>
              <a href={`${github.url}/pulls?q=is%3Apr+is%3Amerged`} target="_blank" rel="noopener noreferrer">
                <strong>{github.mergedPrs}</strong>
                <span>Merged pull requests</span>
                <small>CI runs on every one</small>
              </a>
            </li>
            <li data-reveal style={delay(3)}>
              <Link href="/about">
                <strong>16</strong>
                <span>Years in revenue operations</span>
                <small>2007 to 2023, to AGM level</small>
              </Link>
            </li>
          </ul>
          <ReleaseChart />
          <div className="proof-cols">
            <div data-reveal>
              <h3>Engineering on the record</h3>
              <ul className="proof-list">
                <li>
                  <strong>16 permission categories</strong>, with gates for payments, customer messages, publishing and
                  shell access that cannot be overridden.
                </li>
                <li>
                  <strong>209 sender-validated IPC channels</strong> in a hardened Electron shell: context isolation,
                  sandbox, CSP and fuses.
                </li>
                <li>
                  <strong>Tag-driven releases</strong> with SHA-256 checksums, an SPDX SBOM and build-provenance
                  attestation.
                </li>
                <li>
                  <strong>110,000+ lines</strong> added over an Apache-2.0 base (OpenBot v0.1.11), with attribution kept
                  in NOTICE.
                </li>
                <li>
                  <strong>Microsoft Store and Scoop</strong> distribution.{" "}
                  <a className="text-link" href="https://apps.microsoft.com/detail/9PD6BP3NGVST" target="_blank" rel="noopener noreferrer">
                    Store listing
                  </a>
                </li>
              </ul>
            </div>
            <div data-reveal style={delay(1)}>
              <h3>Public repositories, with honest status</h3>
              {repos.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="proof-repo">
                  <b>{p.name}</b>
                  <em>{p.statusLabel}</em>
                  <span>{p.oneLiner}</span>
                </Link>
              ))}
            </div>
          </div>
          <p className="proof-note">
            Prototype means the code can be read but is not deployed. Each case study lists what is unfinished or broken,
            because that is part of the evidence.
          </p>
        </div>
      </section>

      {/* 07 ---------------------------------------------------------- */}
      <section id="future" data-chapter className="ch ch-future" aria-labelledby="future-title">
        <div className="ch-inner">
          <Slate index={6} />
          <h2 id="future-title" className="future-quote" data-reveal style={delay(1)}>
            <span>Build systems that don&rsquo;t just execute.</span>
            <span>
              They <em>adapt,</em> <em>predict</em> and help humans <em>decide.</em>
            </span>
          </h2>
          <ul className="principles">
            {principles.map((p, i) => (
              <li key={p.verb} data-reveal style={delay(i)}>
                <span className="verb">{p.verb}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 ---------------------------------------------------------- */}
      <section id="contact" data-chapter className="ch ch-contact" aria-labelledby="contact-title">
        <div className="ch-inner">
          <Slate index={7} />
          <h2 id="contact-title" className="poster" data-reveal style={delay(1)}>
            Bring me the problem <em>nobody has scoped yet.</em>
          </h2>
          <p className="lede" data-reveal style={delay(2)}>
            Forward deployed and applied AI engineering roles, or a scoped build inside your operations. Based in
            Kolkata, open to remote and relocation.
          </p>
          <div className="contact-grid">
            <ul className="contact-links" data-reveal>
              <li>
                <a href={`mailto:${profile.email}`}>
                  <span>Email</span>
                  <b>{profile.email}</b>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                  <b>dhrubojyoti-gangopadhyay</b>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span>
                  <b>ganguydhrubo</b>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <Link href="/resume">
                  <span>Résumé</span>
                  <b>One page, every claim sourced</b>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <a href="https://sahkarmi.site" target="_blank" rel="noopener noreferrer">
                  <span>Product</span>
                  <b>sahkarmi.site</b>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://atittle.com" target="_blank" rel="noopener noreferrer">
                  <span>Product</span>
                  <b>atittle.com</b>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            </ul>
            <div className="contact-form" data-reveal style={delay(1)}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
