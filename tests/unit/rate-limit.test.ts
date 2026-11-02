import { describe, expect, it, vi } from "vitest";
import { MemoryRateLimiter, clientIp, hashKey } from "@/lib/ai/rate-limit";

describe("MemoryRateLimiter", () => {
  it("allows up to the limit in a window and blocks after", async () => {
    const rl = new MemoryRateLimiter(3, 60_000);
    expect((await rl.check("a")).ok).toBe(true);
    expect((await rl.check("a")).ok).toBe(true);
    expect((await rl.check("a")).ok).toBe(true);
    const blocked = await rl.check("a");
    expect(blocked.ok).toBe(false);
    expect(blocked.resetMs).toBeGreaterThan(0);
    expect((await rl.check("b")).ok).toBe(true);
  });
  it("releases after the window passes", async () => {
    vi.useFakeTimers();
    const rl = new MemoryRateLimiter(1, 1000);
    expect((await rl.check("x")).ok).toBe(true);
    expect((await rl.check("x")).ok).toBe(false);
    vi.advanceTimersByTime(1001);
    expect((await rl.check("x")).ok).toBe(true);
    vi.useRealTimers();
  });
});

describe("hashKey / clientIp", () => {
  it("produces a stable, non-reversible 24-hex key", async () => {
    const a = await hashKey("203.0.113.9", "salt");
    const b = await hashKey("203.0.113.9", "salt");
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{24}$/);
    expect(a).not.toContain("203");
  });
  it("prefers x-real-ip, then the first x-forwarded-for entry", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("1.1.1.1");
    expect(clientIp(new Headers({ "x-real-ip": "9.9.9.9", "x-forwarded-for": "1.1.1.1" }))).toBe("9.9.9.9");
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
