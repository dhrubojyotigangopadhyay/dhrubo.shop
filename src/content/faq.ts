/**
 * Answers to the questions visitors and answer engines actually ask. Shown on
 * the About page as visible content and fed to the assistant's index. No
 * FAQPage markup is emitted: Google retired that rich result in May 2026 and
 * the content stands on its own.
 */
export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: "who",
    question: "Who is Dhrubojyoti Gangopadhyay?",
    answer:
      "Dhrubojyoti Gangopadhyay, known as Dhrubo, is a forward deployed and applied AI engineer based in Kolkata, India. He builds agentic systems that connect language models to the tools, data and approval steps a business already runs on. Before engineering he spent sixteen years (2007 to 2023) in enterprise revenue operations at AGM level in cement and steel distribution. He is the builder of Sahkarmi, an open-source desktop AI-coworker platform, and currently works as a Forward Deployed AI Engineer at 1XL Universe.",
  },
  {
    id: "what-builds",
    question: "What does Dhrubo build?",
    answer:
      "Agentic systems for business operations: desktop AI coworkers with human approval gates (Sahkarmi), multi-tenant SaaS with messaging and payment integrations (AuraLeads, Zappy), an AI website builder with a Cloudflare publishing pipeline (ATITTLE), and a set of public LangGraph and RAG prototypes in Python. Everything is open source and listed with its real status on the projects page.",
  },
  {
    id: "sahkarmi",
    question: "What is Sahkarmi and how is it built?",
    answer:
      "Sahkarmi is a Windows desktop application in which configurable AI coworkers browse, file, draft and report on the user's own machine, with every consequential action stopped for human approval. It is built with Electron, TypeScript and SolidJS on an Apache-2.0 OpenBot base, uses the Claude Agent SDK, the OpenAI Codex app-server and an Agent Client Protocol bridge, exposes tools over the Model Context Protocol, and ships with a 16-category permission policy, Telegram remote approvals, offline voice and 175 coworker templates. It has 50 tagged releases, about 650 unit tests, and is listed on the Microsoft Store and a Scoop bucket.",
  },
  {
    id: "fde",
    question: "What is a forward deployed AI engineer?",
    answer:
      "A forward deployed AI engineer works directly with the people who have a business problem, scopes a workflow a language model can improve, builds and deploys it into the tools those people already use, and stays until the metric moves. The role combines discovery and scoping with hands-on engineering and change management, as opposed to pure research or pure solutions engineering.",
  },
  {
    id: "background",
    question: "How does an enterprise operations background connect to AI engineering?",
    answer:
      "Operations is where automation meets consequences. Sixteen years of dealer networks, rebate systems and reconciliation taught Dhrubo that plausible output from a trusted system is the most dangerous kind of wrong. That instinct shapes how he builds agent systems: structural approval gates, structured execution records instead of chat transcripts, and evaluation sets before deployment.",
  },
  {
    id: "stack",
    question: "Which technologies does Dhrubo work with?",
    answer:
      "TypeScript, Node.js, Electron, SolidJS, React and Next.js; Python and FastAPI; the Claude Agent SDK, Model Context Protocol, LangGraph, hybrid retrieval (BM25 plus vector) with Chroma or pgvector; PostgreSQL and Supabase with row-level security; Redis Streams; Cloudflare Workers and KV; Vercel; Docker; GitHub Actions; Vitest, pytest and Playwright. Model providers used in shipped code include Anthropic, OpenAI-compatible APIs (Groq, OpenRouter, Cerebras), Google Gemini and local models.",
  },
  {
    id: "hire",
    question: "Is Dhrubo available for roles or projects?",
    answer:
      "Yes. He is open to forward deployed, applied AI and deployment-strategist roles in India or remote, and to scoped AI implementation engagements for businesses that want workflow automation with human approval built in. The contact page lists email and WhatsApp; the résumé is a one-page PDF.",
  },
  {
    id: "evidence",
    question: "How can I verify the claims on this site?",
    answer:
      "Every project links to its public repository, releases and live URL. Numbers such as release counts, commit counts and test counts were checked on 2 November 2026 and the date is shown. Prototypes are labelled as prototypes; derivative work names its upstream base. Private repositories are not cited.",
  },
];
