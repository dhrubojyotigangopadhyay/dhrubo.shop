/**
 * Builds the assistant's knowledge base from the same content modules that
 * render the pages, so answers can never cite something the site does not say.
 * Runs before `next build` and before tests (see package.json "prebuild").
 *
 * Output: src/generated/knowledge.json  -> { builtAt, chunks: Chunk[] }
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { alias: { "@": join(root, "src") } });

const { profile } = await jiti.import(join(root, "src/content/profile.ts"));
const { projects } = await jiti.import(join(root, "src/content/projects.ts"));
const { faqs } = await jiti.import(join(root, "src/content/faq.ts"));
const { services } = await jiti.import(join(root, "src/content/services.ts"));
const { articles } = await jiti.import(join(root, "src/content/writing.ts"));

/** @type {{id:string,title:string,url:string,section:string,text:string}[]} */
const chunks = [];
const push = (id, title, url, section, text) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length > 40) chunks.push({ id, title, url, section, text: clean });
};

// Profile
push("profile:identity", "About Dhrubo", "/about", "Identity",
  `${profile.name} (${profile.shortName}) is a ${profile.headline}. ${profile.tagline} Based in ${profile.location.city}, ${profile.location.country}. ${profile.availability} Languages: ${profile.languages.join(", ")}. Education: ${profile.education.degree}, ${profile.education.school}, ${profile.education.years}. Business name: ${profile.businessName}.`);
push("profile:contact", "Contact", "/contact", "Contact",
  `Email ${profile.email}. WhatsApp and phone ${profile.phoneDisplay}. GitHub ${profile.github}. LinkedIn ${profile.linkedin}. Résumé PDF at ${profile.resumePath}.`);
for (const role of profile.roles) {
  push(`role:${role.org}`, "Experience", "/about", role.title, `${role.title} at ${role.org}, ${role.period}. ${role.summary}`);
}
push("profile:proof", "Verified numbers", "/about", "Proof",
  profile.proof.map((p) => `${p.value} ${p.label} (${p.detail})`).join(". ") + `. Verified on ${profile.verifiedOn}.`);

// Projects
for (const p of projects) {
  const url = `/projects/${p.slug}`;
  push(`project:${p.slug}:summary`, p.name, url, "Summary",
    `${p.name}: ${p.oneLiner} Status: ${p.statusLabel}. Period: ${p.period}. Stack: ${p.stack.join(", ")}. Repository: ${p.repo}.${p.live ? ` Live at ${p.live}.` : ""} ${p.summary}`);
  push(`project:${p.slug}:problem`, p.name, url, "Problem", `${p.name} problem: ${p.problem}`);
  push(`project:${p.slug}:architecture`, p.name, url, "Architecture", `${p.name} architecture: ${p.architecture.join(" ")}`);
  push(`project:${p.slug}:evidence`, p.name, url, "Evidence", `${p.name} evidence: ${p.evidence.map((e) => `${e.label}: ${e.value}`).join("; ")}.`);
  for (const d of p.decisions) push(`project:${p.slug}:decision:${d.title}`, p.name, url, d.title, `${p.name}. ${d.title}. ${d.body}`);
  push(`project:${p.slug}:limitations`, p.name, url, "Limitations", `${p.name} limitations and honest status: ${p.limitations.join(" ")}`);
}

// FAQ
for (const f of faqs) push(`faq:${f.id}`, f.question, `/about#${f.id}`, "Q&A", `${f.question} ${f.answer}`);

// Services
for (const s of services) {
  push(`service:${s.id}`, s.title, `/services#${s.id}`, s.audience, `${s.title} for ${s.audience}: ${s.summary} Deliverables: ${s.deliverables.join("; ")}.`);
}

// Articles: strip MDX to text and split by heading
const writingDir = join(root, "src/content/writing");
for (const a of articles) {
  const file = join(writingDir, `${a.slug}.mdx`);
  let md;
  try { md = readFileSync(file, "utf8"); } catch { continue; }
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[>*_`#]+/g, " ");
  const sections = text.split(/\n(?=[A-Z][^\n]{3,80}\n)/);
  push(`article:${a.slug}:meta`, a.title, `/writing/${a.slug}`, "Article", `${a.title}. ${a.description} Published ${a.published}. Topics: ${a.keywords.join(", ")}.`);
  sections.forEach((s, i) => {
    const paras = s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
    let buf = "";
    let n = 0;
    for (const para of paras) {
      if ((buf + para).length > 900 && buf) {
        push(`article:${a.slug}:${i}:${n++}`, a.title, `/writing/${a.slug}`, "Article", buf);
        buf = "";
      }
      buf += (buf ? " " : "") + para;
    }
    if (buf) push(`article:${a.slug}:${i}:${n}`, a.title, `/writing/${a.slug}`, "Article", buf);
  });
}

const outDir = join(root, "src/generated");
mkdirSync(outDir, { recursive: true });
const out = { builtAt: new Date().toISOString(), chunks };
writeFileSync(join(outDir, "knowledge.json"), JSON.stringify(out, null, 0));
console.log(`knowledge.json: ${chunks.length} chunks from ${readdirSync(writingDir).length} articles, ${projects.length} projects, ${faqs.length} Q&A`);
