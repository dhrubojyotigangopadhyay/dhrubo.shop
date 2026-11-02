/**
 * Project records. Classification and every number were verified against the
 * public repository, releases, CI and live URLs on 2 Nov 2026. "Prototype"
 * means exactly that: code exists and can be read, but it is not deployed.
 */
export type ProjectStatus = "production" | "live" | "functional" | "prototype";

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  status: ProjectStatus;
  statusLabel: string;
  period: string;
  stack: string[];
  repo: string;
  live?: string;
  liveLabel?: string;
  featured?: boolean;
  summary: string;
  problem: string;
  architecture: string[];
  evidence: { label: string; value: string }[];
  decisions: { title: string; body: string }[];
  limitations: string[];
  keywords: string[];
}

export const projects: Project[] = [
  {
    slug: "sahkarmi",
    name: "Sahkarmi",
    oneLiner:
      "Open-source desktop platform where AI coworkers do real operational work on your own machine, with human approval before anything consequential.",
    status: "production",
    statusLabel: "Released · Microsoft Store · Scoop",
    period: "Oct 2026 – present",
    stack: [
      "Electron 43",
      "TypeScript",
      "SolidJS",
      "Claude Agent SDK",
      "Model Context Protocol",
      "Codex app-server",
      "ACP",
      "Vitest",
      "GitHub Actions",
    ],
    repo: "https://github.com/ganguydhrubo/sahakarmi",
    live: "https://sahkarmi.site",
    liveLabel: "sahkarmi.site",
    featured: true,
    summary:
      "Sahkarmi is a Windows desktop application in which configurable AI coworkers browse, file, draft and report inside sandboxed browsers and local tools. It is built on the Apache-2.0 OpenBot v0.1.11 base and extended by more than 110,000 lines: a multi-provider agent runtime, a 16-category permission policy with non-overridable gates, Telegram remote approvals, offline voice, 175 coworker templates and a release pipeline that ships checksums, an SBOM and provenance attestations.",
    problem:
      "Small businesses want agents that act, not chat. The risk is an agent that pays, posts, deletes or submits something nobody authorised. Sahkarmi's design rule is simple: the model proposes, a human approves, and the decision is recorded.",
    architecture: [
      "Agent runtime: Claude Agent SDK with canUseTool gating, OpenAI Codex app-server, and an Agent Client Protocol (ACP) bridge to OpenCode and Gemini runtimes, all behind one coworker abstraction.",
      "Tools: in-process MCP servers for browser, files and integrations; user-configurable MCP servers (stdio or HTTP, up to 30); Composio app connectors.",
      "Approval architecture: 16 permission categories; payments, customer messages, publication, shell access, deletions and official forms always ask; time-boxed delegated authority; a browser take-over flow so agents never handle passwords or OTPs.",
      "Remote control: Telegram bridge for approvals and status with per-chat allow-lists.",
      "Electron hardening: context isolation, sandbox, strict CSP, Electron fuses, 209 sender-validated IPC channels.",
      "Release engineering: CI on every PR, tag-driven release with SHA-256 checksums, SPDX SBOM, GitHub build-provenance attestation and electron-updater.",
    ],
    evidence: [
      { label: "Releases", value: "50 tagged (v0.3.0 to v0.17.1)" },
      { label: "History", value: "277 commits, 72 merged PRs" },
      { label: "Tests", value: "About 650 Vitest cases in 74 files" },
      { label: "Diff over base", value: "+110,740 / -3,142 lines, 438 new files" },
      { label: "Distribution", value: "Microsoft Store (9PD6BP3NGVST), Scoop bucket" },
      { label: "Locales", value: "12" },
    ],
    decisions: [
      {
        title: "Why approval gates are not overridable",
        body: "A policy that an agent can talk its way around is not a policy. The six highest-impact categories are hard-coded to ask; the model cannot auto-approve them, and the UI cannot be configured to skip them.",
      },
      {
        title: "Why build on OpenBot instead of from scratch",
        body: "OpenBot provided a working Electron shell and Codex client under Apache-2.0. Starting there bought weeks; the attribution is kept in NOTICE and the diff is public.",
      },
      {
        title: "Why local-first",
        body: "The target users keep customer data on their own machines and do not have an IT team. Sandboxed per-coworker browsers and local storage keep the blast radius small.",
      },
    ],
    limitations: [
      "Windows only; the installer is not yet code-signed, so SmartScreen warns on first run.",
      "Single maintainer; roughly half of the commits were co-authored with Claude Code and are reviewed, tested and released by one person.",
      "No vector memory or RAG inside the app yet.",
      "Labelled a development preview; adoption numbers are small and are not quoted here.",
    ],
    keywords: ["desktop AI agent", "AI coworker", "human-in-the-loop", "MCP", "Claude Agent SDK", "Electron security"],
  },
  {
    slug: "atittle",
    name: "ATITTLE",
    oneLiner: "Studio website with an AI website builder and one-click publishing to Cloudflare Workers KV.",
    status: "live",
    statusLabel: "Live · atittle.com",
    period: "Sep – Oct 2026",
    stack: ["Astro 7", "Preact", "TypeScript", "Cloudflare Workers KV", "Groq / Gemini / OpenRouter", "Vitest", "Playwright"],
    repo: "https://github.com/ganguydhrubo/nirmaan-webworks",
    live: "https://atittle.com",
    liveLabel: "atittle.com",
    featured: true,
    summary:
      "A commercial web-studio site with fifteen demo sites and a builder that turns a short brief into a server-rendered site. The publish pipeline writes the rendered site into Workers KV through the Cloudflare REST API and serves it from a custom Worker with a strict CSP and custom-domain mapping.",
    problem:
      "Small Indian businesses need a presentable site in minutes and a path to their own domain without a developer on call.",
    architecture: [
      "Multi-provider OpenAI-compatible LLM chain with health tracking and per-IP quotas.",
      "Builder output is server-rendered, zipped and written to Workers KV; a Worker serves it with CSP and maps custom domains.",
      "109 Vitest unit tests and 70 Playwright tests, including axe accessibility checks.",
    ],
    evidence: [
      { label: "History", value: "103 commits over six weeks" },
      { label: "Tests", value: "109 Vitest + 70 Playwright" },
      { label: "Hosting", value: "Vercel (site), Cloudflare Workers (published sites)" },
    ],
    decisions: [
      {
        title: "Why Workers KV instead of a database",
        body: "Published sites are immutable artefacts. KV plus a custom Worker gives global edge delivery at zero cost for this traffic.",
      },
    ],
    limitations: [
      "No CI workflow in the repository yet; tests run locally.",
      "The D1/Turnstile layer described in the README is not the live configuration.",
    ],
    keywords: ["AI website builder", "Cloudflare Workers KV", "Astro"],
  },
  {
    slug: "auraleads",
    name: "AuraLeads",
    oneLiner: "Multi-tenant lead-generation SaaS with Instagram, X, WhatsApp, Gmail and payment integrations.",
    status: "live",
    statusLabel: "Live · auraleads.online",
    period: "Sep 2026",
    stack: ["Next.js 14", "Supabase", "PostgreSQL RLS", "Instagram Graph API", "WhatsApp Cloud API", "Razorpay", "PayPal"],
    repo: "https://github.com/ganguydhrubo/auraleads-ai",
    live: "https://auraleads.online",
    liveLabel: "auraleads.online",
    featured: true,
    summary:
      "A tenant-isolated SaaS: 24 Postgres tables under row-level security, Instagram Graph and X OAuth 2.0 connections, WhatsApp Embedded Signup with webhooks, Gmail IMAP/SMTP, and Razorpay plus PayPal billing.",
    problem:
      "Agencies and small sales teams run outreach across five channels with no shared ledger of who said what to whom.",
    architecture: [
      "Supabase Auth and RLS policies on every table; tenant ID enforced in the database, not the app.",
      "Channel adapters under one interface; a Playwright-based social worker for tasks the APIs do not expose.",
    ],
    evidence: [
      { label: "Schema", value: "24 tables with RLS" },
      { label: "Integrations", value: "Instagram, X, WhatsApp, Gmail, Razorpay, PayPal" },
    ],
    decisions: [
      {
        title: "Why RLS in the database",
        body: "Multi-tenant bugs are catastrophic. Enforcing tenancy in Postgres means an application bug cannot leak another tenant's rows.",
      },
    ],
    limitations: ["No automated tests yet.", "Built in a three-day sprint; the history is short."],
    keywords: ["multi-tenant SaaS", "Supabase RLS", "WhatsApp Cloud API"],
  },
  {
    slug: "zappy",
    name: "Zappy",
    oneLiner: "WhatsApp loyalty and messaging for small retail: Express API, Next.js PWA and a Flutter client.",
    status: "live",
    statusLabel: "Web live · API degraded",
    period: "Jun – Sep 2026",
    stack: ["Express 5", "Next.js 15", "Flutter", "Supabase", "Evolution API (WhatsApp)", "Vitest"],
    repo: "https://github.com/ganguydhrubo/retail-whatsapp-loyalty",
    live: "https://www.zappy.rest",
    liveLabel: "zappy.rest",
    summary:
      "Points accrual and redemption with automated WhatsApp greetings and campaigns through the Evolution API, built around what a shopkeeper will actually do at the counter.",
    problem:
      "Corner shops have loyal customers and no way to reach them except a WhatsApp broadcast that gets them blocked.",
    architecture: [
      "Express 5 API with Supabase Auth and RLS on 12 tables.",
      "Evolution API lifecycle management for WhatsApp sessions.",
      "26 Vitest cases; five GitHub Actions workflows.",
    ],
    evidence: [
      { label: "History", value: "43 commits" },
      { label: "CI", value: "354 workflow runs" },
    ],
    decisions: [
      {
        title: "Why Evolution API",
        body: "The official Cloud API needs business verification most shops cannot complete; Evolution runs on the shop's own number.",
      },
    ],
    limitations: [
      "The API host currently returns 500 and the WhatsApp gateway is down, so the web app is live but the loyalty flow is not operational today.",
    ],
    keywords: ["WhatsApp loyalty", "Evolution API", "retail SaaS"],
  },
  {
    slug: "b2b-sales-intelligence-rag",
    name: "B2B Sales Intelligence RAG",
    oneLiner:
      "Hybrid dense + BM25 retrieval with reciprocal-rank fusion, cross-encoder re-ranking and an LLM-judged evaluation harness.",
    status: "prototype",
    statusLabel: "Prototype · not deployed",
    period: "May 2026",
    stack: ["Python", "LlamaIndex", "ChromaDB", "BM25", "Cross-encoder", "FastAPI", "Alembic"],
    repo: "https://github.com/ganguydhrubo/b2b-sales-intelligence-rag",
    summary:
      "The most complete retrieval code in the portfolio: weighted reciprocal-rank fusion over dense and sparse results, cross-encoder re-ranking, Chroma or Pinecone stores, 50 mocked unit tests and a 20-question evaluation set scored by an LLM judge.",
    problem:
      "Sales teams ask questions that span CRM notes, call transcripts and account plans; neither keyword nor vector search alone answers them well.",
    architecture: [
      "Hybrid retriever (dense + BM25) fused with RRF.",
      "Cross-encoder re-ranker on the fused top-k.",
      "Evaluation harness with a fixed question set and LLM-as-judge scoring.",
    ],
    evidence: [
      { label: "Tests", value: "50 unit tests (mocked)" },
      { label: "Eval set", value: "20 questions" },
    ],
    decisions: [
      {
        title: "Why RRF rather than score blending",
        body: "Dense and sparse scores live on different scales; rank fusion avoids tuning a brittle weight per corpus.",
      },
    ],
    limitations: [
      "Pinned dependencies did not resolve in CI, so the tests have never run in a pipeline.",
      "Not deployed.",
    ],
    keywords: ["hybrid RAG", "reciprocal rank fusion", "RAG evaluation"],
  },
  {
    slug: "sentra-ai",
    name: "SENTRA-AI",
    oneLiner: "SOC-copilot prototype: an 8-node LangGraph with four model-provider adapters behind JWT and role-based access.",
    status: "prototype",
    statusLabel: "Prototype · not deployed",
    period: "Jul 2026",
    stack: ["Python", "FastAPI", "LangGraph", "Next.js 15", "PostgreSQL + pgvector", "Docker Compose"],
    repo: "https://github.com/ganguydhrubo/SENTRA-AI",
    summary:
      "A planner, six specialists and a manager node that triage security alerts, with Anthropic, OpenAI-compatible, Azure and Gemini adapters written against raw HTTP, JWT/RBAC/CSRF middleware and a 27-table schema.",
    problem:
      "Security teams drown in alerts; a copilot that fans out across specialist agents and reports back with a ranked view is a plausible first product.",
    architecture: [
      "LangGraph fan-out/fan-in with a manager node that reconciles specialist output.",
      "Provider adapters behind one interface.",
      "Auth, RBAC and CSRF middleware.",
    ],
    evidence: [{ label: "Schema", value: "27 tables with a pgvector column" }],
    decisions: [
      {
        title: "Why raw httpx adapters",
        body: "Each provider SDK pulls a different dependency tree; four thin adapters keep the image small and failures explicit.",
      },
    ],
    limitations: ["Embeddings are a placeholder hash, not real vectors.", "All data is in-memory demo data; CI is red."],
    keywords: ["LangGraph multi-agent", "SOC copilot"],
  },
  {
    slug: "revenue-operations-orchestrator",
    name: "Revenue Operations Orchestrator",
    oneLiner: "Four-agent LangGraph with a conditional retry edge, Claude natural-language-to-SQL and WhatsApp/SMTP tools.",
    status: "prototype",
    statusLabel: "Prototype · not deployed",
    period: "May 2026",
    stack: ["Python", "LangGraph", "Anthropic SDK", "WhatsApp Cloud API", "SMTP", "Docker"],
    repo: "https://github.com/ganguydhrubo/Multi-Agent-Revenue-Operations-Orchestrator-using-LangGraph",
    summary:
      "A revenue-ops pipeline that reads pipeline data through a Claude-written SQL tool, drafts follow-ups and dispatches them, with a retry edge when a step fails validation.",
    problem:
      "The reporting cadence in a sales organisation is a chain of hand-offs that break silently; a graph with explicit edges makes each break visible.",
    architecture: [
      "Four nodes with a conditional retry edge.",
      "Tools: natural language to SQL, WhatsApp Cloud API, SMTP.",
      "Multi-stage Dockerfile with Playwright.",
    ],
    evidence: [{ label: "Graph", value: "4 nodes, 1 conditional edge" }],
    decisions: [
      {
        title: "Why LangGraph",
        body: "Operations work is a state machine with retries; a graph with typed state is easier to audit than a loop of prompts.",
      },
    ],
    limitations: ["A Redis checkpointer import is unresolved, so the package does not import cleanly; CI is red."],
    keywords: ["LangGraph", "revenue operations automation"],
  },
  {
    slug: "realtime-fraud-detection",
    name: "Realtime Fraud Detection Agent",
    oneLiner: "Redis Streams consumer group feeding a scikit-learn scorer and a FastAPI WebSocket fan-out, with Claude explanations.",
    status: "prototype",
    statusLabel: "Prototype · not deployed",
    period: "May 2026",
    stack: ["Python", "Redis Streams", "scikit-learn", "FastAPI", "WebSocket", "Anthropic SDK"],
    repo: "https://github.com/ganguydhrubo/realtime-fraud-detection-agent",
    summary:
      "Transactions flow through a Redis Streams consumer group into GradientBoosting and IsolationForest scorers; flagged events are pushed to clients over WebSocket with a model-written explanation and a mock fallback.",
    problem: "Fraud scoring needs both a fast numeric score and an explanation a human can act on.",
    architecture: ["Consumer group with acknowledgement.", "Two scikit-learn models behind one scorer.", "WebSocket fan-out."],
    evidence: [{ label: "Tests", value: "6" }],
    decisions: [
      {
        title: "Why a mock fallback for explanations",
        body: "The score must never wait on an LLM; explanations are best-effort and degrade to a template.",
      },
    ],
    limitations: ["CI collected zero tests; the compose file has container defects."],
    keywords: ["Redis Streams", "fraud detection", "streaming ML"],
  },
  {
    slug: "compliancegraph",
    name: "ComplianceGraph",
    oneLiner: "EU AI Act obligation engine with a CLI and PDF reports; the one Python repo with green CI.",
    status: "functional",
    statusLabel: "Functional · green CI",
    period: "Jul 2026",
    stack: ["Python", "FastAPI", "SQLite", "Jinja", "WeasyPrint", "pytest"],
    repo: "https://github.com/ganguydhrubo/ComplianceGraph",
    summary:
      "A deterministic rule engine that maps a system description to EU AI Act obligations and renders a PDF report. No LLM is involved; ten tests including an end-to-end PDF run pass in CI.",
    problem: "Teams need a first-pass obligation map before they pay a lawyer.",
    architecture: [
      "Rule engine over a SQLite catalogue.",
      "CLI and HTTP entry points.",
      "WeasyPrint PDF rendering tested end to end.",
    ],
    evidence: [{ label: "CI", value: "10 tests passing" }],
    decisions: [
      {
        title: "Why no LLM",
        body: "Compliance output must be reproducible. A rule engine is auditable; a model is not.",
      },
    ],
    limitations: ["Small scope; not a legal product."],
    keywords: ["EU AI Act", "compliance engine"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const statusOrder: Record<ProjectStatus, number> = { production: 0, live: 1, functional: 2, prototype: 3 };
