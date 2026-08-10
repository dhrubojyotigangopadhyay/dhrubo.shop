import { ArrowUpRight, BrainCircuit, Database, Github, Mail, MapPin, Phone, RadioTower, ShieldCheck, Sparkles, TerminalSquare, Workflow, Zap } from "lucide-react";
import Image from "next/image";
import AgentNetwork from "@/components/AgentNetwork";
import AnimatedShell from "@/components/AnimatedShell";
import ChatWidget from "@/components/ChatWidget";
import CustomCursor from "@/components/CustomCursor";
import { heroBadges, moatCards, navItems, openTo, profile, projects, repos, stackGroups, stats, timeline } from "@/data/site";

const icons = [Workflow, ShieldCheck, Database];
const proofNodes = ["MCP tool fabric", "LangGraph supervisor", "Hybrid RAG memory", "Voice CRM parser", "Audit-grade traces"];
const indiaSignals = [
  ["Kolkata", "Origin node", "Enterprise ops muscle, India-built judgment, IST execution rhythm"],
  ["Bharat market", "Domain lab", "Supply chain, pricing, dealer networks, multilingual workflows"],
  ["Global teams", "Deployment lane", "Remote-first AI infrastructure for founders and recruiters"],
];
const decisionCards = [
  ["Recruiters", "Senior AI builder who can explain systems, ship code, and translate enterprise chaos into reliable agent architecture."],
  ["Founders", "A production-minded AI partner for MCP tooling, advanced RAG, voice agents, browser automation, and operational AI products."],
  ["Technical leaders", "Someone who thinks in traces, fallback paths, schema contracts, latency budgets, and business outcomes."],
];
const cinematicFrames = [
  "Agentic systems",
  "RAG memory",
  "MCP tools",
  "Voice CRM",
  "Compliance graph",
  "RevOps logic",
];
const faqs = [
  {
    question: "Who is Dhrubo?",
    answer: "Dhrubo is Dhrubojyoti Gangopadhyay, a production AI agent systems builder based in Kolkata, India with 17 years of enterprise B2B operations experience and 31 public AI systems.",
  },
  {
    question: "What does Dhrubo build?",
    answer: "Dhrubo builds production AI agents, advanced RAG systems, LangGraph multi-agent orchestration, MCP tool registries, voice AI pipelines, compliance intelligence, CRM automation, and database-tier business logic.",
  },
  {
    question: "What roles is Dhrubo open to?",
    answer: "Dhrubo is open to AI Systems Architect, Applied AI Engineer, AI Platform Engineer, and Founding Engineer roles, especially remote or async B2B AI work.",
  },
  {
    question: "How can I contact Dhrubo?",
    answer: "Email Dhrubo at dhrubo@dhrubo.shop or WhatsApp/call +91 82408 01921.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dhrubo.shop/#person",
      name: "Dhrubojyoti Gangopadhyay",
      alternateName: "Dhrubo",
      url: "https://dhrubo.shop",
      image: "https://dhrubo.shop/og-image.png",
      email: "mailto:dhrubo@dhrubo.shop",
      telephone: "+918240801921",
      jobTitle: "Production AI Agent Systems Builder",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/dhruboshop",
        "https://www.linkedin.com/in/dhrubojyoti-gangopadhyay/",
        "https://x.com/aibabahq",
      ],
      knowsAbout: [
        "Production AI agents",
        "Advanced RAG",
        "LangGraph",
        "Model Context Protocol",
        "MCP tool registries",
        "Voice AI",
        "Vapi",
        "PostgreSQL",
        "PL/pgSQL",
        "Enterprise revenue operations",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://dhrubo.shop/#service",
      name: "Dhrubo AI Systems",
      url: "https://dhrubo.shop",
      image: "https://dhrubo.shop/og-image.png",
      founder: { "@id": "https://dhrubo.shop/#person" },
      areaServed: "Worldwide",
      serviceType: "Production AI agent systems, advanced RAG, MCP, LangGraph, voice AI, and enterprise automation",
      email: "dhrubo@dhrubo.shop",
      telephone: "+918240801921",
    },
    {
      "@type": "WebSite",
      "@id": "https://dhrubo.shop/#website",
      name: "Dhrubo",
      url: "https://dhrubo.shop",
      publisher: { "@id": "https://dhrubo.shop/#person" },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": "https://dhrubo.shop/#faq",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

export default function Home() {
  return (
    <AnimatedShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CustomCursor />
      <header className="nav">
        <a className="brand" href="#top" aria-label="Dhrubo home">
          <Image src="/dhrubo-logo.gif" alt="Dhrubo portrait logo" width={68} height={68} unoptimized priority />
          <span>DHRUBO</span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="nav-cta" href="#contact">Get In Touch</a>
      </header>

      <main id="top">
        <section className="hero">
          <AgentNetwork />
          <div className="cinema-grain" aria-hidden="true" />
          <div className="hero-flagline" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="status-pill"><span />{profile.status}</div>
              <div className="hero-avatar">
                <Image src="/dhrubo-logo.gif" alt="Dhrubojyoti Gangopadhyay portrait" width={116} height={116} unoptimized priority />
                <span>AI Systems Builder</span>
              </div>
              <p className="hero-kicker">Dhrubojyoti Gangopadhyay · Dhrubo</p>
              <h1>India-built AI agent infrastructure for serious teams.</h1>
              <p className="hero-role">Advanced RAG, MCP tooling, LangGraph orchestration, voice AI, and DB-tier logic engineered like production infrastructure.</p>
              <p className="hero-tagline">17 years enterprise B2B operations fused with 31 public, auditable AI systems. Built from Kolkata for founders, recruiters, and global AI teams that need proof, not pitch.</p>
              <div className="hero-actions">
                <a className="button primary" href="#contact">Hire / Build With Dhrubo <ArrowUpRight size={18} /></a>
                <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={18} /></a>
              </div>
              <div className="badge-row">
                {heroBadges.map((badge) => <Tag key={badge}>{badge}</Tag>)}
              </div>
            </div>
            <div className="hero-cockpit" data-reveal data-cursor="card">
              <div className="portrait-portal">
                <Image src="/dhrubo-logo.gif" alt="Dhrubo portrait in cinematic AI command portal" width={460} height={460} unoptimized priority />
                <div className="portal-ring ring-one" />
                <div className="portal-ring ring-two" />
                <div className="portal-caption"><MapPin size={15} /> Kolkata, India → Global AI systems</div>
              </div>
              <div className="cockpit-top">
                <span><RadioTower size={18} /> Agent orchestration cockpit</span>
                <strong>LIVE</strong>
              </div>
              <div className="orbit-map">
                <div className="orbit-core"><BrainCircuit size={30} /><span>Supervisor</span></div>
                {proofNodes.map((node, index) => <span className={`orbit-node node-${index + 1}`} key={node}>{node}</span>)}
              </div>
              <div className="console-lines">
                <p><TerminalSquare size={15} /> route.intent = enterprise_rag</p>
                <p><Zap size={15} /> voice.schema_latency &lt; 250ms</p>
                <p><ShieldCheck size={15} /> tool.calls = auditable</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cinematic-strip" aria-label="Dhrubo system capabilities">
          <div className="strip-track">
            {[...cinematicFrames, ...cinematicFrames].map((frame, index) => <span key={`${frame}-${index}`}>{frame}</span>)}
          </div>
        </section>

        <section className="stat-band">
          {stats.map((stat) => {
            const match = stat.value.match(/\d+/);
            const prefix = match ? stat.value.slice(0, match.index) : "";
            const suffix = match ? stat.value.slice((match.index || 0) + match[0].length) : "";
            return (
            <div className="stat" key={stat.label} data-reveal>
              <div className="stat-value" data-stat data-count={match?.[0]} data-prefix={prefix} data-suffix={suffix}>{stat.value}</div>
              <h2>{stat.label}</h2>
              <p>{stat.detail}</p>
            </div>
          );})}
        </section>

        <section className="section india-cinematic" data-reveal>
          <div className="india-map-card" data-cursor="card">
            <div className="india-sun" />
            <div className="india-route route-a" />
            <div className="india-route route-b" />
            <div className="india-route route-c" />
            <div className="city-pin kolkata"><span />Kolkata</div>
            <div className="city-pin bengaluru"><span />Bengaluru</div>
            <div className="city-pin mumbai"><span />Mumbai</div>
            <div className="city-pin global"><span />Global</div>
            <div className="india-copy">
              <p className="eyebrow">India-Built · Global-Ready</p>
              <h2>Bharat market instincts. Production AI engineering.</h2>
              <p>Built from real Indian enterprise complexity: distributors, pricing pressure, multilingual operations, regional workflows, audit leakage, and thin-margin execution. That is why the agents are designed for messy production reality.</p>
            </div>
          </div>
          <div className="signal-column">
            {indiaSignals.map(([city, label, body]) => (
              <article className="signal-card" key={city} data-cursor="card">
                <span>{label}</span>
                <h3>{city}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section thesis" data-reveal>
          <div className="thesis-grid">
            <div>
              <p className="eyebrow">Why Dhrubo Is Different</p>
              <h2>He does not just wrap APIs. He designs agent operating systems.</h2>
            </div>
            <div className="thesis-copy">
              <p>Most AI portfolios stop at demos. Dhrubo’s work is built around the hard parts: tool discovery, memory routing, fallback loops, voice latency, DB-tier rules, audit trails, and deployment on constrained infrastructure.</p>
              <div className="signature-strip">
                <span><Sparkles size={16} /> Production-first</span>
                <span><Database size={16} /> Database-tier logic</span>
                <span><Workflow size={16} /> Multi-agent control</span>
              </div>
            </div>
          </div>
        </section>

        <section className="answer-brief section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Answer Engine Brief</p>
            <h2>Clear answers for recruiters, founders, and AI search.</h2>
            <p>For Google, recruiters, founders, and AI answer engines: the direct version of what Dhrubo does and why it matters.</p>
          </div>
          <div className="answer-grid">
            {faqs.map((faq) => (
              <article className="answer-card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section decision-room" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Decision Room</p>
            <h2>The fastest way to understand the signal.</h2>
            <p>No fluff positioning for the three people who matter most: recruiters, founders, and technical leaders.</p>
          </div>
          <div className="decision-grid">
            {decisionCards.map(([title, body], index) => (
              <article className="decision-card" key={title} data-cursor="card">
                <div className="decision-number">0{index + 1}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="agent-lab" data-reveal>
          <div className="lab-sticky">
            <div className="lab-copy">
              <p className="eyebrow">Signature System</p>
              <h2>Agent OS Lab</h2>
              <p>Watch the operating model: retrieve context, route tools, execute safely, and leave an audit trail. This is the difference between a chatbot and an enterprise agent system.</p>
            </div>
            <div className="lab-stage" data-cursor="card">
              <div className="lab-grid-bg" />
              <div className="lab-core">
                <span>AGENT OS</span>
                <strong>DHRUBO</strong>
              </div>
              <div className="lab-beam beam-a" />
              <div className="lab-beam beam-b" />
              <div className="lab-beam beam-c" />
              {[
                ["01", "Sense", "Hybrid RAG + domain memory"],
                ["02", "Route", "LangGraph supervisor + MCP registry"],
                ["03", "Act", "Voice, browser, database, CRM tools"],
                ["04", "Audit", "Telemetry, traces, schema outputs"],
              ].map(([num, title, detail], index) => (
                <article className={`lab-node lab-node-${index + 1}`} key={title}>
                  <span>{num}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
              <div className="lab-terminal">
                <p><span>$</span> supervisor.route(intent)</p>
                <p><span>→</span> mcp.tools.discover()</p>
                <p><span>✓</span> action.output.schema_validated</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section moat" data-reveal>
          <div className="section-head">
            <p className="eyebrow">The Moat</p>
            <h2>Enterprise ops meets production AI.</h2>
            <p>Not a researcher with no deployment depth. Not a developer with no domain context. Both — fused.</p>
          </div>
          <div className="mini-stats">
            <span>17yr Enterprise B2B Operations (AGM level)</span>
            <span>40% decision latency reduction</span>
            <span>22% supply gap reduction</span>
            <span>+14% YoY market share scaled</span>
          </div>
          <div className="card-grid three">
            {moatCards.map((card, index) => {
              const Icon = icons[index];
              return (
                <article className="glass-card" data-cursor="card" key={card.title}>
                  <Icon className="card-icon" size={24} />
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <div className="tag-row">{card.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="stack">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Technical Stack</p>
            <h2>Systems vocabulary, production grammar.</h2>
          </div>
          <div className="card-grid stack-grid">
            {stackGroups.map((group) => (
              <article className="stack-card" key={group.title} data-reveal data-cursor="card">
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Selected Production Projects</p>
            <h2>Seven systems that prove the claim.</h2>
          </div>
          <div className="project-stack">
            {projects.map((project) => (
              <article className="project-card" key={project.n} data-reveal data-cursor="card">
                <div className="project-number">{project.n}</div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  {project.badge && <div className="project-badge">{project.badge}</div>}
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                  <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                </div>
                <a className="repo-link" href={project.repo} target="_blank" rel="noreferrer">View Repository <ArrowUpRight size={16} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section github" id="github">
          <div className="section-head" data-reveal>
            <p className="eyebrow">GitHub · dhruboshop</p>
            <h2>31 repos. Active AI systems, not portfolio filler.</h2>
            <p>Every public build is evidence: agents, RAG, compliance intelligence, CRM, support automation, observability, and DB-tier logic.</p>
          </div>
          <div className="github-stats" data-reveal>
            <span>31 Public Repos</span><span>Latest builds updated this week</span><span>AI systems across Python, TypeScript, PL/pgSQL</span>
          </div>
          <div className="repo-grid">
            {repos.map(([name, language, updated, description]) => (
              <article className="repo-card" key={name} data-reveal data-cursor="card">
                <div><Github size={17} /><span>{language}</span><span>{updated}</span></div>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <a className="wide-link" href={profile.github} target="_blank" rel="noreferrer">View All 31 Repositories on GitHub <ArrowUpRight size={18} /></a>
        </section>

        <section className="section" id="experience">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2>Enterprise field depth, AI shipping velocity.</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.date} data-reveal>
                <div className="timeline-date">{item.date}</div>
                <div>
                  <h3>{item.org}</h3>
                  <h4>{item.role}</h4>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  <div className="tag-row">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section open-to" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Open To</p>
            <h2>Bring him where agents need to become infrastructure.</h2>
          </div>
          <div className="card-grid four">
            {openTo.map(([title, body]) => (
              <article className="glass-card compact" key={title} data-cursor="card">
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <p className="footer-line">Remote / Async / IST (UTC+5:30) · Immediate availability · Open to globally asynchronous B2B collaborations · All repos auditable at dhrubo.shop</p>
        </section>

        <section className="section contact" id="contact">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build something real.</h2>
          </div>
          <div className="contact-grid">
            <article className="contact-card" data-reveal>
              <Mail size={23} />
              <h3>{profile.email}</h3>
              <p>For detailed project discussions, enterprise AI systems, founding engineer roles, and formal business inquiries.</p>
              <a className="button primary" href={`mailto:${profile.email}`}>Send Email <ArrowUpRight size={17} /></a>
            </article>
            <article className="contact-card" data-reveal>
              <Phone size={23} />
              <h3>{profile.phone}</h3>
              <p>Direct line for availability discussions, project scoping, and technical conversations. IST timezone — Kolkata, India.</p>
              <a className="button ghost" href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={17} /></a>
            </article>
          </div>
          <div className="social-row" data-reveal>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
            <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={14} /></a>
            <a href={`https://${profile.domain}`} target="_blank" rel="noreferrer">dhrubo.shop <ArrowUpRight size={14} /></a>
            <a href={profile.x} target="_blank" rel="noreferrer">X (@aibabahq) <ArrowUpRight size={14} /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>DHRUBO · AI Engineer</div>
        <div>{profile.email} · {profile.location}</div>
      </footer>
      <ChatWidget />
    </AnimatedShell>
  );
}
