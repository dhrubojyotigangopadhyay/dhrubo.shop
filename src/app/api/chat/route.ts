import { NextRequest } from "next/server";
import knowledge from "@/generated/knowledge.json";
import { BM25Index, uniqueSources, type Chunk } from "@/lib/ai/retrieval";
import { ChatRequestSchema, SYSTEM_PROMPT, fence, looksLikeInjection, sanitize } from "@/lib/ai/guard";
import { MemoryRateLimiter, clientIp, hashKey } from "@/lib/ai/rate-limit";
import { profile } from "@/content/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const index = new BM25Index(knowledge.chunks as Chunk[]);
const limiter = new MemoryRateLimiter(Number(process.env.CHAT_RATE_LIMIT ?? 12), 60_000);
const MODEL = process.env.CHAT_MODEL ?? "openai/gpt-oss-20b";
const PROVIDER_URL = process.env.CHAT_PROVIDER_URL ?? "https://api.groq.com/openai/v1/chat/completions";
const MAX_OUTPUT_TOKENS = 450;
const UPSTREAM_TIMEOUT_MS = 20_000;

const fallback = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message, contact: profile.email }), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

/**
 * Streaming, retrieval-grounded chat endpoint.
 * Response format: first line is a JSON header `{"sources":[...]}` followed by
 * "\n\n", then plain text tokens. The client reads the header, renders the
 * source chips, and appends tokens as they arrive.
 */
export async function POST(request: NextRequest) {
  const started = Date.now();
  const ipKey = await hashKey(clientIp(request.headers));
  const rl = await limiter.check(ipKey);
  if (!rl.ok) {
    return new Response(JSON.stringify({ error: "Too many questions in a minute. Please wait a moment." }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": String(Math.ceil(rl.resetMs / 1000)) },
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return fallback(503, "The assistant is not configured on this deployment. Please use the contact page.");

  const raw = await request.json().catch(() => null);
  const parsed = ChatRequestSchema.safeParse(raw);
  if (!parsed.success) return fallback(400, "Invalid request.");

  const messages = parsed.data.messages.map((m) => ({ ...m, content: sanitize(m.content) })).filter((m) => m.content);
  const last = messages.at(-1);
  if (!last || last.role !== "user") return fallback(400, "The last message must be from the visitor.");

  const flagged = looksLikeInjection(last.content);
  const hits = index.search(last.content, 6);
  const sources = uniqueSources(hits);
  const sourceBlock = hits.map((h, i) => `<source id="S${i + 1}" page="${h.url}" title="${h.title}">\n${h.text}\n</source>`).join("\n");

  const upstreamMessages = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\n<sources>\n${sourceBlock || "(no matching sources)"}\n</sources>` },
    ...messages.slice(0, -1).map((m) => ({ role: m.role, content: m.role === "user" ? fence(m.content) : m.content })),
    { role: "user", content: fence(last.content) },
  ];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  let upstream: Response;
  try {
    upstream = await fetch(PROVIDER_URL, {
      method: "POST",
      signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.2,
        max_tokens: MAX_OUTPUT_TOKENS,
        messages: upstreamMessages,
      }),
    });
  } catch {
    clearTimeout(timer);
    return fallback(502, "The assistant is temporarily unavailable.");
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timer);
    log({ ok: false, status: upstream.status, ms: Date.now() - started, flagged, hits: hits.length, ipKey });
    return fallback(502, "The assistant is temporarily unavailable.");
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const sourceHeader = JSON.stringify({ sources: sources.map((s, i) => ({ id: `S${i + 1}`, ...s })), flagged });
  const body = upstream.body;

  const stream = new ReadableStream<Uint8Array>({
    async start(controllerOut) {
      controllerOut.enqueue(encoder.encode(`${sourceHeader}\n\n`));
      const reader = body.getReader();
      let buffer = "";
      let chars = 0;
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const token: unknown = JSON.parse(data).choices?.[0]?.delta?.content;
              if (typeof token === "string" && token) {
                chars += token.length;
                controllerOut.enqueue(encoder.encode(token));
              }
            } catch {
              /* partial frame */
            }
          }
        }
      } finally {
        clearTimeout(timer);
        controllerOut.close();
        log({ ok: true, status: 200, ms: Date.now() - started, flagged, hits: hits.length, chars, ipKey });
      }
    },
    cancel() {
      controller.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Structured, content-free log line: no message text, no raw IP. */
function log(fields: Record<string, unknown>) {
  console.info(JSON.stringify({ at: "api/chat", ...fields }));
}
