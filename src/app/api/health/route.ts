import knowledge from "@/generated/knowledge.json";

export const dynamic = "force-dynamic";

/** Liveness and configuration probe used by the deployment checklist and e2e tests. */
export function GET() {
  return Response.json(
    {
      ok: true,
      time: new Date().toISOString(),
      knowledgeChunks: knowledge.chunks.length,
      knowledgeBuiltAt: knowledge.builtAt,
      assistantConfigured: Boolean(process.env.GROQ_API_KEY),
      contactConfigured: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM),
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
