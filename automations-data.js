// ============================================================
// DHRUBO'S AUTOMATION VAULT — DATA FILE
// ============================================================
// HOW TO ADD A NEW AUTOMATION DAILY:
//
// 1. Copy one { ... } entry block below
// 2. Paste it at the TOP of the AUTOMATIONS array (newest first)
// 3. Fill in your details and save
// 4. Run: git add automations-data.js && git commit -m "Add: Name" && git push
//
// FIELD GUIDE:
//   id        → unique slug e.g. "my-tool-name"
//   date      → "YYYY-MM-DD"
//   title     → Name of the automation
//   emoji     → One emoji
//   category  → "AI Agent" | "AI SaaS" | "AI Workflow" | "AI Content" | "AI Video" | "AI Image" | "Agentic AI" | "Free Tool"
//   stack     → Array of tools/tech used
//   tagline   → One punchy sentence
//   what      → What it does (2-3 sentences)
//   impact    → Key result / metric
//   status    → "Live" | "Beta" | "Built" | "In Progress" | "Free"
//   dm        → DM keyword to get it (or "")
//   url       → Direct URL if live (or "")
// ============================================================

const AUTOMATIONS = [

  {
    id: "jobpilot-ai",
    date: "2025-05-10",
    title: "JobPilot AI",
    emoji: "🚀",
    category: "AI Agent",
    stack: ["Claude AI", "Python", "Email Verifier", "Job Board APIs"],
    tagline: "Autonomous job application engine — applies while you sleep.",
    what: "Reads your CV with Claude AI, scores every job listing by compatibility %, writes a personalised cover letter per role, verifies recruiter emails before sending, and dispatches applications automatically. Logs everything live — sent, failed, responded.",
    impact: "89 applications sent in 3 days. 4 interview calls by Wednesday from a Sunday night upload.",
    status: "Built",
    dm: "JOBPILOT",
    url: ""
  },

  {
    id: "applyflow-buzz",
    date: "2025-05-08",
    title: "ApplyFlow.buzz",
    emoji: "🎯",
    category: "AI Agent",
    stack: ["n8n", "Groq Llama 3", "Neon Postgres", "Razorpay", "Resend"],
    tagline: "AI job agent with payments — submit CV, pay once, let AI apply everywhere.",
    what: "Submit CV + email via webhook. Groq Llama 3 finds 20+ matched remote jobs, saves them, accepts a one-time Razorpay payment, then writes personalised cover letters for every job and sends emails automatically via Resend. Fully tracked in Neon Postgres.",
    impact: "Production-ready, fully automated, built for scale. Live at ApplyFlow.buzz.",
    status: "Live",
    dm: "APPLYFLOW",
    url: "https://applyflow.buzz"
  },

  {
    id: "reg-oracle",
    date: "2025-05-06",
    title: "REG-ORACLE",
    emoji: "⚖️",
    category: "AI Agent",
    stack: ["LLM Engine", "847K+ Regulatory Cases DB", "Political Sentiment API"],
    tagline: "AI reads 847,000+ regulatory cases and predicts your approval probability instantly.",
    what: "Describe your product and REG-ORACLE returns your approval probability as a live %, which past cases support or hurt your position, what the current political climate means for your filing, and a plain-English action strategy. No law degree needed.",
    impact: "Delivers in seconds what a law firm takes weeks to produce.",
    status: "Built",
    dm: "REGORACLE",
    url: ""
  },

  {
    id: "logiflow",
    date: "2025-05-04",
    title: "LogiFlow",
    emoji: "🚢",
    category: "AI Workflow",
    stack: ["n8n", "AI Scoring Engine", "WhatsApp API", "Freight APIs"],
    tagline: "Free n8n workflow — stops WhatsApp freight chaos, auto-picks the best broker quote.",
    what: "Automatically collects freight broker quotes arriving via WhatsApp, cleans and standardises the data, scores each quote with AI, and picks the best broker. No manual calls, no inconsistent pricing. Clean, fast, intelligent freight procurement.",
    impact: "Eliminates hours of manual comparison. Free workflow — shared publicly.",
    status: "Free",
    dm: "LOGIFLOW",
    url: ""
  },

  {
    id: "n8n-calls-emails-scheduling",
    date: "2025-05-03",
    title: "n8n: Automate Calls, Emails & Scheduling",
    emoji: "📞",
    category: "Free Tool",
    stack: ["n8n", "AI", "Calendar APIs", "Email APIs"],
    tagline: "Free n8n workflow automating calls, emails, and scheduling end-to-end with AI.",
    what: "A complete free n8n workflow shared via AI Jugaad Lab community. Handles automated call routing, email sending, and meeting scheduling using AI. One of many real .json n8n workflows Dhrubo shares — practical systems, not theory.",
    impact: "Distributed free to the AI Jugaad Lab WhatsApp community of 2,000+ builders.",
    status: "Free",
    dm: "N8N WORKFLOW",
    url: ""
  },

  {
    id: "7-layer-ai-agent",
    date: "2025-05-02",
    title: "7-Layer AI Business Agent",
    emoji: "🧠",
    category: "Agentic AI",
    stack: ["OpenAI", "Anthropic", "Gemini", "Groq", "Multi-LLM Orchestration"],
    tagline: "7-layer agentic system combining 4 AI models — thinks, decides, and acts autonomously.",
    what: "A 7-layer agentic AI system combining OpenAI, Anthropic, Gemini, and Groq into one orchestrated agent that runs entire business workflows. Layers handle: perception, reasoning, planning, tool use, execution, evaluation, and learning — operating as a complete autonomous business brain.",
    impact: "Demonstrated autonomous end-to-end business workflow execution with no human input.",
    status: "Built",
    dm: "AI SYSTEM",
    url: ""
  },

  {
    id: "ai-vibe-growth-agents",
    date: "2025-04-30",
    title: "AI Vibe Growth Agents",
    emoji: "⚡",
    category: "Agentic AI",
    stack: ["RAG", "Voice AI", "LLM", "GitHub"],
    tagline: "4 open-source AI agents — fork, deploy, ship in seconds. Zero-code engineering.",
    what: "Public GitHub repo: Contextual AI RAG Agent (turns docs into a living knowledge base), Customer Support Voice Agent (human-like support at scale), Conference RAG Vibe Agent (generates winning keynote proposals), Social Media Vibe Agent (creates content that sounds like you). High-intent prompts only — no complex code.",
    impact: "Idea → Working AI system in minutes. Publicly available, forkable.",
    status: "Free",
    dm: "",
    url: "https://lnkd.in/gWrXHGtG"
  },

  {
    id: "content-repurposing-engine",
    date: "2025-04-28",
    title: "Content Repurposing Engine",
    emoji: "♻️",
    category: "AI Workflow",
    stack: ["Gemini AI", "n8n", "X API", "LinkedIn API", "Reddit API", "Threads API"],
    tagline: "One article → optimised posts for X, LinkedIn, Reddit, and Threads — one click.",
    what: "Add an article link. Gemini reads it, rewrites it, adapts tone for each platform, prepares post variations, waits for your approval, then publishes across all 4 platforms simultaneously. No manual formatting, no repetition, no wasted time.",
    impact: "1 content piece → 4 optimised platform posts. Fully automated distribution system.",
    status: "Built",
    dm: "CONTENT ENGINE",
    url: "https://dhrubo.shop"
  },

  {
    id: "gemini-cold-email-agent",
    date: "2025-04-26",
    title: "Gemini Cold Email Agent",
    emoji: "💌",
    category: "AI Workflow",
    stack: ["Gemini (gem.google.com)", "LinkedIn Data", "Prompt Engineering"],
    tagline: "Reads your prospect's LinkedIn like an insider — writes cold emails that get 'how did you know this?'",
    what: "Paste your prospect's LinkedIn profile + company page into a custom Gemini Gem. The AI reads both, matches patterns, finds the ONE real business bottleneck, then outputs a sharp audit + cold email that doesn't sound cold. Works for consultants, agency owners, B2B founders.",
    impact: "Gets 'how did you know this?' replies. Prompt shared personally via DM.",
    status: "Built",
    dm: "AI",
    url: ""
  },

  {
    id: "vayu-ai",
    date: "2025-04-24",
    title: "Vayu AI",
    emoji: "💨",
    category: "AI Agent",
    stack: ["WhatsApp API", "AI Instance Engine", "Booking System", "Payments"],
    tagline: "WhatsApp AI agent that runs your business on 100% autopilot — bookings, payments, context.",
    what: "Dedicated AI instance takes over your WhatsApp. Handles context-aware conversations, manages bookings, and processes payments autonomously. Scan QR → link WhatsApp → AI handles everything. 60-minute free trial, no credit card required.",
    impact: "Business runs 24/7 without you. Live at vayuai.online.",
    status: "Live",
    dm: "VAYU",
    url: "https://vayuai.online"
  },

  {
    id: "gmail-ai-assistant",
    date: "2025-04-22",
    title: "Gmail AI Assistant",
    emoji: "📧",
    category: "AI Agent",
    stack: ["FastAPI", "PostgreSQL", "Groq AI", "Gmail API", "OAuth2", "Render"],
    tagline: "Production-ready AI Gmail assistant — smart replies and summaries in real time.",
    what: "Full-stack email AI: OAuth2 auth, real-time webhooks, Groq AI processing. Flow: Incoming Email → Gmail API → Backend → AI Engine → Smart Reply via Gmail API. Generates contextual replies and concise summaries, reducing inbox overload. Deployed on Render.",
    impact: "Production-ready, full-stack, deployed. Reduces email workflow time dramatically.",
    status: "Built",
    dm: "GMAIL AI",
    url: ""
  },

  {
    id: "edpms-payment-checker",
    date: "2025-04-20",
    title: "EDPMS Foreign Payment Pre-Checker",
    emoji: "💳",
    category: "AI Workflow",
    stack: ["AI Rules Engine", "EDPMS Logic", "ICICI Compliance Rules"],
    tagline: "AI tells you if your USD payment will get flagged before you submit to ICICI/EDPMS.",
    what: "For Indian freelancers, exporters, and SaaS founders receiving USD payments. AI checks payment details against EDPMS compliance rules, tells you if it will get flagged, exactly why, and what to fix before submission. Prevents compliance rejections and payment holds.",
    impact: "Saves Indian exporters and freelancers from EDPMS/ICICI payment rejection chaos.",
    status: "Beta",
    dm: "PAYMENT CHECK",
    url: ""
  },

  {
    id: "sahayak-ai",
    date: "2025-04-18",
    title: "Sahayak AI",
    emoji: "💰",
    category: "AI Agent",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Twilio WhatsApp", "Grok/OpenAI/Together AI", "Render"],
    tagline: "WhatsApp-native AI financial assistant for India's middle class — no app download.",
    what: "WhatsApp bot for ₹30k–₹80k/month salary earners. Say 'Spent ₹350 on food' → auto-detects amount + category, saves it, gives weekly/monthly insights. Ask 'Earn extra?' → gets realistic smartphone income ideas (₹3k–₹10k/month) with exact steps. Answers GST, legal questions in Hinglish.",
    impact: "Zero app install. 5-10 min/day. Immediate ROI. MVP live. Behavioral integration, not new habits.",
    status: "Beta",
    dm: "SAHAYAK",
    url: ""
  },

  {
    id: "waterfall-tutor",
    date: "2025-04-16",
    title: "Waterfall Tutor",
    emoji: "🌊",
    category: "AI Agent",
    stack: ["FastAPI", "Python", "SQLite", "Groq Llama-3.1", "Three.js", "MathJax", "WebSocket"],
    tagline: "3D AI math tutor for CBSE Class 7 — bilingual, adaptive, 3D classroom experience.",
    what: "Full-stack AI tutor with a 3D classroom via Three.js. AI teacher (Priya/Saumi Didi) teaches CBSE Class 7 maths in English + Hindi. Adaptive difficulty (Easy → Medium → Hard), real-time WebSocket chat, step-by-step LaTeX explanations, 15-minute focused sessions, progress tracking. Works on mobile and desktop.",
    impact: "Makes Indian school math genuinely fun. Remembers progress across days via mobile number.",
    status: "Built",
    dm: "WATERFALL",
    url: ""
  },

  {
    id: "roastchat",
    date: "2025-04-14",
    title: "RoastChat",
    emoji: "🔥",
    category: "Free Tool",
    stack: ["FastAPI", "Groq Llama-3.3-70b", "Dark Frontend"],
    tagline: "Upload your WhatsApp chat — AI roasts it with zero sugarcoating.",
    what: "Upload any WhatsApp .txt export. Get: Risk Score (Healthy → Concerning → RED ALERT), real red flags, message share + effort analysis (who's double-texting?), psychological patterns, unanswered questions, the brutal truth paragraph, and a silver lining. 100% private — file never stored, processed in memory only.",
    impact: "Built in a weekend. Goes viral every time someone shares results. Warning: not for the weak-hearted.",
    status: "Built",
    dm: "ROASTCHAT",
    url: ""
  },

  {
    id: "staypilot-ai",
    date: "2025-04-12",
    title: "StayPilot AI",
    emoji: "🏨",
    category: "AI SaaS",
    stack: ["Next.js", "Supabase", "Groq AI", "WhatsApp API", "Airbnb API", "OTA APIs"],
    tagline: "Full-stack AI OS for hotels, villas, homestays, and Airbnb operators.",
    what: "Unified booking management, multi-platform OTA integrations, AI guest concierge, inquiry automation, AI reply generation for WhatsApp + Instagram + Airbnb, revenue analytics, upsell tracking, and smart booking workflows. Premium dark-mode SaaS UI. Full-stack, not a PMS clone.",
    impact: "Eliminates spreadsheet + WhatsApp ops chaos. AI slashes front-desk workload.",
    status: "Built",
    dm: "STAYPILOT",
    url: ""
  },

  {
    id: "dentai-pro",
    date: "2025-04-10",
    title: "DentAI Pro",
    emoji: "🦷",
    category: "AI SaaS",
    stack: ["Next.js", "Supabase", "Groq AI"],
    tagline: "AI dental clinic OS — scheduling, records, billing, AI assistant, all in one.",
    what: "Smart appointment scheduling, multi-clinic management, patient records, billing + invoices, revenue analytics, staff management, real-time notifications, Groq AI workflows, premium dark-mode UI. Not another appointment app — full-stack clinic infrastructure.",
    impact: "Stops missed appointments that destroy monthly revenue. Reduces admin workload massively.",
    status: "Built",
    dm: "DENTAI",
    url: ""
  },

  {
    id: "medlogix",
    date: "2025-04-08",
    title: "MedLogix",
    emoji: "🏥",
    category: "AI SaaS",
    stack: ["Groq AI", "Prediction Engine", "Supply Chain APIs", "Alert System"],
    tagline: "AI stockout prediction for hospitals — prevents supply failures days before they happen.",
    what: "AI-powered hospital supply chain and stockout prediction platform. Predicts stockouts days before they happen with Critical/High/Medium/Low risk alerts, automates purchase orders, and provides procurement analytics. For India's 10,000+ hospitals still on spreadsheets.",
    impact: "Prevents patient deaths from 100% preventable stockouts. ₹5–15 lakh/year recurring per hospital.",
    status: "Built",
    dm: "MEDLOGIX",
    url: ""
  },

  {
    id: "griefos",
    date: "2025-04-06",
    title: "GriefOS",
    emoji: "🕊️",
    category: "AI SaaS",
    stack: ["AI Companion LLM", "Estate Workflow Engine", "Crisis Detection", "Memory System"],
    tagline: "AI grief companion + estate admin for families navigating loss — 24/7, 3AM mode.",
    what: "AI companion with 3AM crisis support mode, estate admin workflows, obituary + thank-you generator, and memory-aware AI conversations. For 67M+ families who lose someone globally each year. Provides emotional + practical support that human networks stop providing after 1 week.",
    impact: "Addresses a 67M person/year market nobody else is serving with AI.",
    status: "Built",
    dm: "GRIEFOS",
    url: ""
  },

  {
    id: "youtube-ai-system",
    date: "2025-04-04",
    title: "YouTube AI Content System",
    emoji: "🎬",
    category: "AI Content",
    stack: ["AI Script Engine", "AI Video Generation", "Auto-Publisher", "Quality Pipeline"],
    tagline: "Fully autonomous YouTube channel — generates, edits, and publishes with zero human input.",
    what: "End-to-end automated YouTube content system. Script, visuals, editing, and publishing all through an AI pipeline. Built for quality output that passes YouTube's strict AI content policies — real content, not AI slideshow garbage. Running live as Dimagse Digital.",
    impact: "100% autonomous publishing. Live channel running. Zero manual effort.",
    status: "Live",
    dm: "YT SYSTEM",
    url: ""
  },

  {
    id: "berhampore-cinematic-reel",
    date: "2025-04-02",
    title: "Berhampore Cinematic AI Reel",
    emoji: "🎥",
    category: "AI Video",
    stack: ["Generative AI Video", "AI Animation", "AI Brand Creative"],
    tagline: "Full cinematic AI brand reel — giant hands, exploding signs, dramatic light rays — zero crew.",
    what: "Cinematic AI reel for Berhampore, Murshidabad. Giant hands dropping buildings, exploding railway signs, dramatic light rays over the palace, iconic Coca-Cola bottle moment — all made in minutes with AI. No camera, no crew, no editing setup. Available as brand content service.",
    impact: "Brand ad creatives at 1/3 the cost and 10x the speed of a physical shoot.",
    status: "Built",
    dm: "AI REEL",
    url: ""
  },

  {
    id: "hollywood-sci-fi-commercial",
    date: "2025-03-30",
    title: "Hollywood Sci-Fi Commercial",
    emoji: "🚀",
    category: "AI Video",
    stack: ["Grok Imagine", "AI Video", "AI Voice-Over"],
    tagline: "1.5-min Hollywood sci-fi commercial — 12 cinematic 8K shots, 100% free with Grok Imagine.",
    what: "Complete Hollywood-quality sci-fi commercial using only Grok Imagine. 12 cinematic 8K shots — epic city, floating product, final logo — with dolly, drone, snap zoom and AI voice-over. Made in a few hours with zero crew, zero budget, zero limits.",
    impact: "Proves AI has permanently changed advertising. Template shared publicly.",
    status: "Built",
    dm: "SCI-FI AD",
    url: ""
  },

  {
    id: "google-maps-cinematic-ai",
    date: "2025-03-28",
    title: "Google Maps → Cinematic World",
    emoji: "🗺️",
    category: "AI Video",
    stack: ["Generative AI", "Physics-Aware Animation", "Structured Prompting"],
    tagline: "Static Google Maps location → full cinematic drone sequence with AI. No VFX pipeline.",
    what: "Experiment: Prof. Shanku Park, Rajarhat, Kolkata → static map → physical pin → miniature 3D world emerging → full-scale aerial drone view. No 3D software, no VFX pipeline — only structured prompting and physics-aware AI. Demonstrates continuity control, physics simulation, camera logic.",
    impact: "Proves we are moving from content generation to experience generation.",
    status: "Built",
    dm: "",
    url: ""
  },

  {
    id: "kolkata-upside-down",
    date: "2025-03-26",
    title: "Kolkata Upside Down",
    emoji: "🌀",
    category: "AI Image",
    stack: ["Generative AI Image"],
    tagline: "Real Kolkata monuments → Stranger Things Upside Down — in 10 seconds.",
    what: "AI image transformation turning real Kolkata landmarks into cinematic Upside Down versions using generative AI. 10 seconds per image. Showcases the raw creative speed of modern AI image generation tools.",
    impact: "Viral LinkedIn post. Pure demonstration of generative AI speed and creative range.",
    status: "Built",
    dm: "",
    url: ""
  },

  {
    id: "dhrubo-shop-marketplace",
    date: "2025-03-24",
    title: "dhrubo.shop AI Automation Marketplace",
    emoji: "🏪",
    category: "AI Workflow",
    stack: ["n8n", "Plug-and-Play Automations", "India-first", "WhatsApp", "GST APIs"],
    tagline: "Marketplace of plug-and-play AI automations for real Indian businesses.",
    what: "Ready-to-deploy automations: AI workflows, sales & lead gen, marketing systems, GST & document ops, customer support, IT operations. From WhatsApp lead bots to GST invoice generators — all built for real Indian business use cases. Buy once. Deploy fast. ROI from day one.",
    impact: "2,000+ businesses automating smarter. Live at dhrubo.shop.",
    status: "Live",
    dm: "AUTOMATE",
    url: "https://dhrubo.shop"
  }

];

// Auto-calculated stats
const STATS = {
  total: AUTOMATIONS.length,
  live: AUTOMATIONS.filter(a => a.status === "Live").length,
  free: AUTOMATIONS.filter(a => a.status === "Free").length,
  categories: [...new Set(AUTOMATIONS.map(a => a.category))],
  latestDate: AUTOMATIONS[0]?.date || ""
};
