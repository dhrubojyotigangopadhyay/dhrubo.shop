/**
 * Registry of long-form articles. Each slug maps to src/content/writing/<slug>.mdx.
 * Dates are real publication dates on this site.
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  pillar: "Agentic systems" | "Forward deployed engineering" | "Retrieval" | "Operations";
  keywords: string[];
  relatedProjects: string[];
}

export const articles: Article[] = [
  {
    slug: "approval-gates-for-ai-agents",
    title: "Approval gates for AI agents: how Sahkarmi decides what a coworker may do",
    description:
      "The permission model behind Sahkarmi: sixteen action categories, six that can never be auto-approved, time-boxed delegated authority, and a browser take-over flow that keeps passwords away from the model.",
    published: "2026-11-02",
    readingMinutes: 7,
    pillar: "Agentic systems",
    keywords: ["human-in-the-loop", "AI agent permissions", "approval workflow", "MCP", "Claude Agent SDK"],
    relatedProjects: ["sahkarmi"],
  },
  {
    slug: "what-a-forward-deployed-ai-engineer-does",
    title: "What a forward deployed AI engineer actually does",
    description:
      "Not a solutions engineer, not a researcher. A working definition of the forward deployed AI engineer role, drawn from doing it inside a company and from reading a hundred job descriptions.",
    published: "2026-11-02",
    readingMinutes: 6,
    pillar: "Forward deployed engineering",
    keywords: ["forward deployed engineer", "FDE", "applied AI engineer", "AI adoption"],
    relatedProjects: ["sahkarmi", "atittle"],
  },
  {
    slug: "hybrid-retrieval-reciprocal-rank-fusion",
    title: "Hybrid retrieval with reciprocal rank fusion: notes from a RAG prototype",
    description:
      "Why dense and sparse retrieval disagree, why fusing ranks beats blending scores, and what a 20-question evaluation set revealed about a B2B sales-intelligence prototype.",
    published: "2026-11-02",
    readingMinutes: 8,
    pillar: "Retrieval",
    keywords: ["RAG", "hybrid search", "BM25", "reciprocal rank fusion", "re-ranking", "RAG evaluation"],
    relatedProjects: ["b2b-sales-intelligence-rag"],
  },
  {
    slug: "revenue-operations-taught-me-to-distrust-automation",
    title: "Sixteen years of revenue operations taught me to distrust unaudited automation",
    description:
      "Dealer rebates, reconciliation by hand and approval chains that broke silently: what cement and steel distribution teaches about building AI systems for operations.",
    published: "2026-11-02",
    readingMinutes: 6,
    pillar: "Operations",
    keywords: ["revenue operations", "enterprise AI adoption", "workflow automation", "audit trail"],
    relatedProjects: ["sahkarmi", "revenue-operations-orchestrator"],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
