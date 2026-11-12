// Visual check of the homepage film: scrolls through every chapter and saves a frame of each.
// Usage: node tests/tools/film-shots.mjs [baseUrl] [outDir] [desktop|mobile|both]
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://127.0.0.1:3100";
const out = process.argv[3] ?? ".film-shots";
const which = process.argv[4] ?? "both";
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const profiles = [
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["mobile", { ...devices["Pixel 7"] }],
].filter(([name]) => which === "both" || which === name);

for (const [name, opts] of profiles) {
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => localStorage.setItem("dhrubo.consent.v1", "denied"));
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(base, { waitUntil: "commit" });
  for (const ms of [450, 1300, 2300]) {
    await page.waitForTimeout(ms === 450 ? 450 : 900);
    await page.screenshot({ path: `${out}/${name}-00-intro-${ms}.png` });
  }
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2500);
  const wide = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const bad = [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > w + 1 && !e.closest("[data-reel-track], .film-hud, .film-back, .hero-portrait, .sys-labels")).slice(0, 6);
    return { scrollWidth: document.documentElement.scrollWidth, w, bad: bad.map((e) => e.tagName + "." + e.className.toString().slice(0, 40)) };
  });
  console.log(name, "overflow check:", JSON.stringify(wide));
  await page.screenshot({ path: `${out}/${name}-01-opening.png` });

  // Each chapter start, then points inside the pinned chapters.
  const marks = await page.evaluate(() => {
    const vh = innerHeight;
    const list = [];
    for (const s of document.querySelectorAll("[data-chapter]")) {
      const top = s.getBoundingClientRect().top + scrollY;
      if (s.id !== "opening") list.push([`${s.id}-head`, top - vh * 0.1]);
      const pin = s.querySelector("[data-pin]");
      if (pin) {
        const r = pin.getBoundingClientRect();
        const pt = r.top + scrollY;
        const len = Math.max(0, r.height - vh);
        const n = Number(pin.dataset.steps);
        for (const k of [0, Math.floor(n / 2), n - 1]) list.push([`${s.id}-step${k}`, pt + ((k + 0.5) / n) * len]);
      } else if (s.id !== "opening") list.push([`${s.id}-mid`, top + s.getBoundingClientRect().height * 0.5 - vh * 0.5]);
    }
    return list;
  });
  let i = 2;
  for (const [label, y] of marks) {
    await page.evaluate((to) => window.scrollTo(0, to), y);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${out}/${name}-${String(i++).padStart(2, "0")}-${label}.png` });
  }
  const gl = await page.evaluate(() => document.documentElement.className);
  console.log(name, "frames:", i, "| html classes:", gl, "| errors:", errors.length ? errors : "none");
  await ctx.close();
}
await browser.close();
