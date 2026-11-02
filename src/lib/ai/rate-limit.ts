/**
 * Sliding-window rate limiter keyed by a hashed client IP.
 *
 * Limitation, stated plainly: the store is in-memory, so on Vercel it is
 * per-function-instance and resets on cold start. For a personal site with
 * a cost-capped model call this is an acceptable first line; the interface
 * is deliberately async so a shared store (for example Upstash Redis) can be
 * swapped in by implementing `RateLimiter` without touching the route.
 */
export interface RateLimiter {
  check(key: string): Promise<{ ok: boolean; remaining: number; resetMs: number }>;
}

export class MemoryRateLimiter implements RateLimiter {
  private readonly hits = new Map<string, number[]>();
  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  async check(key: string) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const arr = (this.hits.get(key) ?? []).filter((t) => t > windowStart);
    if (arr.length >= this.limit) {
      this.hits.set(key, arr);
      return { ok: false, remaining: 0, resetMs: arr[0] + this.windowMs - now };
    }
    arr.push(now);
    this.hits.set(key, arr);
    if (this.hits.size > 5000) this.evict(windowStart);
    return { ok: true, remaining: this.limit - arr.length, resetMs: this.windowMs };
  }

  private evict(windowStart: number) {
    for (const [k, v] of this.hits) {
      if (!v.some((t) => t > windowStart)) this.hits.delete(k);
    }
  }
}

/** Stable, non-reversible key for an IP so raw addresses are never stored or logged. */
export async function hashKey(input: string, salt = process.env.RATE_LIMIT_SALT ?? "dhrubo.shop"): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${input}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 12))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function clientIp(headers: Headers): string {
  return headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
