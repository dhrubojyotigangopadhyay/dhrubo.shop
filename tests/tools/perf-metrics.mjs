// Main-thread cost of the homepage film over a fixed window, via CDP Performance metrics.
// Usage: node tests/tools/perf-metrics.mjs [baseUrl]
import { chromium, devices } from "@playwright/test";
const base = process.argv[2] ?? "http://127.0.0.1:3100";
const b = await chromium.launch();
for (const [name, opts] of [["mobile", devices["Pixel 7"]], ["desktop", { viewport: { width: 1440, height: 900 } }]]) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p); await cdp.send("Performance.enable");
  const get = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
  await p.goto(base, { waitUntil: "load" }); await p.waitForTimeout(6000);
  const a = await get(); await p.waitForTimeout(4000); const z = await get();
  const d = (k) => (z[k] - a[k]).toFixed(3);
  console.log(name, "load+6s:", "layouts", a.LayoutCount, "recalcs", a.RecalcStyleCount, "layout s", a.LayoutDuration.toFixed(3), "style s", a.RecalcStyleDuration.toFixed(3), "script s", a.ScriptDuration.toFixed(3), "nodes", a.Nodes);
  console.log(name, "idle 4s :", "layouts", d("LayoutCount"), "recalcs", d("RecalcStyleCount"), "layout s", d("LayoutDuration"), "style s", d("RecalcStyleDuration"), "script s", d("ScriptDuration"), "task s", d("TaskDuration"));
  await ctx.close();
}
await b.close();
