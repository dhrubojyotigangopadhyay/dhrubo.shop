import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/", "/about", "/projects", "/projects/sahkarmi", "/writing", "/writing/approval-gates-for-ai-agents", "/services", "/ask", "/contact", "/resume"];

test.describe("routes and metadata", () => {
  for (const path of PAGES) {
    test(`${path} renders with one h1, a canonical and a description`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/www\.dhrubo\.shop/);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc && desc.length > 60).toBe(true);
      await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
    });
  }

  test("unknown route returns 404 with a usable page", async ({ page }) => {
    const res = await page.goto("/this-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("not here");
  });

  test("machine-readable endpoints are served", async ({ request }) => {
    for (const [path, type] of [
      ["/robots.txt", "text/plain"],
      ["/sitemap.xml", "application/xml"],
      ["/llms.txt", "text/plain"],
      ["/feed.xml", "application/rss+xml"],
      ["/manifest.webmanifest", "application/manifest+json"],
      ["/og", "image/png"],
      ["/og/projects/sahkarmi", "image/png"],
    ] as const) {
      const r = await request.get(path);
      expect(r.status(), path).toBe(200);
      expect(r.headers()["content-type"], path).toContain(type);
    }
  });

  test("security headers and a nonce-based CSP are present", async ({ request }) => {
    const r = await request.get("/");
    const h = r.headers();
    expect(h["content-security-policy"]).toMatch(/script-src 'self' 'nonce-[A-Za-z0-9+/=]+' 'strict-dynamic'/);
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-powered-by"]).toBeUndefined();
  });
});

test.describe("navigation and interaction", () => {
  test("primary navigation reaches every section", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Projects", exact: true }).first().click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("shipped");
  });

  test("approval-flow demo responds to a different action", async ({ page }) => {
    await page.goto("/projects/sahkarmi");
    const demo = page.getByRole("button", { name: /Read the supplier price list/ });
    await demo.click();
    await expect(demo).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("policy allows").first()).toBeVisible();
  });

  test("theme toggle switches data-theme and persists", async ({ page }) => {
    await page.goto("/about");
    const before = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
    await page.getByRole("button", { name: /Switch to (dark|light) theme/ }).first().click();
    const after = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
    expect(after).not.toBe(before);
    await page.reload();
    expect(await page.evaluate(() => document.documentElement.getAttribute("data-theme"))).toBe(after);
  });

  test("consent banner appears once and respects decline", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: "Analytics consent" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Decline" }).click();
    await expect(dialog).toBeHidden();
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Analytics consent" })).toHaveCount(0);
  });
});

test.describe("assistant", () => {
  test("streams an answer with sources from a mocked API", async ({ page }) => {
    await page.route("**/api/chat", async (route) => {
      const header = JSON.stringify({ sources: [{ id: "S1", title: "Sahkarmi", url: "/projects/sahkarmi" }], flagged: false });
      await route.fulfill({ status: 200, contentType: "text/plain; charset=utf-8", body: `${header}\n\nSahkarmi has fifty tagged releases [S1].` });
    });
    await page.goto("/ask");
    await page.getByLabel("Your question").fill("How many releases does Sahkarmi have?");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("fifty tagged releases")).toBeVisible();
    await expect(page.getByRole("list", { name: "Sources" }).getByRole("link")).toHaveCount(1);
  });

  test("shows a graceful message when the assistant is not configured", async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "The assistant is not configured on this deployment." }) }));
    await page.goto("/ask");
    await page.getByLabel("Your question").fill("Hello there, what is this?");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText(/not configured/)).toBeVisible();
    await expect(page.getByText(/dhrubojyoti.gangopadhyay@gmail.com/).first()).toBeVisible();
  });

  test("API rejects malformed input", async ({ request }) => {
    const r = await request.post("/api/chat", { data: { messages: [] } });
    expect([400, 503]).toContain(r.status());
  });
});

test.describe("contact", () => {
  test("validates client-side and offers a mailto fallback when delivery is unconfigured", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Please check this field.").first()).toBeVisible();
    await page.locator("#name").fill("Asha Rao");
    await page.locator("#email").fill("asha@example.com");
    await page.locator("#message").fill("We run a dealer network and want approval-gated automation for collections.");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Send" }).click();
    const alert = page.getByRole("alert").filter({ hasText: /email app/ });
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("link", { name: /email app/ })).toHaveAttribute("href", /^mailto:dhrubojyoti\.gangopadhyay@gmail\.com\?subject=/);
  });
});

test.describe("accessibility (axe, WCAG 2.1 AA)", () => {
  for (const path of ["/", "/projects/sahkarmi", "/writing/approval-gates-for-ai-agents", "/ask", "/contact", "/resume"]) {
    test(`${path} has no serious or critical violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, JSON.stringify(serious.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })), null, 1)).toEqual([]);
    });
  }
});

test.describe("visual regressions", () => {
  test("primary buttons never render text in their own background colour", async ({ page }) => {
    await page.goto("/");
    const pairs = await page.locator("a.bg-ink, button.bg-ink").evaluateAll((els) =>
      els.map((e) => {
        const s = getComputedStyle(e);
        return { text: (e.textContent || "").trim().slice(0, 30), color: s.color, bg: s.backgroundColor };
      }),
    );
    expect(pairs.length).toBeGreaterThan(0);
    for (const p of pairs) expect(p.color, p.text).not.toBe(p.bg);
  });
});

test.describe("homepage film", () => {
  test("all eight chapters are server-rendered and the conductor starts", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-chapter]")).toHaveCount(8);
    await expect(page.locator("html")).toHaveClass(/film-on/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Dhrubo");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Forward Deployed AI Engineer");
    for (const id of ["journey", "engineer", "builder", "thinker", "proof", "future", "contact"]) {
      await expect(page.locator(`#${id} h2`)).toHaveCount(1);
    }
  });

  test("intro can be skipped and does not replay in the same session", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    const skip = page.getByRole("button", { name: "Skip intro" });
    // The button only exists for three seconds; on a slow run the intro may already have ended by itself.
    await skip.dispatchEvent("click", {}, { timeout: 5000 }).catch(() => {});
    await expect(page.locator("html")).not.toHaveClass(/film-intro/);
    await expect(page.locator(".hero-name")).toBeVisible();
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/film-intro/);
    await expect(skip).toHaveCount(0);
  });

  test("scrolling through a pinned chapter advances its steps", async ({ page }) => {
    await page.goto("/");
    const pin = page.locator('[data-pin="journey"]');
    await expect(pin.locator("[data-step-item].on")).toHaveCount(1);
    await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>('[data-pin="journey"]')!;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + (el.offsetHeight - window.innerHeight) * 0.95);
    });
    await expect(pin).toHaveAttribute("data-step", "5");
    await expect(pin.locator("[data-step-item].on")).toContainText("1XL Universe");
  });

  test("method chapter switches between the two worked examples", async ({ page }) => {
    await page.goto("/");
    const tab = page.getByRole("tab", { name: "An AI coworker sends a quote" });
    await tab.scrollIntoViewIfNeeded();
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".method-note")).toContainText("Sahkarmi");
  });

  test("proof numbers come from the GitHub snapshot and link to the record", async ({ page }) => {
    await page.goto("/");
    const releases = page.locator("#proof .proof-stats a").first();
    await expect(releases).toHaveAttribute("href", "https://github.com/ganguydhrubo/sahakarmi/releases");
    expect(Number(await releases.locator("strong").textContent())).toBeGreaterThanOrEqual(69);
    await expect(page.locator("#proof .proof-chart rect")).toHaveCount(Number(await releases.locator("strong").textContent()));
  });

  test("reduced motion gets a still, fully expanded page", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/film-static/);
    await expect(page.getByRole("button", { name: "Skip intro" })).toHaveCount(0);
    for (const item of await page.locator('[data-pin="journey"] [data-step-item]').all()) await expect(item).toBeVisible();
    await context.close();
  });

  test("the whole story is readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".hero-name")).toBeVisible();
    await expect(page.locator("#journey")).toContainText("MP Birla Cement");
    await expect(page.locator("#engineer")).toContainText("Sixteen permission categories");
    await expect(page.locator("#builder")).toContainText("ATITTLE");
    await expect(page.locator("#thinker")).toContainText("Human approval");
    await expect(page.locator("#contact")).toContainText("dhrubojyoti.gangopadhyay@gmail.com");
    await context.close();
  });

  test("no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(scroll).toBeLessThanOrEqual(client);
  });

  test("case study shows real screenshots of the live product", async ({ page }) => {
    await page.goto("/projects/sahkarmi");
    await expect(page.locator(".case-shot img").first()).toHaveAttribute("alt", /sahkarmi\.site/);
    await expect(page.locator(".proof-chart")).toBeVisible();
  });
});
