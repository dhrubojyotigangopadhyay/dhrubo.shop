import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  Braces,
  BrainCircuit,
  Check,
  CircleDot,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import AnimatedShell from "@/components/AnimatedShell";
import ChatWidget from "@/components/ChatWidget";
import { profile, projects, stackGroups, timeline } from "@/data/site";

const featured = projects.slice(0, 4);
const projectIcons = [ShieldCheck, Workflow, Network, AudioLines];
const projectThemes = ["saffron", "ink", "green", "blue"];

const proof = [
  ["31", "public AI systems", "Open code, inspectable architecture"],
  ["17", "years in enterprise", "Commercial operations at national scale"],
  ["<250ms", "voice pipeline", "Speech to structured CRM output"],
  ["40%", "faster decisions", "Database-led operating intelligence"],
];

const method = [
  ["01", "Understand", "Start with the operating reality: people, incentives, exceptions, and risk."],
  ["02", "Architect", "Choose the right memory, tool, model, schema, and control boundaries."],
  ["03", "Ship", "Build the smallest production system that can survive real usage."],
  ["04", "Observe", "Trace outcomes, catch failure modes, and improve from evidence."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://dhrubo.shop/#profile",
      url: "https://dhrubo.shop/",
      name: "Dhrubojyoti Gangopadhyay — AI Systems Builder",
      dateModified: "2026-08-10",
      mainEntity: { "@id": "https://dhrubo.shop/#person" },
      hasPart: featured.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        codeRepository: project.repo,
        author: { "@id": "https://dhrubo.shop/#person" },
      })),
    },
    {
      "@type": "Person",
      "@id": "https://dhrubo.shop/#person",
      name: "Dhrubojyoti Gangopadhyay",
      alternateName: "Dhrubo",
      url: "https://dhrubo.shop/",
      image: "https://dhrubo.shop/dhrubo-portrait.jpg",
      email: "mailto:dhrubo@dhrubo.shop",
      telephone: "+918240801921",
      jobTitle: "Production AI Systems Builder",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressCountry: "IN",
      },
      sameAs: [profile.github, profile.linkedin, profile.x],
      knowsAbout: [
        "AI agent systems",
        "Retrieval-augmented generation",
        "LangGraph",
        "Model Context Protocol",
        "Voice AI",
        "PostgreSQL",
        "Enterprise operations",
      ],
    },
  ],
};

export default function Home() {
  return (
    <AnimatedShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Dhrubo, home">
          <Image src="/dhrubo-portrait.jpg" alt="" width={48} height={48} priority />
          <span>Dhrubo</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#method">Method</a>
          <a href="#experience">Experience</a>
        </nav>
        <a className="nav-contact" href="#contact">Let&apos;s talk <ArrowUpRight size={16} /></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="availability"><span /> Available for select AI systems work</p>
            <p className="identity">Dhrubojyoti Gangopadhyay · Kolkata, India</p>
            <h1 id="hero-title">Enterprise instincts.<br /><em>AI systems that ship.</em></h1>
            <p className="hero-lede">
              I design production AI agents, retrieval systems, voice workflows, and operational intelligence for complex businesses.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore selected work <ArrowDown size={17} /></a>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={16} /></a>
            </div>
          </div>

          <div className="hero-portrait" data-reveal>
            <div className="portrait-frame">
              <Image
                src="/dhrubo-portrait.jpg"
                alt="Portrait of Dhrubojyoti Gangopadhyay"
                width={800}
                height={800}
                priority
              />
              <div className="portrait-caption">
                <span><MapPin size={15} /> Kolkata / India</span>
                <span>Working worldwide</span>
              </div>
            </div>
            <div className="orbit-note note-one"><BrainCircuit size={17} /> Agent architecture</div>
            <div className="orbit-note note-two"><Database size={17} /> DB-tier logic</div>
          </div>

          <a className="scroll-cue" href="#proof" aria-label="Scroll to proof">
            <span>Scroll to proof</span><ArrowDown size={17} />
          </a>
        </section>

        <section className="proof-band" id="proof" aria-label="Career proof">
          {proof.map(([value, label, detail]) => (
            <article key={label} data-reveal>
              <strong>{value}</strong>
              <div><h2>{label}</h2><p>{detail}</p></div>
            </article>
          ))}
        </section>

        <section className="intro section-shell" data-reveal>
          <p className="section-index">01 / Point of view</p>
          <div>
            <h2>AI is useful only when it understands the business beneath it.</h2>
            <p>I spent 17 years inside pricing, distribution, supply chain, and revenue operations before building AI systems. That field experience changes the architecture: fewer demos, better constraints, clearer ownership, and software designed around measurable outcomes.</p>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-index">02 / Selected work</p>
              <h2>Systems built for the real world.</h2>
            </div>
            <p>Four examples across compliance, orchestration, enterprise tooling, and realtime voice. Each repository opens to the implementation.</p>
          </div>

          <div className="project-reel">
            {featured.map((project, index) => {
              const Icon = projectIcons[index];
              return (
                <article className={`project project-${projectThemes[index]}`} key={project.title} data-reveal>
                  <div className="project-visual" aria-hidden="true">
                    <span className="visual-number">0{index + 1}</span>
                    <div className="visual-core"><Icon size={34} strokeWidth={1.5} /></div>
                    <span className="visual-node node-a"><CircleDot size={13} /> Input</span>
                    <span className="visual-node node-b"><Braces size={13} /> Logic</span>
                    <span className="visual-node node-c"><Check size={13} /> Output</span>
                    <div className="visual-line line-a" />
                    <div className="visual-line line-b" />
                    <div className="visual-line line-c" />
                  </div>
                  <div className="project-copy">
                    <p className="project-kicker">Featured system / 0{index + 1}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <dl>
                      <div><dt>System</dt><dd>{project.details[0].replace("Architecture: ", "")}</dd></div>
                      <div><dt>Signal</dt><dd>{project.details[project.details.length - 1].replace(/^[^:]+:\s*/, "")}</dd></div>
                    </dl>
                    <div className="project-footer">
                      <div>{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository`}>
                        Open repository <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <a className="all-work-link" href={profile.github} target="_blank" rel="noreferrer">
            Browse all 31 public systems <ArrowUpRight size={19} />
          </a>
        </section>

        <section className="method" id="method">
          <div className="method-inner section-shell">
            <div className="method-title" data-reveal>
              <p className="section-index">03 / Operating method</p>
              <h2>From ambiguity<br />to dependable action.</h2>
              <p>The cinematic part is the clarity: watching a messy operating problem become a system people can trust.</p>
            </div>
            <div className="method-steps">
              {method.map(([number, title, body]) => (
                <article key={number} data-reveal>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience section-shell" id="experience">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-index">04 / Experience</p>
              <h2>Operator first.<br />Builder by conviction.</h2>
            </div>
            <p>A career spanning enterprise commercial leadership and hands-on AI engineering, connected by the same obsession: making complex systems work better.</p>
          </div>

          <div className="career-list">
            {timeline.map((item) => (
              <article key={item.date} data-reveal>
                <p>{item.date}</p>
                <div><h3>{item.org}</h3><h4>{item.role}</h4></div>
                <p>{item.bullets[0]}</p>
              </article>
            ))}
          </div>

          <div className="stack-marquee" aria-label="Technical capabilities">
            <div>
              {[...stackGroups, ...stackGroups].map((group, index) => (
                <span key={`${group.title}-${index}`}><Sparkles size={14} /> {group.title}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-inner section-shell" data-reveal>
            <p className="section-index">05 / Contact</p>
            <h2>Have a hard AI problem?</h2>
            <p>Tell me what is slow, manual, unreliable, or impossible today. I&apos;ll tell you where an AI system can create real leverage.</p>
            <div className="contact-actions">
              <a className="button button-light" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
              <a className="contact-phone" href={profile.whatsapp} target="_blank" rel="noreferrer"><Phone size={17} /> {profile.phone}</a>
            </div>
            <div className="social-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
              <a href={profile.x} target="_blank" rel="noreferrer">X / @aibabahq <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="contact-word" aria-hidden="true">DHRUBO</div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <span>© 2026 Dhrubojyoti Gangopadhyay</span>
        <span>Kolkata · India · Worldwide</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      <ChatWidget />
    </AnimatedShell>
  );
}
