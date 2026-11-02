import { chromium, devices } from "@playwright/test";
const out = process.argv[2] ?? "test-results/screenshots";
import { mkdirSync } from "node:fs";
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const pages = ["/", "/projects/sahkarmi", "/ask", "/contact", "/writing/approval-gates-for-ai-agents"];
for (const [name, ctxOpts] of [["desktop", { viewport: { width: 1366, height: 900 } }], ["mobile", { ...devices["Pixel 7"] }]]) {
  for (const scheme of ["light", "dark"]) {
    const ctx = await b.newContext({ ...ctxOpts, colorScheme: scheme });
    const p = await ctx.newPage();
    const errors = [];
    p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    p.on("pageerror", (e) => errors.push(String(e)));
    for (const path of pages) {
      await p.goto("http://127.0.0.1:3100" + path, { waitUntil: "networkidle" });
      await p.screenshot({ path: `${out}/${name}-${scheme}${path.replace(/\//g, "_") || "_home"}.png`, fullPage: path === "/" });
    }
    console.log(name, scheme, "console errors:", errors.length, errors.slice(0, 3));
    await ctx.close();
  }
}
await b.close();
