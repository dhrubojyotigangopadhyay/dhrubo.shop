import { ArrowUpRight, Database, Github, Mail, Phone, RadioTower, ShieldCheck, Workflow } from "lucide-react";
import AgentNetwork from "@/components/AgentNetwork";
import AnimatedShell from "@/components/AnimatedShell";
import ChatWidget from "@/components/ChatWidget";
import CustomCursor from "@/components/CustomCursor";
import { heroBadges, moatCards, navItems, openTo, profile, projects, repos, stackGroups, stats, timeline } from "@/data/site";

const icons = [Workflow, ShieldCheck, Database];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

export default function Home() {
  return (
    <AnimatedShell>
      <CustomCursor />
      <header className="nav">
        <a className="brand" href="#top">DHRUBO</a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="nav-cta" href="#contact">Get In Touch</a>
      </header>

      <main id="top">
        <section className="hero">
          <AgentNetwork />
          <div className="hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="status-pill"><span />{profile.status}</div>
              <h1>{profile.name}</h1>
              <p className="hero-role">{profile.role}</p>
              <p className="hero-tagline">{profile.tagline}</p>
              <div className="hero-actions">
                <a className="button primary" href="#contact">Get In Touch <ArrowUpRight size={18} /></a>
                <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={18} /></a>
              </div>
              <div className="badge-row">
                {heroBadges.map((badge) => <Tag key={badge}>{badge}</Tag>)}
              </div>
            </div>
            <div className="hero-signal" data-reveal>
              <div className="signal-top"><RadioTower size={18} /> Agent network live</div>
              <div className="signal-grid">
                {["RAG", "MCP", "Voice", "Ops", "DB", "Audit"].map((label) => <span key={label}>{label}</span>)}
              </div>
            </div>
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
            <h2>Five auditable case studies.</h2>
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
            <h2>24 repos. All live.</h2>
            <p>Every line of code is public. No toy projects. Real architecture decisions on every commit.</p>
          </div>
          <div className="github-stats" data-reveal>
            <span>24 Public Repos</span><span>55+ Contributions (12mo)</span><span>Jan &apos;25 Active Since</span>
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
          <a className="wide-link" href={profile.github} target="_blank" rel="noreferrer">View All 24 Repositories on GitHub <ArrowUpRight size={18} /></a>
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
            <h2>Roles where systems judgment matters.</h2>
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
