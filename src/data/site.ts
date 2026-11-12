export const profile = {
  name: "Dhrubojyoti Gangopadhyay",
  handle: "Dhrubo",
  domain: "dhrubo.shop",
  role: "Applied AI Engineer",
  title: "Applied AI Engineer · Forward Deployed Engineer",
  status: "AVAILABLE FOR APPLIED AI ENGINEERING ROLES & CONTRACTS",
  tagline: "16 years enterprise revenue operations · Now building applied AI systems",
  email: "dhrubojyoti.gangopadhyay@gmail.com",
  phone: "+91 98740 76688",
  whatsapp: "https://wa.me/919874076688",
  github: "https://github.com/ganguydhrubo",
  linkedin: "https://www.linkedin.com/in/dhrubojyoti-gangopadhyay/",
  x: "https://x.com/DhruboZ4U",
  youtube: "https://www.youtube.com/@DhruboZ",
  instagram: "https://www.instagram.com/dhruboz4u",
  facebook: "https://www.facebook.com/DhruboZ",
  location: "Kolkata, India",
};

export const timelineNodes = [
  {
    id: "01",
    tag: "TIMELINE: NODE 01 // WHAT I BUILD",
    stageTag: "NODE 01 // WHAT I BUILD",
    prefix: "DHRUBO //",
    headline: "APPLIED AI ENGINEER",
    missionCode: "// MISSION PROFILE: 01",
    missionDescription:
      "Applied AI systems that connect language models to the tools, data and approval steps a business already runs on.",
    extendedDetails:
      "I build the whole path: scoping the problem, writing the code, deploying it, and making it debuggable by the people who have to live with it. Every project below is open source and can be inspected commit by commit.",
    status: "STATUS: ACTIVE // SHIPPING",
    latency: "OPEN SOURCE · INSPECTABLE",
    stack: ["TypeScript", "Python", "Next.js", "FastAPI", "Electron", "Docker"],
  },
  {
    id: "02",
    tag: "TIMELINE: NODE 02 // HOW I BUILD IT",
    stageTag: "NODE 02 // HOW I BUILD IT",
    prefix: "DHRUBO //",
    headline: "AGENTS BUILT FOR OPERATIONS",
    missionCode: "// MISSION PROFILE: 02",
    missionDescription:
      "Agent systems designed for operations rather than demos, with a hard boundary between what a model decides and what it is permitted to do.",
    extendedDetails:
      "Approval gates before externally-consequential actions, structured execution records instead of chat transcripts, and failure handling that degrades safely. The question I design around is not what the agent said, but what it actually did and who authorised it.",
    status: "STATUS: SYNCHRONIZED // HUMAN IN THE LOOP",
    latency: "APPROVAL-GATED EXECUTION",
    stack: ["LangGraph", "Model Context Protocol", "Claude", "Supabase", "PostgreSQL"],
  },
  {
    id: "03",
    tag: "TIMELINE: NODE 03 // WHERE IT COMES FROM",
    stageTag: "NODE 03 // WHERE IT COMES FROM",
    prefix: "DHRUBO //",
    headline: "16 YEARS ENTERPRISE OPERATIONS",
    missionCode: "// MISSION PROFILE: 03",
    missionDescription:
      "Sixteen years of enterprise revenue operations across ACC Ltd., LafargeHolcim, MP Birla Cement, Star Cement and Shyam Steel.",
    extendedDetails:
      "Dealer networks, channel performance, fulfilment and cash collection, at AGM and Senior Manager level. I know how commercial operations actually fail — approval delays, unauditable changes, reconciliation done by hand — which is why I build AI systems that assume they will.",
    status: "STATUS: NOMINAL // DOMAIN DEPTH",
    latency: "16 YEARS ENTERPRISE OPERATIONS",
    stack: ["PostgreSQL", "Revenue Operations", "Channel Distribution", "Process Design"],
  },
];

export const techStackCategories = [
  {
    category: "AI & Agent Orchestration",
    description: "Model integration, agent tooling, and approval-gated execution.",
    items: [
      { name: "Claude", desc: "Tool invocation, structured planning, and agent reasoning" },
      { name: "Model Context Protocol", desc: "Standardised tool and resource interfaces for agent systems" },
      { name: "LangGraph", desc: "Stateful agent graphs and multi-step workflow orchestration" },
      { name: "Google Gemini", desc: "Multimodal input handling and long-context document work" },
      { name: "Browser Automation", desc: "Agent-driven web interaction with snapshot and action primitives" },
    ],
  },
  {
    category: "Platform & Backend",
    description: "Application servers, databases, and workflow automation.",
    items: [
      { name: "Python", desc: "Backend services, automation engines, and data processing" },
      { name: "FastAPI", desc: "Asynchronous REST and WebSocket services" },
      { name: "Node.js", desc: "Application runtime for desktop and server workloads" },
      { name: "PostgreSQL", desc: "Relational data modelling and transactional persistence" },
      { name: "Supabase", desc: "Managed Postgres, row-level security, and auth" },
      { name: "Docker", desc: "Containerised, reproducible deployments" },
      { name: "GitHub Actions", desc: "CI pipelines, automated tests, and release builds" },
      { name: "n8n", desc: "Workflow automation and event routing" },
    ],
  },
  {
    category: "Application & Desktop",
    description: "Typed frontends, desktop packaging, and test coverage.",
    items: [
      { name: "TypeScript", desc: "End-to-end static typing across application and desktop code" },
      { name: "Next.js", desc: "App Router, server components, and edge deployment" },
      { name: "React", desc: "Component architecture and interactive interfaces" },
      { name: "Electron", desc: "Cross-platform desktop applications with native integration" },
      { name: "Vitest", desc: "Unit test suites run on every commit in CI" },
      { name: "Tailwind CSS", desc: "Design tokens and responsive styling" },
    ],
  },
];

export const flagshipProjects = [
  {
    code: "// SYSTEM 01",
    title: "SAHKARMI",
    subtitle: "Local-First Desktop AI Coworker Platform",
    description:
      "A desktop application where AI coworkers do real operational work — browsing, filing, drafting, reporting — on your own machine, with your data staying local. Every externally-consequential action (a payment, a message to a customer, a government or marketplace submission, a deletion) stops and waits for explicit human approval.",
    tags: ["TypeScript", "Electron", "Node.js", "MCP", "Browser Automation", "CI/CD"],
    repo: "https://github.com/ganguydhrubo/sahakarmi",
    liveDemo: "https://sahkarmi.site",
    highlights: [
      "Approval-gated execution: the agent proposes, a human authorises, the decision is recorded",
      "230+ commits, 64 unit test suites, four CI/CD workflows, 15+ tagged releases",
      "Packaged for Windows and submitted to the Microsoft Windows Package Manager",
    ],
  },
  {
    code: "// SYSTEM 02",
    title: "NIRMAAN WEBWORKS",
    subtitle: "Deployed Web Platform",
    description:
      "A deployed web platform built and maintained over sustained development through September and October 2026. Live, publicly accessible, and open to inspection.",
    tags: ["TypeScript", "Next.js", "Vercel"],
    repo: "https://github.com/ganguydhrubo/nirmaan-webworks",
    liveDemo: "https://webjobs-site.vercel.app",
    highlights: [
      "100+ commits across sustained development",
      "Live deployment on Vercel",
      "Typed end to end in TypeScript",
    ],
  },
  {
    code: "// SYSTEM 03",
    title: "RETAIL WHATSAPP LOYALTY",
    subtitle: "Customer Loyalty & Messaging Automation for Small Retail",
    description:
      "Points collection and automated customer messaging over WhatsApp via the Evolution API, built for shops that have no IT team. Designed around what a shopkeeper will actually do at the counter, not what a dashboard can display.",
    tags: ["TypeScript", "PostgreSQL", "WhatsApp Evolution API"],
    repo: "https://github.com/ganguydhrubo/retail-whatsapp-loyalty",
    liveDemo: "https://github.com/ganguydhrubo/retail-whatsapp-loyalty",
    highlights: [
      "Loyalty ledger with points accrual and redemption logic",
      "Automated greeting and campaign dispatch over WhatsApp",
      "Built for small retailers without technical staff",
    ],
  },
];

export function getChatContext() {
  return [
    `Name: ${profile.name}, handle: ${profile.handle}, domain: ${profile.domain}.`,
    `Role: ${profile.role}.`,
    `Titles: ${profile.title}.`,
    `Email: ${profile.email}. Phone/WhatsApp: ${profile.phone}.`,
    `GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}. Location: ${profile.location}.`,
    `Background: Applied AI Engineer with 16 years of prior enterprise revenue operations leadership across ACC Ltd., LafargeHolcim, MP Birla Cement, Star Cement and Shyam Steel, at AGM and Senior Manager level. Software engineering experience is recent and deliberate; all code, tests, commit history and releases are public on GitHub.`,
    `Primary project: Sahkarmi, a local-first desktop AI coworker platform with 230+ commits, 64 unit test suites, four CI/CD workflows and tagged releases, live at sahkarmi.site.`,
    `Flagship Systems: ${flagshipProjects.map((p) => `${p.title} (${p.tags.join(", ")}) - ${p.description}`).join("; ")}.`,
    `Status: ${profile.status}. Open to Applied AI Engineer, Forward Deployed Engineer and AI Solutions roles, in India or remote.`,
  ].join("\n");
}
