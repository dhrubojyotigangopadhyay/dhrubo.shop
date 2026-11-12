// Captures real screenshots of the live products for the case studies.
// Usage: node scripts/capture-work.mjs   (needs network; writes public/media/work/*.webp)
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const targets = [
  { slug: "sahkarmi", url: "https://sahkarmi.site" },
  { slug: "atittle", url: "https://atittle.com" },
  { slug: "auraleads", url: "https://auraleads.online" },
  { slug: "zappy", url: "https://www.zappy.rest" },
];
await mkdir("public/media/work", { recursive: true });
const browser = await chromium.launch();
for (const t of targets) {
  for (const [kind, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: kind === "mobile" ? 2 : 1, colorScheme: "dark" });
    const page = await ctx.newPage();
    try {
      await page.goto(t.url, { waitUntil: "networkidle", timeout: 45000 });
    } catch (e) {
      console.log(t.slug, kind, "load warning:", String(e).slice(0, 80));
    }
    await page.waitForTimeout(2500);
    const buf = await page.screenshot({ type: "png" });
    const out = `public/media/work/${t.slug}-${kind}.webp`;
    await sharp(buf).resize({ width: kind === "mobile" ? 600 : 1440 }).webp({ quality: 80 }).toFile(out);
    console.log(out, page.url());
    await ctx.close();
  }
}
await browser.close();
