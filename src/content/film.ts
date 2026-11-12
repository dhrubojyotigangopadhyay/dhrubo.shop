/**
 * Copy for the homepage film. Career facts come from the CV (Nov 2026);
 * Sahkarmi numbers come from src/generated/github.json at build time.
 * Nothing here is estimated. The dealer-scheme walk-through is marked as a
 * method illustration because it shows no client data.
 */

export const chapters = [
  { id: "opening", no: "01", name: "The Opening" },
  { id: "journey", no: "02", name: "The Journey" },
  { id: "engineer", no: "03", name: "The Engineer" },
  { id: "builder", no: "04", name: "The Builder" },
  { id: "thinker", no: "05", name: "The Thinker" },
  { id: "proof", no: "06", name: "The Proof" },
  { id: "future", no: "07", name: "The Future" },
  { id: "contact", no: "08", name: "Contact" },
] as const;

export const journey = [
  {
    years: "2007",
    span: "2007 – 2016",
    org: "Lafarge India · ACC Limited · Ramco Cements · Johnson & Johnson",
    role: "Channel and revenue roles",
    line: "Territories, dealers and distributors. Learning how a number moves from a truck to a ledger, and how many hands touch it on the way.",
    sector: "Cement · Consumer healthcare",
  },
  {
    years: "2016",
    span: "Jun 2016 – Jan 2021",
    org: "MP Birla Cement",
    role: "Senior Manager, Market Intelligence & Revenue Systems",
    line: "Built audit-ready dealer rebate and incentive systems, correcting structural calculation errors and recovering leakage across a national network.",
    sector: "Cement",
  },
  {
    years: "2021",
    span: "Feb 2021 – Nov 2022",
    org: "Star Cement",
    role: "AGM, Revenue Operations & Channel Performance",
    line: "Grew market share across a multi-state North East India distributor network through pipeline visibility and execution discipline.",
    sector: "Cement",
  },
  {
    years: "2022",
    span: "Nov 2022 – Dec 2023",
    org: "Shyam Steel / Tech Nirman Ispat",
    role: "AGM, Revenue Operations & Commercial Execution",
    line: "Worked inside dealer and distributor teams to turn fulfilment and collection problems into reporting frameworks that shortened executive decisions.",
    sector: "Steel",
  },
  {
    years: "2024",
    span: "Jan 2024 – present",
    org: "Dhrubo AI Studio",
    role: "Founder & Applied AI Engineer",
    line: "The turn. The same operational problems, now answered with software: Sahkarmi, three live web products and a dozen public LangGraph and RAG prototypes.",
    sector: "Applied AI",
    turn: true,
  },
  {
    years: "2026",
    span: "Jul 2026 – present",
    org: "1XL Universe",
    role: "Forward Deployed AI Engineer",
    line: "Owns AI adoption across HR, sales, marketing, operations, support, finance and technology. One bridge between the business and the code.",
    sector: "Applied AI",
    turn: true,
  },
] as const;

/** Chapter 03. Index 0 is the core; 1 is the approval gate (drawn in red); the rest sit on the ring. */
export const systemNodes = [
  {
    key: "runtime",
    label: "Agent runtime",
    title: "One runtime, many models",
    body: "A multi-provider agent runtime behind a single coworker abstraction: Claude Agent SDK with canUseTool gating, the Codex app server, and an ACP bridge to OpenCode and Gemini.",
    link: "Every other part of the system is called from here.",
    proof: "Sahkarmi",
  },
  {
    key: "approval",
    label: "Human approval",
    title: "The model proposes. A human decides.",
    body: "Sixteen permission categories. Payments, customer messages, publishing and shell access always ask and cannot be switched off. Authority can be delegated for a fixed time. A browser take-over flow keeps passwords and OTPs out of the agent's hands.",
    link: "Every consequential tool call from the runtime passes through this gate.",
    proof: "Sahkarmi",
  },
  {
    key: "mcp",
    label: "MCP tools",
    title: "Model Context Protocol, both sides",
    body: "MCP servers and clients: in-process servers for browser, files and integrations, plus user-configurable servers so a coworker can reach whatever a business already runs.",
    link: "This is how the runtime touches the outside world.",
    proof: "Sahkarmi",
  },
  {
    key: "rag",
    label: "Retrieval (RAG)",
    title: "Answers that cite their source",
    body: "Hybrid dense and BM25 retrieval fused with reciprocal-rank fusion, cross-encoder re-ranking, and a 20-question evaluation set scored by an LLM judge, on Chroma and pgvector.",
    link: "Feeds the runtime grounded context instead of guesses.",
    proof: "B2B Sales RAG prototype",
  },
  {
    key: "graph",
    label: "Multi-agent graphs",
    title: "Work as a state machine",
    body: "LangGraph pipelines with typed state and explicit edges: an 8-node planner, specialist and manager graph in SENTRA-AI, with adapters for Anthropic, OpenAI-compatible, Azure and Gemini models.",
    link: "Coordinates several runtimes on one job, with every hand-off visible.",
    proof: "SENTRA-AI prototype",
  },
  {
    key: "automation",
    label: "Workflow automation",
    title: "Into the tools people already use",
    body: "Scheduled routines and integrations: WhatsApp Cloud and Evolution API, Telegram Bot API, Composio apps, Razorpay, PayPal, Resend, Instagram Graph and X OAuth.",
    link: "Turns one approved decision into finished work across channels.",
    proof: "Sahkarmi · AuraLeads · Zappy",
  },
  {
    key: "production",
    label: "Production engineering",
    title: "Shipped, signed off, repeatable",
    body: "Hardened Electron (context isolation, sandbox, CSP, fuses, 209 sender-validated IPC channels) and a tag-driven release pipeline with SHA-256 checksums, an SPDX SBOM, build-provenance attestation and auto-update.",
    link: "Carries the whole system from a laptop to other people's machines.",
    proof: "Sahkarmi releases",
  },
] as const;

export const methodSteps = ["Business problem", "Research", "System architecture", "AI integration", "Automation", "Human approval", "Production outcome"] as const;

export const methodCases = [
  {
    key: "dealer",
    label: "A dealer incentive scheme",
    domain: "Industrial distribution",
    note: "A method illustration drawn from my rebate and incentive work in cement. No client data is shown.",
    steps: [
      "Dealers dispute their payouts every quarter. Finance cannot reproduce the numbers, and leakage hides inside hand-built spreadsheets.",
      "Sit with dealers, sales and accounts. Collect every scheme circular. Trace a single payout end to end and mark the exact point where the calculation forks.",
      "One scheme definition. One ledger of invoices and credit notes. A deterministic calculation that writes a record per dealer, per slab.",
      "A model reads scheme circulars into structured rules and drafts the explanation for each exception. It never computes the payout itself.",
      "A monthly run reconciles against the ERP and prepares a statement for every dealer.",
      "The commercial head approves exceptions and the release. Every override carries a name and a reason.",
      "Statements a dealer can check line by line. At MP Birla Cement, this kind of system corrected structural calculation errors and recovered leakage across a national network.",
    ],
  },
  {
    key: "coworker",
    label: "An AI coworker sends a quote",
    domain: "Sahkarmi, as shipped",
    note: "This is the architecture running inside Sahkarmi today.",
    steps: [
      "A small business owner wants follow-ups handled. One wrong message to a customer costs more trust than the automation saves.",
      "Sort actions by whether they can be undone. Reading a price list can. Sending, paying, publishing and deleting cannot.",
      "An agent runtime behind one coworker abstraction. Every tool call passes a permission policy with sixteen categories.",
      "Claude, Codex or a local model drafts the quote, using a sandboxed browser, local files and MCP tools.",
      "Scheduled routines run the research and the drafting without anyone watching.",
      "Customer messages always ask. Approve in the app or from Telegram. Passwords and OTPs stay with the human through browser take-over.",
      "The quote goes out on a human decision and the action is recorded. Shipped to the Microsoft Store and Scoop.",
    ],
  },
] as const;

export const principles = [
  {
    verb: "Adapt",
    title: "No single model is the system",
    body: "Sahkarmi runs the same coworker on Claude, Codex, Gemini or a local model. When a provider changes, the work continues.",
  },
  {
    verb: "Predict",
    title: "Measure before you trust",
    body: "Evaluation sets come before demos. Retrieval is scored by a judge on fixed questions, so a regression is a number and not a feeling.",
  },
  {
    verb: "Decide",
    title: "Humans keep the consequential",
    body: "Sixteen years of revenue operations taught one rule: whoever is accountable must be the one who approves. The software is built around that person.",
  },
] as const;

export const workMedia: Record<string, { desktop: string; mobile: string; alt: string; captured: string }> = {
  sahkarmi: {
    desktop: "/media/work/sahkarmi-desktop.webp",
    mobile: "/media/work/sahkarmi-mobile.webp",
    alt: "Screenshot of sahkarmi.site: the headline Hire an AI team, Pay ₹0, with Microsoft Store and Windows download buttons and the Sahkarmi app window showing coworkers asking for approval.",
    captured: "12 Nov 2026",
  },
  atittle: {
    desktop: "/media/work/atittle-desktop.webp",
    mobile: "/media/work/atittle-mobile.webp",
    alt: "Screenshot of the atittle.com home page, the web studio site with its AI website builder.",
    captured: "12 Nov 2026",
  },
  auraleads: {
    desktop: "/media/work/auraleads-desktop.webp",
    mobile: "/media/work/auraleads-mobile.webp",
    alt: "Screenshot of the auraleads.online home page, a lead-generation SaaS.",
    captured: "12 Nov 2026",
  },
  zappy: {
    desktop: "/media/work/zappy-desktop.webp",
    mobile: "/media/work/zappy-mobile.webp",
    alt: "Screenshot of the zappy.rest sign-in screen: Zappy, remember every customer moment, with no app install, QR customers and WhatsApp campaigns.",
    captured: "12 Nov 2026",
  },
};
