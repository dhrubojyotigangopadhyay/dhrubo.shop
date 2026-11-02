/**
 * Engagement types for the three business-side audiences. No pricing is
 * published; no client names are claimed. Each item describes what is
 * actually delivered, grounded in work that is publicly visible.
 */
export interface Service {
  id: string;
  audience: string;
  title: string;
  summary: string;
  deliverables: string[];
  proof: { label: string; href: string }[];
}

export const services: Service[] = [
  {
    id: "fde-role",
    audience: "Employers and AI product companies",
    title: "Forward deployed / applied AI engineer",
    summary:
      "Full-time or contract. I sit with the department that has the problem, scope a workflow a model can improve, build and deploy it into existing tools, and own the metric. Best fit for deployment-strategist, applied AI architect, agent deployment and solution engineering roles.",
    deliverables: [
      "Discovery and a one-page scope with inputs, outputs, approvers, failure handling and the metric",
      "Working integration into the customer's systems of record, with evaluation set and guardrails",
      "Role-specific training material and change-management support",
    ],
    proof: [
      { label: "Current role at 1XL Universe", href: "/about" },
      { label: "One-page résumé", href: "/resume" },
    ],
  },
  {
    id: "agent-automation",
    audience: "Operations-heavy businesses",
    title: "Approval-gated agent workflows",
    summary:
      "Agents that draft, file, reconcile and report, and that stop before anything consequential. Built on the same permission model as Sahkarmi: the model proposes, a named person approves, the decision is recorded.",
    deliverables: [
      "Workflow design with explicit approval categories and delegation rules",
      "Implementation on Claude Agent SDK or LangGraph with MCP tools, or on Sahkarmi coworker templates",
      "Structured execution records, not chat transcripts, for audit",
    ],
    proof: [
      { label: "Sahkarmi permission architecture", href: "/projects/sahkarmi" },
      { label: "Approval gates article", href: "/writing/approval-gates-for-ai-agents" },
    ],
  },
  {
    id: "integration",
    audience: "Founders and small teams",
    title: "Messaging, data and AI integration builds",
    summary:
      "WhatsApp (Cloud API and Evolution), Instagram, Gmail, payment providers, Supabase with row-level security, Cloudflare Workers. Shipped in three live products; scoped as fixed deliverables.",
    deliverables: [
      "Integration layer with webhooks, idempotency, retries and logging",
      "Multi-tenant data model with tenancy enforced in the database",
      "Tests and a deployment you can operate without me",
    ],
    proof: [
      { label: "AuraLeads", href: "/projects/auraleads" },
      { label: "Zappy", href: "/projects/zappy" },
      { label: "ATITTLE", href: "/projects/atittle" },
    ],
  },
  {
    id: "retrieval",
    audience: "Teams with documents and questions",
    title: "Retrieval systems with evaluation",
    summary:
      "Hybrid BM25 and vector retrieval with rank fusion and re-ranking, a fixed evaluation set and a judge, so the answer quality is a number you can watch rather than a feeling.",
    deliverables: [
      "Corpus analysis, chunking strategy and retriever choice",
      "Evaluation harness with recall and faithfulness metrics",
      "Tracing of retrieved sources per query for replay",
    ],
    proof: [
      { label: "B2B Sales Intelligence RAG", href: "/projects/b2b-sales-intelligence-rag" },
      { label: "Hybrid retrieval article", href: "/writing/hybrid-retrieval-reciprocal-rank-fusion" },
    ],
  },
];
