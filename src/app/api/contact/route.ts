import { NextRequest } from "next/server";
import { profile } from "@/content/profile";
import { MemoryRateLimiter, clientIp, hashKey } from "@/lib/ai/rate-limit";
import { ContactSchema, buildMailto, labelFor } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = new MemoryRateLimiter(5, 10 * 60_000);

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

/**
 * Enquiry endpoint. Delivery goes through Resend when RESEND_API_KEY and
 * CONTACT_FROM are configured; otherwise the endpoint returns 503 with a
 * `mailto` the form falls back to, so no enquiry is silently dropped.
 */
export async function POST(request: NextRequest) {
  const key = await hashKey(clientIp(request.headers));
  const rl = await limiter.check(key);
  if (!rl.ok) return json(429, { error: "Too many submissions. Please try again later." });

  const raw = await request.json().catch(() => null);
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return json(400, { error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors });
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? profile.email;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return json(503, { error: "Email delivery is not configured on this deployment.", mailto: buildMailto(data) });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[dhrubo.shop] ${labelFor(data.intent)} from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nOrganisation: ${data.organisation || "-"}\nIntent: ${labelFor(data.intent)}\n\n${data.message}`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error(JSON.stringify({ at: "api/contact", ok: false, status: res?.status ?? "network" }));
    return json(502, { error: "Delivery failed. Please email directly.", mailto: buildMailto(data) });
  }
  console.info(JSON.stringify({ at: "api/contact", ok: true, intent: data.intent }));
  return json(200, { ok: true });
}
