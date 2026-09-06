import { NextRequest } from "next/server";
import { dhruboChatContext } from "@/data/chat-context";

export const runtime = "nodejs";

const hits = new Map<string, { count: number; reset: number }>();
const limit = 18;
const windowMs = 60_000;

function rateLimit(ip: string) {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || current.reset < now) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(ip)) {
    return new Response("Too many messages. Please try again in a minute.", { status: 429 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("Dhrubo's assistant is not configured yet. Please email dhrubojyoti.gangopadhyay@gmail.com.", { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages.slice(-8) : [];

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      stream: true,
      temperature: 0.35,
      messages: [
        {
          role: "system",
          content: `You are Dhrubo's portfolio assistant. Answer only from the context below. Be concise, factual, and helpful. If asked about something not in context, say you do not have that detail and offer contact info.\n\n${dhruboChatContext}`,
        },
        ...messages.map((message: { role?: string; content?: string }) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content: String(message.content || "").slice(0, 1200),
        })),
      ],
    }),
  });

  if (!groqResponse.ok || !groqResponse.body) {
    return new Response("The assistant service is temporarily unavailable. Please email dhrubojyoti.gangopadhyay@gmail.com.", { status: 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqResponse.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              continue;
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
