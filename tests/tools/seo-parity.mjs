// Compares SEO-critical output of a candidate build against the live site, URL by URL.
// Usage: node tests/tools/seo-parity.mjs [candidateBase] [liveBase]
const cand = process.argv[2] ?? "http://127.0.0.1:3100";
const live = process.argv[3] ?? "https://www.dhrubo.shop";
const UA = { "User-Agent": "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" };
const get = async (u) => { const r = await fetch(u, { headers: UA, redirect: "manual" }); return { status: r.status, text: await r.text(), type: r.headers.get("content-type") ?? "" }; };
const pick = (html, re) => (re.exec(html)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").trim();
const meta = (html) => ({
  title: pick(html, /<title>([^<]*)<\/title>/),
  description: pick(html, /<meta name="description" content="([^"]*)"/),
  canonical: pick(html, /<link rel="canonical" href="([^"]*)"/),
  robots: pick(html, /<meta name="robots" content="([^"]*)"/),
  ogTitle: pick(html, /<meta property="og:title" content="([^"]*)"/),
  ogImage: pick(html, /<meta property="og:image" content="([^"]*)"/),
  ogType: pick(html, /<meta property="og:type" content="([^"]*)"/),
  twitter: pick(html, /<meta name="twitter:card" content="([^"]*)"/),
  ld: [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i).sort().join(","),
  h1: (html.match(/<h1[\s>]/g) ?? []).length,
});
const liveMap = (await get(`${live}/sitemap.xml`)).text;
const candMap = (await get(`${cand}/sitemap.xml`)).text;
const urls = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).sort();
const L = urls(liveMap), C = urls(candMap);
console.log(`sitemap: live ${L.length} URLs, candidate ${C.length}; missing in candidate: ${JSON.stringify(L.filter((u) => !C.includes(u)))}; new: ${JSON.stringify(C.filter((u) => !L.includes(u)))}`);
let diffs = 0;
for (const path of L) {
  const [a, b] = await Promise.all([get(live + path), get(cand + path)]);
  const ma = meta(a.text), mb = meta(b.text);
  const changed = Object.keys(ma).filter((k) => ma[k] !== mb[k]);
  if (b.status !== 200 || changed.length) {
    diffs++;
    console.log(`\n${path}  status live ${a.status} / candidate ${b.status}`);
    for (const k of changed) console.log(`  ${k}:\n    live: ${String(ma[k]).slice(0, 170)}\n    new : ${String(mb[k]).slice(0, 170)}`);
  }
}
for (const f of ["/robots.txt", "/llms.txt", "/llms-full.txt", "/feed.xml", "/manifest.webmanifest", "/og", "/BingSiteAuth.xml", "/google2b1b04098cb099d4.html", "/google99677de83162a02f.html", "/Dhrubojyoti_Gangopadhyay_CV.pdf", "/cv"]) {
  const [a, b] = await Promise.all([get(live + f), get(cand + f)]);
  const same = f === "/robots.txt" ? a.text === b.text : true;
  console.log(`${f.padEnd(34)} live ${a.status} / candidate ${b.status} ${a.type.split(";")[0]} ${same ? "" : "CONTENT DIFFERS"}`);
}
console.log(`\n${L.length - diffs}/${L.length} sitemap URLs have identical SEO fields.`);
