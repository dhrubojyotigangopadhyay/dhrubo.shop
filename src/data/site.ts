export const profile = {
  name: "Dhrubojyoti Gangopadhyay",
  handle: "Dhrubo",
  domain: "dhrubo.shop",
  role: "AI Engineer — Advanced RAG & Multi-Agent Systems.",
  status: "Available · Remote / Async · IST · Immediate",
  tagline: "17 years enterprise B2B ops · Production-first",
  email: "gangulydhrubo@gmail.com",
  phone: "+91 98740 76688",
  whatsapp: "https://wa.me/919874076688",
  github: "https://github.com/dhruboshop",
  linkedin: "https://www.linkedin.com/in/dhrubojyoti-gangopadhyay/",
  x: "https://x.com/aibabahq",
  location: "Kolkata, India",
};

export const navItems = [
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Experience", href: "#experience" },
  { label: "Hire Me", href: "#contact" },
];

export const heroBadges = [
  "LangGraph",
  "MCP",
  "Vapi Voice AI",
  "Playwright Stealth",
  "FastAPI",
  "PostgreSQL",
  "n8n",
  "Next.js 15",
];

export const stats = [
  {
    value: "19+",
    label: "Production Repositories",
    detail: "All public, all auditable, no toy projects",
  },
  {
    value: "17yr",
    label: "Enterprise Experience",
    detail: "ACC Ltd · Lafarge · MP Birla Group — AGM level",
  },
  {
    value: "<250ms",
    label: "Voice Pipeline Latency",
    detail: "Speech → structured CRM schema, Zoya Agent",
  },
  {
    value: "40%",
    label: "Decision Latency Reduced",
    detail: "Distribution DB architecture, enterprise scale",
  },
];

export const moatCards = [
  {
    title: "Supply chain + pricing → AI architecture",
    body: "17 years managing supply chains, pricing frameworks, dealer rebate architecture, RevOps leakage at national scale across India's largest industrial conglomerates, baked into every retrieval architecture and agent guardrail.",
    tags: ["ACC Ltd.", "Lafarge", "MP Birla Group", "AGM/Senior Manager"],
  },
  {
    title: "Production systems, not prototypes",
    body: "19+ public repos: stateful agentic graphs, custom MCP integrations, stealth automation, voice pipelines, optimized for resource-constrained 8GB hosts, scaled to production workloads. All publicly auditable at dhrubo.shop.",
    tags: ["LangGraph", "MCP stdio/SSE", "Vapi", "Playwright Stealth"],
  },
  {
    title: "Database-tier thinking",
    body: "Real-time rebate evaluation logic at the database level, not application layer. Translating multi-state commercial ops into database schemas — a rarely found skillset in AI engineers.",
    tags: ["PL/pgSQL", "PostgreSQL", "Supabase", "ERP Schema Design"],
  },
];

export const stackGroups = [
  {
    title: "Agentic & Graph",
    items: ["LangGraph (Supervisor Routing)", "Parent-Doc Memory Checkpointing", "LCEL/Dynamic Fallback Loops", "Self-Correcting Agents", "Multi-Agent Orchestration"],
  },
  {
    title: "RAG & Protocols",
    items: ["MCP (stdio/SSE JSON-RPC)", "Hybrid BM25 + Vector Search", "Reciprocal Rank Fusion (RRF)", "Parent-Child Chunking", "ChromaDB/Context Compression"],
  },
  {
    title: "Voice & Realtime",
    items: ["Vapi (Conversational Voice AI)", "WebSockets (FastAPI & Node.js)", "Claude 3.5 Realtime API", "Async Voice-to-JSON Orchestration", "Structured Telemetry Parsing"],
  },
  {
    title: "Web Automation",
    items: ["Playwright Stealth", "Fingerprint Evasion (fake-useragent)", "Anti-Bot Bypass (Cloudflare/Imperva)", "HTML→JSON Schema Extraction", "SQLite State Persistence"],
  },
  {
    title: "Databases & Backend",
    items: ["PostgreSQL (PL/pgSQL Stored Procs)", "Supabase/SQLite WAL", "FastAPI/Docker/GCP/Render", "n8n Workflow Automation", "Redis/Google Sheets API"],
  },
  {
    title: "Frontend & LLMs",
    items: ["Next.js 15/TypeScript/React", "Tailwind CSS", "OpenAI GPT-4o/Gemini Embeddings", "Anthropic Claude 3.5", "Groq Llama 3"],
  },
];

export const projects = [
  {
    n: "01",
    title: "NEXUS Enterprise AI Operations Platform",
    description: "True MCP abstraction layer — RAG, GitHub, Filesystem, Browser, Voice, Postgres as discoverable, auditable, executable tools via stdio/SSE JSON-RPC.",
    tags: ["Python", "LangGraph", "MCP", "Next.js 15", "Docker", "Gemini Embeddings"],
    repo: "https://github.com/dhruboshop/NEXUS-Enterprise-AI-Platform",
    details: [
      "Architecture: Stateful LangGraph supervisor → MCP tool registry → dynamic routing → parent-doc memory checkpointing → audit logs",
      "Key challenge: Every capability discoverable + auditable, prevent infinite agent cycles, 8GB RAM deployment",
      "Constraint: Gemini embeddings + lazy-loaded Playwright for resource-constrained hosts",
    ],
  },
  {
    n: "02",
    title: "Zoya Voice CRM Integration Agent",
    description: "Orchestrates Vapi to manage WebRTC/SIP telephony, bypassing raw audio socket streams. Parses speech → structured CRM schemas at sub-250ms latency under concurrent high-throughput load.",
    tags: ["Vapi", "WebSockets", "Claude 3.5 Realtime", "FastAPI", "Supabase"],
    repo: "https://github.com/dhruboshop/Zoya-Voice-Agent",
    badge: "⚡ <250ms · Speech → Typed CRM Schema · Production",
    details: [
      "Latency: <250ms speech-to-structured CRM schema, zero UI-blocking",
      "Reliability: Supabase direct write + enterprise webhook triggers with full telemetry logging",
      "Concurrency: handles high-throughput inbound calls without blocking",
    ],
  },
  {
    n: "03",
    title: "Vayu OS — High-Evasion AI Outreach Pipeline",
    description: "High-evasion crawler with browser fingerprint spoofing bypassing Cloudflare/Imperva. Custom SMTP handshake engine validates mailboxes via MX records before transmission.",
    tags: ["Python", "Playwright Stealth", "Groq", "SQLite", "Google Sheets API"],
    repo: "https://github.com/dhruboshop/vayu-os-frontend",
    details: [
      "Anti-bot bypass: Playwright Stealth + fake-useragent fingerprint spoofing",
      "Email validation: direct SMTP MX-record handshake, zero bounce-backs",
      "Crash resilience: SQLite transactional state manager, self-healing restarts",
    ],
  },
  {
    n: "04",
    title: "B2B Sales Intelligence RAG",
    description: "Multi-agent RAG network analyzing competitor price sheets, hybrid vector retrieval, feeding live context into negotiation systems in real time.",
    tags: ["Python", "LangGraph", "Hybrid RAG", "FastAPI", "MIT License"],
    repo: "https://github.com/dhruboshop/b2b-sales-intelligence-rag",
    details: [
      "Domain depth: 17yr enterprise pricing + distribution expertise encoded in retrieval architecture",
      "Search method: Hybrid BM25 + vector search with Reciprocal Rank Fusion",
      "Routing: LangGraph multi-agent routing for real-time negotiation context",
    ],
  },
  {
    n: "05",
    title: "Dealer Rebate Intelligence System",
    description: "Real-time rebate evaluation logic at the database level, not application layer. Eliminated multi-million dollar RevOps audit leakage.",
    tags: ["PL/pgSQL", "PostgreSQL"],
    repo: "https://github.com/dhruboshop/loyalty_intelligence_system",
    details: [
      "Architecture choice: DB-tier logic vs application layer",
      "Business outcome: multi-million dollar RevOps audit leakage eliminated",
      "Domain basis: 10+ years managing national distributor networks",
    ],
  },
];

export const repos = [
  ["EDITH", "Python", "2 days ago", "Latest build, advanced AI operations system"],
  ["NEXUS-Enterprise-AI-Platform", "Python", "last week", "MCP abstraction layer"],
  ["signalstack-ai", "Python", "last week", "AI signal processing and intelligence stack"],
  ["realtime-fraud-detection-agent", "Python", "last week", "Agentic reasoning, stateful graph evaluation"],
  ["Zoya-Voice-Agent", "Python/MIT", "2 weeks ago", "Vapi + Claude 3.5 Realtime"],
  ["Multi-Agent-RevOps-Orchestrator", "Python/MIT", "2 weeks ago", "LangGraph RevOps multi-agent system"],
  ["b2b-sales-intelligence-rag", "Python", "2 weeks ago", "Hybrid RAG, competitor pricing"],
  ["loyalty_intelligence_system", "PL/pgSQL", "2 weeks ago", "DB-tier rebate evaluation"],
  ["vayu-os-frontend", "TypeScript", "3 weeks ago", "AI-native CRM platform, Next.js 15"],
];

export const timeline = [
  {
    date: "Jan 2025 — Present",
    org: "Self-Employed · Remote",
    role: "Independent AI Engineer",
    bullets: [
      "Shipped 19+ public production repos — stateful graphs, advanced RAG networks, custom agent tracing backends, low-latency API wrappers",
      "Built Zoya Voice Intake Agent: Vapi + WebRTC/SIP → structured CRM schema at <250ms under load",
      "Engineered NEXUS — full MCP abstraction layer, discoverable/auditable tool registry via stdio/SSE",
      "Designed B2B RAG networks with LangGraph multi-agent routing for real-time negotiation context",
      "Built high-evasion Playwright crawler bypassing Cloudflare/Imperva with SMTP MX validation",
    ],
    tags: ["LangGraph", "MCP", "Vapi", "FastAPI", "PostgreSQL", "Playwright Stealth", "Supabase"],
  },
  {
    date: "2007 — 2024",
    org: "ACC Ltd · Lafarge · MP Birla Group",
    role: "AGM & Senior Manager — Revenue Operations",
    bullets: [
      "Directed commercial operations, designed distribution databases — reduced decision latency 40%",
      "Architected incentive frameworks and distributor analytics — minimized supply gaps 22%, scaled market share +14% YoY",
      "Translated multi-state commercial operations into database schema rules and ERP specs",
      "Built national dealer rebate systems at DB tier — eliminated multi-million dollar RevOps leakage",
    ],
    tags: ["Supply Chain", "RevOps", "Pricing Frameworks", "Distribution DB", "ERP Specs"],
  },
  {
    date: "2005 — 2007",
    org: "University of Kalyani",
    role: "MBA — First Class",
    bullets: ["Specialization in Operations Management & Marketing Strategy"],
    tags: ["Operations Management", "Marketing Strategy"],
  },
];

export const openTo = [
  ["AI Systems Architect", "Designing production agentic systems. Multi-agent orchestration, MCP integration, stateful graph design, observability-first architecture."],
  ["Applied AI Engineer", "Taking AI from prototype to production. RAG systems, voice pipelines, automation infrastructure. Real deployment, not research."],
  ["AI Platform Engineer", "Building the infrastructure layer for AI products. Tool registries, evaluation pipelines, memory systems, observability backends."],
  ["Founding Engineer", "Early-stage AI-native products where domain depth matters. B2B, enterprise, supply chain, RevOps — 17 years of real-world context."],
];

export function getChatContext() {
  return [
    `Dhrubojyoti Gangopadhyay, goes by Dhrubo. Domain: ${profile.domain}.`,
    "Positioning: AI Engineer specializing in Advanced RAG & Multi-Agent Systems. 17 years enterprise B2B operations experience at ACC Ltd., Lafarge, MP Birla Group at AGM/Senior Manager level. Pivoted into AI engineering Jan 2025-present, self-employed/remote. Production-first: 19+ public, auditable repos, no toy projects. Open to AI Systems Architect, Applied AI Engineer, AI Platform Engineer, and Founding Engineer roles. Available remote/async, IST, immediate.",
    `Stats: ${stats.map((s) => `${s.value} ${s.label}: ${s.detail}`).join("; ")}.`,
    `Core stack: ${stackGroups.map((g) => `${g.title}: ${g.items.join(", ")}`).join(" | ")}.`,
    `Projects: ${projects.map((p) => `${p.title}: ${p.description} ${p.details.join(" ")}`).join(" | ")}.`,
    `GitHub: dhruboshop, 24 public repos, 55+ contributions in 12mo, active since Jan '25. Highlight repos: ${repos.map((r) => `${r[0]} (${r[1]}, ${r[2]}) - ${r[3]}`).join("; ")}.`,
    `Experience: ${timeline.map((t) => `${t.date}, ${t.org}, ${t.role}: ${t.bullets.join(" ")}`).join(" | ")}.`,
    `Open to: ${openTo.map((o) => `${o[0]} - ${o[1]}`).join(" | ")}.`,
    `Contact: email ${profile.email}; phone/WhatsApp ${profile.phone}; LinkedIn ${profile.linkedin}; GitHub ${profile.github}; X @aibabahq; Kolkata, India.`,
  ].join("\n");
}
