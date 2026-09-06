export const profile = {
  name: "Dhrubojyoti Gangopadhyay",
  handle: "Dhrubo",
  domain: "dhrubo.shop",
  role: "Full-Stack Developer & AI Systems Architect",
  title: "Full-Stack Developer · AI Systems Architect · Enterprise Operations Leader",
  status: "Available · Remote / Async · IST · Worldwide",
  tagline: "17 years enterprise commercial operations · Production AI systems",
  email: "dhrubojyoti.gangopadhyay@gmail.com",
  secondaryEmail: "dhrubo@dhrubo.shop",
  phone: "+91 82408 01921",
  whatsapp: "https://wa.me/918240801921",
  github: "https://github.com/ganguydhrubo",
  linkedin: "https://www.linkedin.com/in/dhrubojyoti-gangopadhyay/",
  x: "https://x.com/aibabahq",
  location: "Kolkata, India",
};

export const navItems = [
  { label: "// 01 TIMELINE", href: "#timeline" },
  { label: "// 02 PROFILE", href: "#profile" },
  { label: "// 03 TECH MATRIX", href: "#stack" },
  { label: "// 04 ENGINEERING", href: "#projects" },
  { label: "// 05 DISPATCH", href: "#contact" },
];

export const heroBadges = [
  "Python",
  "FastAPI",
  "LangGraph",
  "Model Context Protocol",
  "Vapi Voice AI",
  "Supabase",
  "PostgreSQL",
  "Next.js 15",
];

export const stats = [
  {
    value: "31+",
    label: "Public AI Architectures",
    detail: "Stateful agentic graphs, custom MCP, low-latency voice, RAG, compliance",
  },
  {
    value: "17yr",
    label: "Enterprise Commercial Ops",
    detail: "ACC Ltd · Lafarge · MP Birla Group — AGM / Senior Manager level",
  },
  {
    value: "<250ms",
    label: "Voice Pipeline Latency",
    detail: "Speech → structured CRM schema, Zoya Agent via Vapi & Claude Realtime",
  },
  {
    value: "40%",
    label: "Decision Latency Reduced",
    detail: "Distribution DB architecture & PL/pgSQL database-tier rules",
  },
];

export const timelineNodes = [
  {
    id: "01",
    tag: "TIMELINE: NODE 01",
    role: "CREATIVE DEVELOPER",
    headline: "Interactive High-Performance Web Surfaces",
    description:
      "Architecting stateful web applications, reactive user interfaces, and custom visual tooling. Deep mastery of TypeScript, Next.js 15 App Router, Tailwind CSS, Framer Motion, and GSAP scrollytelling dynamics with sub-60fps frame fidelity.",
    status: "UI_STATE: REACTIVE_60FPS",
    latency: "<50ms RTT",
    stack: ["TypeScript", "Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "GSAP"],
    telemetry: {
      type: "FRONTEND_PIPELINE",
      renderEngine: "Next.js App Router (SSR + Hydration)",
      bundleSize: "Optimized / Tree-shaken",
      uiFramework: "Tailwind 4 + Custom Glass Tokens",
    },
  },
  {
    id: "02",
    tag: "TIMELINE: NODE 02",
    role: "AI SYSTEMS ARCHITECT",
    headline: "Multi-Agent Orchestration & Sub-250ms Telephony",
    description:
      "Engineering resilient agentic graphs, Model Context Protocol (MCP stdio/SSE) tool registries, and sub-250ms voice telephony pipelines. Translating unstructured speech into typed, deterministic database schemas under concurrent load.",
    status: "AGENT_GRAPH: SYNCHRONIZED",
    latency: "<250ms Voice-to-JSON",
    stack: ["FastAPI", "LangGraph", "Vapi", "MCP", "WebSockets", "Claude 3.5", "Groq"],
    telemetry: {
      type: "AGENTIC_ENGINE",
      orchestration: "LangGraph Stateful Supervisor Graph",
      protocol: "Model Context Protocol (JSON-RPC)",
      voicePipeline: "Vapi WebRTC/SIP → Claude Realtime → Supabase",
    },
  },
  {
    id: "03",
    tag: "TIMELINE: NODE 03",
    role: "SCALABLE SYSTEMS",
    headline: "17 Years Enterprise Commercial Execution",
    description:
      "17 years directing commercial operations, distributor network analytics, and multi-million dollar rebate logic across national conglomerates (ACC Ltd., Lafarge, MP Birla Group). Encoding operating reality directly into database-tier stored procedures and resilient pipelines.",
    status: "ENTERPRISE_OPS: NOMINAL",
    latency: "40% Decision Latency Drop",
    stack: ["PL/pgSQL", "PostgreSQL", "Supabase", "Neon", "n8n", "Docker", "ERP Rules"],
    telemetry: {
      type: "ENTERPRISE_LOGIC",
      commercialExperience: "17 Years National Conglomerate Ops",
      databaseLayer: "PL/pgSQL DB-tier Evaluation (Zero Leakage)",
      concurrency: "Enterprise Distributed Workloads",
    },
  },
];

export const techMatrix = [
  { name: "Python", category: "Backend & Systems", description: "Core systems language for LangGraph, Playwright, and agent engines.", highlight: true },
  { name: "FastAPI", category: "Backend & Systems", description: "Asynchronous REST & WebSocket server layer with typed Pydantic contracts.", highlight: true },
  { name: "n8n", category: "Automation & Ops", description: "Enterprise orchestration, webhook triggers, and event-driven automation.", highlight: true },
  { name: "Supabase", category: "Data & Storage", description: "Managed PostgreSQL, real-time subscriptions, and row-level security.", highlight: true },
  { name: "Neon", category: "Data & Storage", description: "Serverless PostgreSQL with instant branching and connection pooling.", highlight: true },
  { name: "PostgreSQL", category: "Data & Storage", description: "PL/pgSQL stored procedures, pgvector embeddings, and relational schemas.", highlight: true },
  { name: "WebSockets", category: "Protocols & Streams", description: "Sub-second bidirectional telemetry, agent events, and audio streaming.", highlight: true },
  { name: "Groq", category: "Inference & LLMs", description: "Ultra-low latency LPU inference for fast JSON extraction & routing.", highlight: true },
  { name: "Gemini", category: "Inference & LLMs", description: "Multimodal analysis, text-embedding-004, and long-context processing.", highlight: true },
  { name: "Claude", category: "Inference & LLMs", description: "Claude 3.5 Sonnet & Haiku for complex tool use and agentic reasoning.", highlight: true },
  { name: "OpenAI", category: "Inference & LLMs", description: "GPT-4o, structured outputs, and JSON mode schema enforcement.", highlight: true },
  { name: "Twilio", category: "Voice & Telephony", description: "SIP trunking, carrier telephony fallback, and SMS dispatch.", highlight: true },
  { name: "Vapi", category: "Voice & Telephony", description: "Conversational voice AI orchestration, WebRTC/SIP, sub-250ms latency.", highlight: true },
  { name: "LangGraph", category: "Agentic & Graph", description: "Stateful multi-agent supervisor loops with parent-doc checkpointing.", highlight: true },
  { name: "Model Context Protocol", category: "Agentic & Graph", description: "Stdio/SSE JSON-RPC protocol exposing tools and resources.", highlight: true },
  { name: "Next.js 15", category: "Frontend & UI", description: "React 19 App Router, server components, and streaming hydration.", highlight: true },
  { name: "Playwright Stealth", category: "Automation & Ops", description: "Headless browser automation with fingerprint evasion against bot shields.", highlight: true },
  { name: "Docker", category: "Automation & Ops", description: "Containerized deployments, multi-stage builds, and CI pipelines.", highlight: false },
];

export const projects = [
  {
    n: "01",
    code: "// PROJECT 01",
    title: "VAYU OS — High-Evasion AI Outreach Pipeline",
    description:
      "High-evasion automated crawler featuring browser fingerprint spoofing that bypasses Cloudflare and Imperva anti-bot defenses. Incorporates a custom SMTP handshake engine validating mailboxes via direct MX records prior to transmission, backed by a crash-resilient transactional SQLite state manager.",
    tags: ["Python", "Playwright Stealth", "Groq", "SQLite", "Google Sheets API"],
    repo: "https://github.com/ganguydhrubo/salesman-of-the-year",
    metrics: "100% Bot Bypass · Zero Bounce-Backs · Self-Healing SQLite WAL",
    architecture: [
      "Stealth Layer: Playwright with randomized canvas/webgl fingerprints and dynamic user-agent rotation",
      "Handshake Engine: Direct SMTP MX validation avoiding third-party API rate limits and costs",
      "Persistence: SQLite WAL transactional checkpointing for immediate crash recovery and state resumes",
    ],
  },
  {
    n: "02",
    code: "// PROJECT 02",
    title: "ZOYA Voice Agent — Sub-250ms Telephony CRM Agent",
    description:
      "Voice intake agent orchestrating Vapi to manage WebRTC/SIP telephony sessions without raw socket overhead. Streams conversational speech directly into structured, typed CRM schemas at sub-250ms latency under concurrent high-throughput load.",
    tags: ["Vapi", "WebSockets", "Claude Realtime", "FastAPI", "Supabase"],
    repo: "https://github.com/ganguydhrubo/retail-whatsapp-loyalty",
    metrics: "<250ms Latency · Real-Time Telemetry · Zero UI-Blocking",
    architecture: [
      "Audio Orchestration: Vapi WebRTC/SIP bridge eliminating audio socket decoding latency",
      "Schema Parsing: Parallel streaming JSON parser transforming dialogue into validated CRM records",
      "Data Integrity: Supabase direct write with enterprise webhook triggers and end-to-end telemetry",
    ],
  },
  {
    n: "03",
    code: "// PROJECT 03",
    title: "AI Supply Chain & RevOps Intelligence Platform",
    description:
      "Four-agent LangGraph orchestration pipeline (Signal Scraper, Analyst, Writer, Router) translating distributor sales metrics and competitor pricing signals into structured business intelligence briefings. Directly encodes 17 years of enterprise pricing frameworks and database-level rebate evaluation logic.",
    tags: ["LangGraph", "Python", "FastAPI", "PostgreSQL (PL/pgSQL)", "Docker"],
    repo: "https://github.com/ganguydhrubo/Multi-Agent-Revenue-Operations-Orchestrator-using-LangGraph",
    metrics: "40% Decision Latency Drop · Multi-Million Leakage Eliminated",
    architecture: [
      "Multi-Agent Graph: Stateful LangGraph supervisor routing signals across scraper, analyst, and writer nodes",
      "DB-Tier Execution: Real-time rebate evaluation logic compiled directly into PL/pgSQL stored procedures",
      "Domain Encoding: Commercial rules derived from 17 years managing national distribution networks",
    ],
  },
  {
    n: "04",
    code: "// PROJECT 04",
    title: "SENTRA-AI — Operational Multi-Agent SOC Copilot",
    description:
      "LangGraph-orchestrated security operations agent operating over a pgvector/PostgreSQL RAG knowledge base. Ingests enterprise security alerts from Splunk, Microsoft Sentinel, and CrowdStrike, clarifies incident blast radius in plain language, and drafts automated remediation runbooks.",
    tags: ["Next.js 15", "FastAPI", "LangGraph", "pgvector", "Docker"],
    repo: "https://github.com/ganguydhrubo/SENTRA-AI",
    metrics: "12 Iterative Phases · Hybrid RAG · Zero Hallucinations",
    architecture: [
      "Alert Ingestion: Normalized webhook listener for SIEM alerts with deduplication hashing",
      "Knowledge Retrieval: Hybrid BM25 + pgvector search over security policies and threat databases",
      "Remediation Graph: Dynamic approval checkpoints before dispatching containment commands",
    ],
  },
  {
    n: "05",
    code: "// PROJECT 05",
    title: "ComplianceGraph — EU AI Act Compliance Layer",
    description:
      "Deterministic compliance intelligence system that classifies agentic system risk tiers based on runtime tools, permissions, degree of autonomy, human oversight, and logging posture. Generates audit-style reports with immutable reasoning paths.",
    tags: ["FastAPI", "SQLite", "Knowledge Graph", "WeasyPrint"],
    repo: "https://github.com/ganguydhrubo/ComplianceGraph",
    metrics: "Automated Risk Tiering · Immutable Reasoning Trace · PDF Export",
    architecture: [
      "Risk Matrix: Evaluates agent tool permissions, autonomy levels, and human-in-the-loop controls",
      "Entity Graph: Traces compliance obligations, controls, and runtime evidence nodes",
      "Audit Engine: Generates verifiable PDF audit summaries using WeasyPrint",
    ],
  },
];

export const bentoItems = [
  {
    id: "identity",
    colSpan: "col-span-12 lg:col-span-7",
    tag: "// SYSTEM PROFILE",
    title: "Dhrubojyoti Gangopadhyay (Dhrubo)",
    subtitle: "Full-Stack Developer · AI Systems Architect",
    body: "Operating at the nexus of production agentic AI and mission-critical enterprise systems. I build end-to-end architectures—from reactive 60fps frontend surfaces and sub-250ms voice pipelines to database-tier stored procedures.",
    badge: "OPEN TO OPPORTUNITIES 2026",
    location: "Kolkata, India [IST] · Shipping Worldwide",
    image: "/dhrubo-portrait.jpg",
  },
  {
    id: "enterprise-ops",
    colSpan: "col-span-12 lg:col-span-5",
    tag: "// 17 YEARS ENTERPRISE COMMERCIAL OPS",
    title: "Commercial Operations & Revenue Architecture",
    subtitle: "ACC Ltd · Lafarge · MP Birla Group (AGM / Senior Manager)",
    body: "17 years of enterprise commercial and revenue operations leadership across national industrial conglomerates. I translate multi-state distribution logistics, pricing structures, and dealer rebate frameworks into robust database-tier rules (PL/pgSQL) and deterministic agent guardrails.",
    metric: "40% Faster Decision Latency",
    highlight: "Enterprise scale without fragile prompt prototypes.",
  },
  {
    id: "ai-architecture",
    colSpan: "col-span-12 lg:col-span-6",
    tag: "// AGENTIC GRAPH & PROTOCOLS",
    title: "Production Agent Engineering",
    subtitle: "LangGraph · Model Context Protocol · Vapi · Supabase",
    body: "Engineering stateful supervisor graphs, custom MCP stdio/SSE tool registries, parent-doc memory checkpointing, and sub-250ms voice-to-JSON serialization pipelines. Built for deterministic production reliability.",
    metric: "<250ms Telephony Latency",
    highlight: "31+ auditable production repositories publicly available.",
  },
  {
    id: "open-roles",
    colSpan: "col-span-12 lg:col-span-6",
    tag: "// ENGAGEMENT POSTURE",
    title: "Open to Roles & High-Impact Contracts",
    subtitle: "Immediate Availability · Remote / Async Worldwide",
    body: "Engaging as AI Systems Architect, Applied AI Engineer, AI Platform Engineer, or Founding Engineer for enterprise teams and forward-thinking AI products requiring deep domain instincts and production execution.",
    metric: "Immediate Q1 2026",
    highlight: "Full-Stack · Systems Architect · Enterprise Ops",
  },
];

export function getChatContext() {
  return [
    `Name: ${profile.name}, handle: ${profile.handle}, domain: ${profile.domain}.`,
    `Role: ${profile.role}.`,
    `Title: ${profile.title}.`,
    `Email: ${profile.email}. Phone/WhatsApp: ${profile.phone}.`,
    `GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}. Location: ${profile.location}.`,
    `Background: Full-stack developer, AI systems architect, and enterprise operations leader with 17 years of enterprise commercial operations experience across national industrial conglomerates (ACC Ltd., Lafarge, MP Birla Group at AGM / Senior Manager level). Translates distribution networks, pricing models, and dealer rebate frameworks into database-tier stored procedures and resilient agentic architectures.`,
    `Verified Stats: ${stats.map((s) => `${s.value} ${s.label}: ${s.detail}`).join("; ")}.`,
    `Featured Systems: ${projects.map((p) => `${p.title} (${p.tags.join(", ")}) - ${p.description}`).join("; ")}.`,
    `Tech Stack: ${techMatrix.map((t) => `${t.name} (${t.category})`).join(", ")}.`,
    `Status: ${profile.status}. Available for AI Systems Architect, Applied AI Engineer, AI Platform Engineer, and Founding Engineer roles.`,
  ].join("\\n");
}
