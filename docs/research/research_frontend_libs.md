# Frontend library evaluation — dhrubo.shop (Next.js 15 App Router, React 19, Tailwind 4, Vercel Hobby)

Date: 2026-11-02. Data sources: npm registry + api.npmjs.org (weekly downloads, last 7 days), bundlephobia (min+gz of the *whole* package entry point — tree-shaken real cost is noted where relevant), GitHub API (stars / open issues+PRs / last push), vendor licence pages. All figures pulled live today.

Legend: **ADOPT** = use on this site. **CONSIDER** = fine but only if a concrete feature needs it. **AVOID** = do not add.

## 0. State of the repo (C:\Users\Dhrubo\dhrubo.shop\package.json)

| Current dep | Pinned | Latest | Note |
|---|---|---|---|
| next | ^15.5.9 | **15.5.28** (`backport` tag, 2026-10-14) / 16.4.4 latest | 15.5.28 carries the 14-Oct-2026 security release. Next 15's two-year maintenance window closed ~21-Oct-2026; further 15.x backports are discretionary. Move to 15.5.28 now, plan 16.x (codemods cover most of it). |
| react / react-dom | ^19.2.3 | 19.3.1 | R3F 9.8.2 peer is `>=19 <19.4` — fine. |
| framer-motion | ^12.23.26 | 14.9.0 (`motion` is the canonical package) | v13 dropped `@emotion/is-prop-valid`; v14 removed internals only. Migrate to `motion/react`. |
| gsap | ^3.14.2 | 3.15.0 (2026-04-13) | Licence is free (see §2). |
| lucide-react | ^0.562.0 | 1.66.0 | 1.0 (2026-03-23) removed brand icons; otherwise drop-in. |
| @next/third-parties | ^15.5.28 | match `next` major | OK (but see §12). |
| zod | ^4.6.7 | 4.6.7 | OK. |
| vitest 5 / @testing-library/react 16 / @playwright/test 1.64 / @axe-core/playwright 4.14 | current | current | Already the right test stack. |

Hero facts that matter for CWV (`src/components/HeroScrubber.tsx`): client component; eagerly `new Image()`-preloads all 48 webp frames (`public/frames`, 2.0 MB) inside `useEffect` on mount; frame 0 is drawn only after its network load; `setProgress`/`setActiveStage` are called on every `scrollYProgress` change (React re-render per scroll tick); no `prefers-reduced-motion` branch; `<canvas>` is **not** an LCP candidate, so LCP is currently the hero headline text or the portrait `<Image>` — which is good news, as long as nothing delays them.

---

## 1. 3D / WebGL

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size min+gz | React 19 / Next 15 | SSR caveats | A11y | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `three` | 0.187.0 (2026-10-30) | 31.7M | MIT | 117k stars, 387 open, pushed today; monthly releases, no semver (0.x breaks) | 185.7 KB full; a minimal scene tree-shakes to ~100–130 KB | Framework-agnostic | Touches `window`/`document` → client-only, `dynamic(..., {ssr:false})` | Canvas is opaque to AT: needs `aria-hidden` + text equivalent | **CONSIDER** — only if a real 3D element earns ≥100 KB on the hero; the current frame-scrubber already gives the "3D" feel at 0 KB of library JS. |
| `@react-three/fiber` | 9.8.2 (2026-10-14) | 8.9M | MIT | 33k stars, 28 open, pushed 2026-10-21 | 57.7 KB | peer `react >=19 <19.4` (19.3.1 OK) | Same as three; wrap `<Canvas>` in `'use client'` + `next/dynamic ssr:false` | Same | **CONSIDER** — pair with three only. |
| `@react-three/drei` | 10.7.9 (2026-09-25) | 5.7M | MIT | 10k stars, 151 open | 521 KB full, `sideEffects:false` so per-helper import is small; **21 runtime deps** | peer `react ^19`, `fiber ^9` | Several helpers (Html, Text, Environment) fetch assets / need DOM | — | **CONSIDER** — import single helpers only; never `import * from`. |
| `@react-three/postprocessing` + `postprocessing` | 3.2.2 (2026-10-21) / 6.39.6 (2026-11-01) | 1.3M / 1.6M | MIT / **Zlib** (permissive, OSI) | pushed 2026-10-21 / 2026-11-01 | 105 KB / 113 KB | peer react ^19, fiber ≥9.7 | Client-only | Bloom/DoF on a hero hurts INP on low-end GPUs | **AVOID** for this site — +100 KB and GPU cost for cosmetics a recruiter will not notice on a portfolio. |
| `ogl` | 1.0.11 (2025-01-27) | 1.2M | **Unlicense** (public domain) | 4.7k stars; **last push 2025-04-13** (18 months stale) | 34.2 KB | Vanilla; use inside `useEffect` | Client-only | Same canvas caveats | **CONSIDER** — best size/feature ratio for a single shader plane (e.g. a hero backdrop) if you hand-write the integration; stale repo is the risk. |
| `@splinetool/react-spline` + `@splinetool/runtime` | 4.1.0 (2025-07-15) / 2.0.126 (2026-10-30) | 187k / 806k | **No `license` field on npm**; GitHub repo says MIT for the wrapper; runtime is proprietary Spline code (36 MB unpacked) | wrapper repo has an empty release list | wrapper 1.9 KB but runtime is multi-MB and scenes stream from `prod.spline.design` | `@splinetool/react-spline/next` entry renders a blurhash placeholder on the server | Third-party CDN on the critical path; free tier watermarks web exports; code export needs Professional ($20/seat/mo) | **AVOID** — vendor lock-in, unclear licence, watermark, multi-MB runtime. |
| threlte | — | — | MIT | — | — | Svelte only | n/a | n/a | **n/a** (not React). |

## 2. Motion

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | React 19 / Next 15 | SSR | A11y | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `gsap` | 3.15.0 (2026-04-13) | 8.3M | **"Standard 'no charge' license"** (custom, not SPDX — treat as `LicenseRef-GSAP-Standard`; effective 2025-04-30, last updated 2025-05-30, licensor = Webflow). Free for any commercial website incl. formerly paid plugins (ScrollTrigger, SplitText, MorphSVG, Flip, ScrollSmoother…). Only "Prohibited Use" = building a no-code animation tool that competes with Webflow. Webflow reserves the right to amend. | 30k stars, 8 open, pushed 2026-04-13 (slow but healthy; 3–4 releases/yr) | 27.4 KB core; ScrollTrigger ≈ +12 KB; SplitText ≈ +8 KB | Framework-agnostic; `@gsap/react` 2.1.2 (0.55 KB, `useGSAP` hook handles cleanup/StrictMode) | Import plugins inside client components; `gsap.registerPlugin` in `useGSAP` | `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` is the canonical pattern | **ADOPT** (already in repo) — keep for scroll-driven/timeline work; replaces `split-type`. Flag: licence is permissive but **not OSI**; fine for a personal site. |
| `motion` (canonical) / `framer-motion` (legacy alias, same code) | 14.9.0 (2026-10-30) | 33.9M / 66.9M | MIT | 34.8k stars, 19 open, pushed today; very fast cadence (5 releases in last 10 days) | 59 KB (`motion`) / 74 KB (`framer-motion`) full; `LazyMotion`+`m`+`domAnimation` ≈ 20 KB; `motion/react-mini` ≈ 5 KB | peer react ^18 \|\| ^19; v13 (2026-08) dropped `@emotion/is-prop-valid`, v14 (2026-10) removed internals only | `'use client'` for any motion component; `AnimatePresence` + App Router soft-nav edge cases reported | `useReducedMotion()` and `<MotionConfig reducedMotion="user">` built in | **ADOPT** — but switch `framer-motion@12` → `motion@14` (`import { m, LazyMotion, domAnimation } from 'motion/react'`). Do not run GSAP and Motion on the *same* element. |
| `@formkit/auto-animate` | 0.10.0 (2026-07-10) | 2.4M | MIT | 14k stars, 49 open, pushed 2026-07-10 | 3.2 KB | React hook `useAutoAnimate` works on 19 | Client-only hook; harmless on server | Respects `prefers-reduced-motion` by default | **CONSIDER** — only for list add/remove (e.g. project filter). Motion's `layout` already covers this; a third motion lib is not "few deps". |
| `animejs` v4 | 4.5.0 (2026-06-22) | 1.2M | MIT | 74k stars, 124 open, pushed 2026-08-21 | 40.5 KB full, ESM tree-shakable | Framework-agnostic | Client-only | Manual media-query check | **AVOID** here — overlaps GSAP 1:1; no reason to carry both. |

## 3. Smooth scroll

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | React 19 / Next 15 | SSR | A11y | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `lenis` | 1.3.27 (2026-10-15) | 2.4M | MIT | 17k stars, 38 open, pushed 2026-10-29 | 5.5 KB | `lenis/react` export (`<ReactLenis root>`), peer react ≥17 | Mount in a `'use client'` provider in `layout.tsx` | `respectReducedMotion: true` by default since 1.3.26 (smoothing off, programmatic scrolls instant; reacts to live changes). Use `data-lenis-prevent` on modals/terminal panes. Scroll-hijacking is a known recruiter pet-peeve; keep `lerp` ≥ 0.1 and `duration` ≤ 1.2. | **CONSIDER** → adopt only if you sync it with GSAP ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`); otherwise native scroll + CSS `scroll-timeline` / Motion `useScroll` is cleaner. If adopted, it is the *only* acceptable smooth-scroll lib. |
| `@studio-freight/lenis` | 1.0.42 (2024-03-17) | 119k | MIT | **Deprecated on npm** ("renamed to `lenis`") | — | — | — | — | **AVOID**. |
| `locomotive-scroll` | 5.0.1 (2026-01-15) | 21k | MIT | 8.9k stars, pushed 2026-06-30 | 8.8 KB (v5 wraps Lenis internally) | No React bindings | Client-only | Adds its own `[data-scroll]` DOM contract | **AVOID** — v5 is a thin layer over Lenis with 1/100th the adoption. |

## 4. Text / typography

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | Notes | Verdict |
|---|---|---|---|---|---|---|---|
| `split-type` | 0.3.4 (2023-10-22) | 55k | ISC | 733 stars; **last push 2023-12-03** — unmaintained | 4.3 KB | Splits text into spans → breaks screen-reader word boundaries unless you add `aria-label` on the parent + `aria-hidden` on the spans | **AVOID** — GSAP SplitText (now free, `aria: 'auto'` option) supersedes it. |
| GSAP `SplitText` | ships in gsap 3.15 | — | GSAP standard | — | ~8 KB | Built-in `aria` handling, `autoSplit`, re-splits on font load | **ADOPT** (via gsap). |
| `next/font` (built-in) | with next | — | MIT | — | 0 KB JS; self-hosts Google/local fonts, injects `size-adjust` fallback → CLS ≈ 0 | Use `display: 'swap'`, `preload: true` for the headline font only, variable `woff2` | **ADOPT** — it is already the Next default. |
| `@fontsource-variable/inter` (example) | 5.3.0 (2026-07-19) | 9.5M | OFL-1.1 (font), MIT (package) | monthly | ~100 KB woff2 (full Inter variable) | Only needed when the font is *not* on Google Fonts or you want npm-pinned glyph subsets; otherwise redundant with `next/font/google` | **CONSIDER** — only for a non-Google font; prefer `next/font/local` with a hand-subsetted woff2 (fewer bytes). |

## 5. Shaders / effects

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | React 19 / Next 15 | SSR | A11y | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `@paper-design/shaders-react` (+ `@paper-design/shaders`) | 0.0.82 (2026-10-21) | 1.3M / 1.6M | **Apache-2.0** (LICENSE file verified; README adds "no attribution required"; a PolyForm Shield mention on third-party pages is stale) | 3.9k stars, 14 open, pushed 2026-11-01; **README: "pin your dependency — breaking changes ship under 0.0.x"** | 83 KB (full set; each shader component imports only its GLSL + shared mount, ~15–25 KB in practice) | peer react ^18 \|\| ^19 | Constructor throws without WebGL2 → wrap in an error boundary; render a CSS gradient on the server and swap in on mount | Animated only if `speed > 0`; set `speed={0}` under reduced motion | **CONSIDER** — the most "2026-looking" low-effort win (MeshGradient / Dithering behind the bento). Pin exact version. Lazy-load, below-the-fold or after LCP. |
| `lamina` | 1.2.2 (2025-06-21) | 3.6k | MIT | **GitHub repo archived** | 83 KB | peer fiber ≥8 | — | — | **AVOID** — archived. |
| `postprocessing` | see §1 | — | Zlib | — | 113 KB | — | — | — | **AVOID** here. |
| "react-shader-toy"-style wrappers | assorted tiny packages, <5k dl | mixed | mostly unmaintained | — | — | — | — | — | **AVOID** — if you need a custom fragment shader, write ~60 lines on raw WebGL2 or `ogl`; do not add a wrapper dep. |

## 6. Diagrams / data viz

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | React 19 / Next 15 | SSR | A11y | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `d3` (umbrella) | 7.9.0 (2024-03-12) | 30.9M | ISC | 114k stars, 22 open, pushed 2026-10-21 (submodules release independently) | 92 KB full; `d3-scale`+`d3-shape` ≈ 12 KB | Framework-agnostic | Pure-math submodules run fine in Server Components → emit static `<svg>` with zero client JS | SVG with `<title>`/`<desc>`, real text labels | **ADOPT (scoped)** — `d3-scale`, `d3-shape`, `d3-array` only, rendered server-side as SVG. Never import the `d3` root. |
| `mermaid` | 12.2.0 (2026-10-13) | 24M | MIT | 91k stars, **2,029 open**, pushed today | 173.5 KB core + lazy diagram chunks | Client-side render needs DOM | Render at **build time** (`rehype-mermaid` / `beta` CLI via Playwright) and ship SVG | Output SVG lacks semantic labels; add `aria-label` | **CONSIDER** — only for MDX architecture diagrams, and only via build-time rendering. Never ship the runtime to the client. |
| `@xyflow/react` (React Flow) | 12.12.1 (2026-11-02) | 19.5M | MIT | 38.9k stars, 149 open, pushed today | 60 KB + CSS | peer react ≥17; fine on 19 | `'use client'`; measures DOM → render `ssr:false` or give nodes fixed `width/height` to avoid CLS | Built-in keyboard nav + `aria-*`; decent | **CONSIDER** — a genuine differentiator for an "agentic systems" portfolio (interactive LangGraph/MCP diagram), but only lazy-loaded on interaction or scroll-into-view. |
| `@visx/visx` | 4.0.0 (2026-06-11) | 119k (meta pkg; `@visx/scale` etc. ~1M each) | MIT | 21k stars, 160 open, pushed 2026-06-22 | meta pkg = 33 deps; individual pkgs 5–15 KB | peer react ^18 \|\| ^19 | SVG, SSR-safe | Low-level primitives; a11y is yours | **CONSIDER** — only if you want React-flavoured d3 primitives; raw `d3-*` + JSX achieves the same with fewer deps. |
| `recharts` | 3.10.1 (2026-07-25) | 62M | MIT | 27.7k stars, **460 open**, pushed today | 150 KB | peer react ^19 OK | `'use client'`; `ResponsiveContainer` measures → CLS unless you set fixed height | Limited; tooltips mouse-first | **AVOID** — 150 KB for charts a portfolio does not need. |

## 7. Icons

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | Notes | Verdict |
|---|---|---|---|---|---|---|---|
| `lucide-react` | 1.66.0 (2026-10-31) | 127.2M | **ISC** | 25.5k stars, 394 open, pushed today; weekly releases | 207 KB *if* you import the index — but ESM + `sideEffects:false` → ≈0.4–0.6 KB per icon used | 1.0 (2026-03-23): brand icons removed, ~32% smaller per-icon code; `*Icon`-suffixed exports available. Lucide sets `aria-hidden="true"` by default; add `aria-label` on icon-only buttons. | **ADOPT** — already in repo; bump 0.562 → 1.66. |
| `@phosphor-icons/react` | 2.1.10 (2025-05-22) | 7.4M | MIT | 1.8k stars, pushed 2026-01-06 (6-monthly cadence) | 1.06 MB index; per icon similar to lucide, but 6 weights double the bytes if mixed | Nice duotone weight | **AVOID** — a second icon set = duplicate glyph styles and bytes. |

## 8. Accessibility / UI primitives

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | React 19 / Next 15 | SSR | A11y | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `radix-ui` (umbrella) / `@radix-ui/react-dialog` | 1.8.1 / 1.3.1 (2026-10-12) | 24.9M / 88.5M | MIT | 19.5k stars, 265 open, pushed 2026-10-14 (WorkOS-maintained; slower feature pace since 2024) | 74 KB umbrella (tree-shakable); Dialog alone 13.2 KB (15 deps) | peer react ^19 OK | Works in client components; portals need `'use client'` | Gold-standard WAI-ARIA | **ADOPT (one or two primitives)** — Dialog (for the chat widget) and Tooltip. Import per-package, not the umbrella. |
| `@base-ui/react` (renamed from `@base-ui-components/react`, which npm marks **deprecated**) | 1.9.0 (2026-10-09) | 26.2M | MIT | 11.3k stars, 443 open, pushed today; 1.0 stable 2025-12-11 (MUI team, ex-Radix authors) | 166 KB umbrella, tree-shakable | peer react ^17–^19 | Same | Same calibre; newer API (render prop, CSS-first) | **CONSIDER** — equal to Radix; pick **one**. Radix wins on docs/ecosystem familiarity today; Base UI wins on momentum. |
| `react-aria-components` / `react-aria` | 1.22.1 / 3.53.1 (2026-10-09) | 7.6M / 15M | Apache-2.0 | 16k stars, 683 open, pushed 2026-10-29 (Adobe) | 279 KB umbrella; per-component 15–40 KB (heavier: i18n + interactions layers) | OK | OK | Best-in-class internationalised a11y | **AVOID** for a portfolio — heaviest of the three; justified only for complex app UI (date pickers, comboboxes). |

## 9. MDX / content

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size (client) | React 19 / Next 15 | Notes | Verdict |
|---|---|---|---|---|---|---|---|---|
| `@next/mdx` | 15.5.28 (match `next`) | 2.3M | MIT | Vercel | 0 KB (compiled at build) | First-party | Pair with `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`; frontmatter via `export const metadata` or `gray-matter` | **ADOPT** — fewest moving parts; Turbopack-compatible. |
| `velite` | 0.4.0 (2026-06-17) | 82k | MIT | 826 stars, 34 open, pushed today | 0 KB | Build-time only (works with any Next version) | Zod-typed frontmatter, generates `.velite/` JSON+types; runs as a pre-build step or via a `next.config` plugin | **CONSIDER** — adopt only when you have >10 content entries and want schema-validated frontmatter. Small community. |
| `contentlayer2` | 0.5.8 (2025-05-03) | 100k | MIT | 424 stars; **last push 2025-05-03** (18 months) | 0 KB | Historically brittle with each Next major | — | **AVOID** — stagnant fork of an abandoned project. |
| `next-mdx-remote` | 6.0.0 (2026-02-12) | 1.8M | **MPL-2.0** (file-level copyleft; OK to use unmodified, but flag) | HashiCorp | small | RSC variant exists | Only needed for MDX from a DB/CMS | **AVOID** — unnecessary when content is in-repo. |
| `shiki` | 4.6.0 (2026-11-02) | 35.9M | MIT | 13.9k stars, 107 open, pushed today; v4 needs Node ≥20 | 65 KB **server-only** → 0 KB client when used in rehype at build | — | Use `createHighlighter` singleton; load only needed langs/themes; use `shiki/bundle/web` or fine-grained bundle | **ADOPT** (build-time). |
| `rehype-pretty-code` | 0.14.5 (2026-07-25) | 836k | MIT | 1.3k stars, 30 open | server-only | peer `shiki ^1–^4` (v4 supported) | Line highlighting, titles, word highlights; dual light/dark themes via CSS vars | **ADOPT** with `@next/mdx`. |

## 10. Forms / validation

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | Notes | Verdict |
|---|---|---|---|---|---|---|---|
| `zod` | 4.6.7 (2026-10-12) | 443M | MIT | 44k stars, 118 open, pushed 2026-10-30 | 88.9 KB full; **`zod/mini` ≈ 6–10 KB** tree-shaken | Validate on the server (Route Handler / Server Action). If a schema must run client-side, import from `zod/mini`. | **ADOPT** — already in repo. |
| `react-hook-form` | 7.91.0 (2026-10-23) | 60.5M | MIT | 44.9k stars, **7 open**, pushed 2026-11-01 | 16 KB | Uncontrolled inputs → no re-render per keystroke (INP-friendly); `@hookform/resolvers` 7.0.1 (0.6 KB) bridges zod 4 | **CONSIDER** — a single contact form is simpler as a **Server Action + `useActionState` + zod**; adopt RHF only if the form grows (multi-step, dynamic fields). |

## 11. Rate limiting / edge

| Option | Latest (date) | Weekly dl | Licence | Size (server) | Notes | Verdict |
|---|---|---|---|---|---|---|
| `@upstash/ratelimit` + `@upstash/redis` | 2.2.0 (2026-09-23) / 1.41.0 (2026-11-02) | 3.1M / 7M | MIT | 9.8 KB + ~15 KB | HTTP-based, Vercel-ready; create the limiter outside the handler; on Edge use `waitUntil` for pending promises; `ephemeralCache` reduces Redis hits. Upstash free tier (10k cmds/day) is enough for a portfolio chat endpoint. Needs 2 env vars. | **ADOPT** for `/api/chat` — the only *correct* option on serverless (see below). |
| In-memory `Map` limiter (no dep) | — | — | — | 0 KB | Each Vercel function instance has its own memory; concurrent/cold instances do not share state → limit is per-instance, resets on cold start. Acceptable only as a **best-effort first layer**, never as the real guard. | **CONSIDER** as a free fallback *in addition*, or when no Redis is configured (degrade gracefully). |
| Vercel WAF rate-limit rule | — | — | — | 0 KB | Hobby: up to 3 custom firewall rules; docs/Academy say 1 rate-limit rule per project on Hobby, but a 2026-10-14 community report says choosing the 429 action prompts a Pro upgrade → treat as **not reliably available on Hobby**. | **CONSIDER** — configure if the dashboard allows it; do not depend on it. |

## 12. Analytics

| Package | Latest (date) | Weekly dl | Licence | Size | Notes | Verdict |
|---|---|---|---|---|---|---|
| `@vercel/analytics` | 2.0.1 (2026-03-12) | 10.7M | **MIT** (2.0 moved from MPL-2.0) | 1.6 KB | `<Analytics />` in `layout.tsx`, loads `/_vercel/insights/script.js` deferred. Hobby: 50k events/mo, 1-month retention, no overage billing (collection pauses). Cookie-less → no consent banner. | **ADOPT**. |
| `@vercel/speed-insights` | 2.0.0 (2026-03-10) | 7M | Apache-2.0 | 1.1 KB | Real-user CWV (LCP/INP/CLS) — exactly the proof a recruiter can be shown. Hobby: 10k data points per rolling 30 days, 1 project, short reporting window (7-day per limits page). | **ADOPT**. |
| `@next/third-parties` (GA4) | 15.5.28 | 3.8M | MIT | `<GoogleAnalytics>` ≈ 2 KB wrapper + **~90 KB gtag** | GA4 is the single biggest third-party cost you could add (gtag + cookies → consent banner for EU visitors). | **AVOID** unless you need GA4-specific funnels; drop the existing dep if unused. |

## 13. OG image

| Option | Notes | Verdict |
|---|---|---|
| `next/og` `ImageResponse` (built-in, Satori + Resvg) | Add `src/app/opengraph-image.tsx` (and `twitter-image.tsx`). Flex-only CSS subset; fonts must be supplied as `ArrayBuffer` (`readFile` on the Node runtime or `fetch(new URL(..., import.meta.url))`). Output limit 8 MB OG / 5 MB Twitter. Static at build (`export const dynamic = 'force-static'`) → zero runtime cost on Hobby. | **ADOPT** — replaces the static `/og-image.jpg`; use the Node runtime (Edge is no longer required and Node gives `fs` for local fonts). |
| `@vercel/og` | Same engine; only for non-Next | **AVOID** (redundant). |

## 14. Testing

| Package | Latest (date) | Weekly dl | Licence | Notes | Verdict |
|---|---|---|---|---|---|
| `vitest` | 5.0.5 (2026-10-15) | 169.7M | MIT | Already present with `@vitejs/plugin-react` 6.2.1 + `jsdom` 30 | **ADOPT** (keep). |
| `@testing-library/react` + `jest-dom` | 16.3.3 (2026-08-27) / 7.0.1 | 90M | MIT | peer react ^18 \|\| ^19 | **ADOPT** (keep). |
| `@playwright/test` | 1.64.1 (2026-10-14) | 104M | Apache-2.0 | Add a `reducedMotion: 'reduce'` project in `playwright.config` to test the fallback path | **ADOPT** (keep). |
| `@axe-core/playwright` | 4.14.0 (2026-10-15) | 21M | **MPL-2.0** — dev-only, never shipped; acceptable | Run on every route in CI; fail on `serious`/`critical` | **ADOPT** (keep). |
| `@lhci/cli` | 0.15.1 (2025-06-25) | 2.4M | Apache-2.0 | 7.1k stars, pushed 2026-10-31; bundles Lighthouse 12.6.1; `lhci autorun` with budgets (`performance ≥ 0.95`, `lcp ≤ 2500`, `cls ≤ 0.1`, `total-byte-weight`) against `next start` in GitHub Actions. 16-month gaps between releases are normal for this project. | **ADOPT** (devDependency). |
| `unlighthouse` | — | ~100k/mo | MIT | Site-wide crawler; overkill for a 1–3-route site | **AVOID**. |

## 15. Sound

| Package | Latest (date) | Weekly dl | Licence | Maintenance | Size | Notes | Verdict |
|---|---|---|---|---|---|---|---|
| `howler` | 2.2.4 (2023-09-19) | 1.4M | MIT | 25k stars, **420 open**, pushed 2025-11-23, last release 3 yrs ago | 9.7 KB | Web Audio + HTML5 fallback; autoplay blocked until a user gesture anyway | **AVOID**. |
| `use-sound` | 5.0.0 (2025-02-18) | 326k | MIT | 3.2k stars, 60 open, pushed 2025-06-10 | 0.9 KB + howler | Hook wrapper | **AVOID**. |
| **Should sound be used at all?** | — | — | — | — | — | No. Browsers block audio before a gesture; recruiters review sites in open offices / muted tabs; WCAG 1.4.2 requires a control for any auto-sound; it adds a dependency with no measurable upside. If you insist on a UI "tick", use a single ≤2 KB `.mp3` with a native `new Audio()` behind an explicit opt-in toggle persisted in `localStorage`. | **AVOID**. |

---

## Recommended stack (minimal; all permissive; all maintained within the last 60 days unless noted)

### Runtime dependencies

| Package | Version to pin | Purpose |
|---|---|---|
| `next` | `15.5.28` now → `16.x` next sprint | Framework (security backport 2026-10-14) |
| `react`, `react-dom` | `19.3.1` | — |
| `motion` | `^14.9.0` | Replace `framer-motion` 12; use `LazyMotion` + `m` + `domAnimation` (≈20 KB), `useReducedMotion` |
| `gsap` + `@gsap/react` | `^3.15.0` / `^2.1.2` | ScrollTrigger + SplitText (free licence); `useGSAP` hook |
| `lenis` | `^1.3.27` | **Optional**; only if ScrollTrigger-synced smooth scroll is wanted; `respectReducedMotion` default |
| `lucide-react` | `^1.66.0` | Icons (ISC), per-icon import |
| `@radix-ui/react-dialog`, `@radix-ui/react-tooltip` | `^1.3.1` / latest 1.x | Chat-widget dialog + tooltips (or `@base-ui/react` — pick one) |
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` | match `next` / `^3` | Case-study / writing pages |
| `shiki` + `rehype-pretty-code` | `^4.6.0` / `^0.14.5` | Build-time code highlighting (0 KB client) |
| `d3-scale`, `d3-shape`, `d3-array` | `^4` / `^3` / `^3` | Server-rendered SVG charts (only if a chart exists) |
| `zod` | `^4.6.7` | Server-side validation (`zod/mini` if any client schema) |
| `@upstash/ratelimit` + `@upstash/redis` | `^2.2.0` / `^1.41.0` | Rate-limit `/api/chat` |
| `@vercel/analytics` + `@vercel/speed-insights` | `^2.0.1` / `^2.0.0` | RUM CWV proof (Hobby-free) |
| `clsx`, `tailwind-merge` | keep | — |
| *Optional, lazy, pinned exact:* `@paper-design/shaders-react` | `0.0.82` (exact) | One MeshGradient backdrop, loaded after LCP, `speed=0` on reduced motion |
| *Optional, lazy:* `@xyflow/react` | `^12.12.1` | Interactive agent-architecture diagram, loaded on scroll-into-view |

Remove: `framer-motion`, `@next/third-parties` (unless GA4 is actually used).
Do not add: three/R3F/drei (unless a specific 3D piece is designed), postprocessing, ogl, spline, animejs, auto-animate, locomotive-scroll, split-type, lamina, recharts, phosphor, react-aria, contentlayer2, next-mdx-remote, howler/use-sound.

### Dev dependencies
`vitest@^5`, `@vitejs/plugin-react@^6`, `jsdom@^30`, `@testing-library/react@^16`, `@testing-library/jest-dom@^7`, `@playwright/test@^1.64`, `@axe-core/playwright@^4.14`, `@lhci/cli@^0.15.1`, `typescript@^5.9`, `tailwindcss@^4.1`, `@tailwindcss/postcss@^4.1`, `eslint@^9`, `eslint-config-next` (match next).

### Licence summary
MIT/ISC/Apache-2.0/Zlib/Unlicense: everything above except — `gsap` (custom "Standard no-charge", free for commercial, non-OSI, Webflow may amend), `@axe-core/playwright` (MPL-2.0, dev-only), fonts (OFL-1.1). Nothing GPL. Spline runtime (no licence field, proprietary) is the only commercial item and is avoided.

---

## Keeping LCP < 2.5 s with a canvas/WebGL hero (applied to `HeroScrubber.tsx`)

1. **Make the LCP element a real image or text, not the canvas.** `<canvas>` is never an LCP candidate. Render `frame_000` as `<Image src="/frames/frame_000.webp" priority fetchPriority="high" sizes="(max-width:768px) 100vw, 420px" />` (or inline it as the hero's `background-image`) *underneath* the canvas. LCP fires on that image at ~first paint; the canvas then draws over it. Keep the headline as server-rendered text with `next/font` (`display:'swap'`, `preload` only the display face) so the text LCP candidate is also early.
2. **Do not preload 48 frames on mount.** Today the effect fires 48 requests (2.0 MB) during the LCP window and competes for bandwidth with the poster and fonts. Instead: load frame 0 (poster) eagerly; after the poster's `onLoad` and `requestIdleCallback` (fallback `setTimeout(…, 200)`), fetch frames 1–47 in chunks of 6 with `img.fetchPriority = 'low'`. Only start when the hero is in view (`IntersectionObserver`), and skip entirely if `navigator.connection?.saveData` or `effectiveType` is `2g/3g`.
3. **Decode off the main thread.** Use `createImageBitmap(blob)` and draw bitmaps; call `img.decode()` before the first `drawImage` so the poster-to-canvas swap does not jank. Draw the frame with `ctx.drawImage` only — move the grid/HUD overlay into a second, static canvas or CSS so it is not re-stroked 48× per scroll.
4. **No React state on the scroll path.** `setProgress`/`setActiveStage` on every `scrollYProgress` change re-renders the whole hero per tick → INP risk. Drive the canvas from refs + `requestAnimationFrame` (already partly done), and derive `activeStage` with `useMotionValueEvent` only when the stage index actually changes (3 updates total). Debounce via rAF, never per event.
5. **Reduced-motion fallback = the poster.** `const reduce = useReducedMotion()` (motion) or `gsap.matchMedia`: when true, do not create the canvas or fetch frames; show `frame_000` + static copy. Also honour it in Lenis (default) and CSS (`@media (prefers-reduced-motion: reduce) { * { animation: none; scroll-behavior: auto } }`).
6. **Dynamic import with `ssr:false` for anything WebGL/three/shaders.** `const Shader = dynamic(() => import('./MeshGradientBg'), { ssr:false, loading: () => <div className="bg-gradient-…" /> })` inside a `'use client'` wrapper; mount it from a `useEffect` gated on `requestIdleCallback` so its JS chunk never sits in the LCP critical path. Keep the hero scrubber itself SSR'd (it is DOM + canvas; only the drawing is client-side) so the poster and text ship in HTML.
7. **Reserve space to kill CLS.** Give the canvas/poster container an explicit `aspect-ratio` and `min-height` (e.g. `aspect-square w-[min(420px,90vw)]`); never let `getBoundingClientRect()` fall back to `420` after layout.
8. **Budget.** Target ≤ 120 KB gz first-party JS on `/` after the swap to `motion` + `LazyMotion` (Next runtime ≈ 90 KB + motion mini-features 20 KB + gsap core 27 KB + lucide ≈ 3 KB). Every optional item above (shaders ~20 KB, React Flow 60 KB, three ≥ 150 KB) must be lazy-loaded below the fold and show up in `lhci` `total-byte-weight` budgets.
9. **Verify.** `@lhci/cli` assertion: `largest-contentful-paint ≤ 2500` on mobile throttling; a Playwright project with `reducedMotion: 'reduce'` asserting the canvas is absent and the poster is visible; `@vercel/speed-insights` for field p75.

---

## Sources

- npm registry metadata and `api.npmjs.org` download counts for every package listed (fetched 2026-11-02).
- bundlephobia.com API size records (fetched 2026-11-02).
- GitHub REST API repository metadata (stars, open issues, pushed_at, archived) (fetched 2026-11-02).
- GSAP Standard "No Charge" License — https://gsap.com/community/standard-license/ (effective 2025-04-30, updated 2025-05-30)
- GSAP 3.13 release ("completely free") — https://gsap.com/blog/3-13/ ; CSS-Tricks coverage — https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/
- Motion changelog (v13 2026-08-05, v14 2026-10-02) — https://motion.dev/changelog?type=major ; migration guide — https://motion.dev/docs/migration ; Lenis + reduced motion — https://motion.dev/docs/lenis
- Lenis README (respectReducedMotion default) — https://github.com/darkroomengineering/lenis/blob/main/README.md ; deprecated `@studio-freight/lenis` npm notice — https://npmjs.com/package/@studio-freight/lenis
- R3F v9 migration guide — https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide ; Next.js lazy-loading docs — https://nextjs.org/docs/app/guides/lazy-loading
- Spline pricing (watermark on free, code export on Professional) — https://spline.design/pricing ; react-spline repo — https://github.com/splinetool/react-spline
- Base UI releases (1.0 stable 2025-12-11, package rename) — https://base-ui.com/react/overview/releases.md ; InfoQ — https://infoq.com/news/2026/02/baseui-v1-accessible/
- Paper Shaders LICENSE (Apache-2.0) and README (pin 0.0.x) — https://github.com/paper-design/shaders
- Lucide v1 migration (brand icons removed) — https://lucide.dev/guide/react/migration.md
- Shiki v4 blog (Node ≥ 20) — https://shiki.style/blog/v4 ; rehype-pretty-code peer range from npm.
- Vercel Hobby plan — https://vercel.com/docs/plans/hobby ; Web Analytics limits — https://vercel.com/docs/analytics/limits-and-pricing ; Speed Insights limits — https://vercel.com/docs/speed-insights/limits-and-pricing ; WAF rate limiting — https://vercel.com/docs/security/vercel-waf/rate-limiting ; community report on Hobby 429 gating (2026-10-14) — https://community.vercel.com/t/hobby-firewall-selecting-429-opens-pro-upgrade-despite-documented-allowance/50801.md
- Upstash ratelimit getting started (serverless/edge caveats) — https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted.md
- `@vercel/analytics` 2.0.0 release notes (MPL-2.0 → MIT) — https://newreleases.io/project/npm/@vercel/analytics/release/2.0.0
- Next.js 16 beta announcement — https://nextjs.org/blog/next-16-beta ; Next.js 15 end-of-support analysis — https://www.digitalapplied.com/blog/nextjs-15-end-of-support-october-21-upgrade-options ; https://endoflife.ai/nextjs/15
- `next/og` ImageResponse docs — https://nextjs.org/docs/15/app/api-reference/functions/image-response ; opengraph-image convention — https://nextjs.org/docs/canary/app/api-reference/file-conventions/metadata/opengraph-image
- Lighthouse CI vs Unlighthouse — https://unlighthouse.dev/learn-lighthouse/lhci-vs-unlighthouse
- anime.js v4 imports — https://animejs.com/documentation/getting-started/imports
- Velite vs contentlayer discussion — https://sia.hackernoon.com/how-i-built-a-simple-mdx-blog-in-nextjs-and-why-i-chose-native-mdx-over-contentlayer
