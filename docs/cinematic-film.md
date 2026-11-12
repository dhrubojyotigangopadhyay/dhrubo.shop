# The homepage film

Branch `cinematic/2026-11`, built 12 Nov 2026. This document covers the creative direction, the design system, how the film is built, how to maintain it, and what was measured. Research that fed it is in `docs/research/` (`cinematic-design-research.md`, `creative-tools-and-licences.md`, `evidence-2026-11-12.md`).

## 1. What changed

| Area | Before | Now |
| --- | --- | --- |
| Homepage `/` | Evidence-first sections | Eight-chapter scroll film over one persistent WebGL scene |
| Sahkarmi numbers | Typed by hand (50 / 277 / 72, dated 2 Nov) | Read from the GitHub API before every build (`src/generated/github.json`) |
| Case studies `/projects/[slug]` | Text | Same text, plus real screenshots of the live product and, for Sahkarmi, the release history |
| Dark palette, accent | Blue-black, orange | Warm near-black, vermilion (site-wide, so inner pages match) |
| Everything else | | Unchanged: routes, assistant, contact API, SEO files, CSP, analytics |

Nothing was removed from the site's infrastructure. Next.js 15, React 19 and Tailwind 4 stay; two runtime dependencies were added (`three`, `lenis`).

## 2. Creative direction

**Idea: matter becomes system.** Dhrubo's story runs from cement and steel to software. The film has one material, a field of about 30,000 points of dust, and it never cuts. The dust drifts in the opening, gathers into a dealer network for the career, tightens into a system map for the engineering, lines up as seven gates for the method, stacks into the real release history for the proof, turns bioluminescent for the future and closes as an eclipse ring. One camera travels through all eight sets on a single spline.

How the four requested references were used:

| Reference | What was taken | What was left out |
| --- | --- | --- |
| Indian cinematic thriller | Near-black frame, one controlled red, film grain, letterbox bars in the intro, poster-scale condensed type, a side-lit portrait | Any film's footage, characters, logos or title treatment |
| World-building | Volumetric particle depth, a continuous camera, one teal bioluminescent scene (chapter 07 only) | Creatures, landscapes or anything resembling a specific film |
| Premium technology | Three colours, one display face, strict spacing, small mono labels, restraint in UI chrome | Glass panels, gradients, dashboard styling |
| Experimental storytelling | One-take travel, pinned chapters that cross-fade in place, kinetic outline numerals, serif italic as a second voice | Hand-drawn animation and collage (see limitations) |

**Type.** Big Shoulders (SIL OFL 1.1) for titles: it was drawn for Chicago's industrial signage, which suits a cement-and-steel story. Newsreader italic (OFL, already on the site) is the counter-voice. Body text stays on the system stack, as before, because it costs nothing to load. Labels are system mono.

**Colour.** `#0a0908` background, `#efe9dd` bone, `#e5391c` vermilion (`#ff5330` when used as small text, `#cc2d11` under white button text, both for contrast), `#5eead4` teal reserved for chapter 07 and the "live" dot.

**Rules that keep it from becoming noise.** Every effect has a job: the pinned timeline is the 16 years, the system map labels are the parts of the system and are clickable, the release squares are real releases, the red is always the human approval gate or the latest release. Nothing loops for decoration except the dust drift and the grain.

## 3. Chapters and where each fact comes from

| # | Chapter | Content | Source |
| --- | --- | --- | --- |
| 01 | Opening | "The future doesn't build itself." then name, role, portrait | Brief; CV headline; the owner's real portrait, re-lit (section 6) |
| 02 | Journey | Six roles, 2007 to 2026, pinned timeline | CV, professional experience |
| 03 | Engineer | Seven connected parts: runtime, approval, MCP, RAG, graphs, automation, production | CV competencies and Sahkarmi project bullets |
| 04 | Builder | Sahkarmi, ATITTLE, AuraLeads, Zappy with screenshots | Live sites captured 12 Nov 2026; `src/content/projects.ts` |
| 05 | Thinker | Seven-step method, two worked examples | Dealer scheme is labelled a method illustration; the Sahkarmi example is the shipped architecture |
| 06 | Proof | Releases, commits, merged PRs, release chart, repositories with status | GitHub API snapshot; CV; `projects.ts` |
| 07 | Future | The vision line and three principles | Brief; each principle points at something already built |
| 08 | Contact | Links and the existing enquiry form | `src/content/profile.ts` |

No testimonials, customer numbers, revenue or performance metrics appear anywhere, because none are verified.

## 4. Architecture

```
src/app/page.tsx                 server component: all eight chapters as real HTML
src/app/film.css                 the film's styles, scoped to .film and html.cine
src/content/film.ts              chapter copy
src/components/film/FilmStage.tsx  client conductor: backdrop, HUD, scroll loop, intro, sound
src/components/film/scene.ts     three.js scene, loaded with a dynamic import
src/components/film/MethodCases.tsx  chapter 05 tabs
src/components/film/ReleaseChart.tsx server-rendered SVG of every release
scripts/build-github.mjs         GitHub snapshot (runs in prebuild)
scripts/capture-work.mjs         re-takes the product screenshots
scripts/portrait-treatment.py    re-creates the portrait treatment
```

**Content first.** Every word is server-rendered DOM. The canvas sits behind it in a sticky layer and carries no information that is not also in the text, so search engines, screen readers and the site's own assistant index read the same story.

**One scroll value.** `FilmStage` runs one `requestAnimationFrame` loop that reads `scrollY`, works out "chapter index + progress", and hands it to the scene. Pinned chapters are tall tracks with a sticky stage; the loop turns their progress into a step number and toggles one class. Lenis smooths native scrolling and does nothing else: no snapping, no hijacking.

**The scene.** One `THREE.Points` with a hand-written shader. Eight formations are pre-built as buffers; only two are bound at a time and a uniform blends them, so chapter changes upload nothing. The camera follows a Catmull-Rom spline through two marks per chapter. In chapter 03 the scene projects its node positions and writes them to the label buttons, which is what keeps DOM and canvas aligned.

**Motion modes.** A small inline script in `<head>` (`THEME_BOOTSTRAP` in `ThemeToggle.tsx`) sets classes on `<html>` before first paint:

| Class | Meaning |
| --- | --- |
| `film-on` | Motion allowed: pinned chapters, reveals, camera travel |
| `film-static` | `prefers-reduced-motion`: every chapter fully expanded, no pinning, no intro, canvas redraws only on scroll with no drift |
| `film-intro` | First visit this session: play the 3-second intro (skippable by button, scroll, touch or key) |
| `cine` | Route is the film or a case study: page chrome uses the dark palette |
| (none) | JavaScript off: plain, fully readable document |

**Fallbacks and load order.**

- No WebGL, Save-Data on, or the scene throws: the CSS backdrop stays and nothing else changes.
- Desktop starts the scene when the browser is idle after the intro. Phones and machines with four or fewer cores start it on first touch or scroll (or after 7 s), with 9,000 points instead of 30,000 and a lower pixel ratio.
- If early frames are slow the scene halves its points and drops to 1x; if it is still slow it stops animating and redraws only on scroll.
- The loop stops when the tab is hidden or the canvas leaves the viewport.
- Sound is synthesised in the browser (four sine tones and filtered noise), off by default, and nothing is downloaded for it.

## 5. Open-source stack

| Package | Licence | Use |
| --- | --- | --- |
| three 0.187 | MIT | WebGL renderer, points, spline |
| lenis 1.3 | MIT | Smooth scrolling |
| next 15, react 19 | MIT | Framework (already in use) |
| tailwindcss 4 | MIT | Utility CSS (already in use) |
| lucide-react | ISC | Icons (already in use) |
| Big Shoulders, Newsreader | SIL OFL 1.1 | Type |
| rembg with the ISNet model | MIT / Apache-2.0 | Offline portrait cut-out |
| Playwright, axe-core | Apache-2.0 / MPL-2.0 | Screenshots and tests |

Considered and left out, with reasons (details in `docs/research/creative-tools-and-licences.md`): GSAP (free of charge but not an OSI licence; about 100 lines of own scroll code replaced it), React Three Fiber and drei (the scene is one object, so plain three.js is smaller), Theatre.js (dormant, studio is AGPL), Rive (proprietary editor), WebGPU (not needed for points). Google Veo and Gemini image generation have no free API tier, so no generated video or imagery is used and the site depends on no paid service.

## 6. Visual assets

| Asset | How it was made | Reproduce |
| --- | --- | --- |
| `public/media/portrait-cinematic.webp` | The existing studio portrait, background removed, re-graded to a warm monochrome with a red rim light. Tone only: no generative model touched the face | `python scripts/portrait-treatment.py public/dhrubo-portrait.jpg public/media/portrait-cinematic.webp` |
| `public/media/work/*.webp` | Unretouched Playwright screenshots of the four live sites, desktop and phone | `npm run capture` |
| Particle formations, grain, release chart | Generated in code | n/a |

## 7. Maintenance

```bash
npm install
npm run dev            # http://localhost:3000
npm run test:all       # lint, typecheck, unit, build, e2e
npm run github         # refresh the Sahkarmi numbers now (also runs before every build)
npm run capture        # re-take product screenshots after a product redesign
node tests/tools/film-shots.mjs      # a frame of every chapter into .film-shots/ (needs `next start -p 3100`)
node tests/tools/perf-metrics.mjs    # layout, style and script cost during load and idle
```

- **Edit copy** in `src/content/film.ts`. Career facts must match the CV.
- **Add a product to the reel**: add it to `projects.ts`, add its screenshots to `workMedia` in `film.ts`, add the slug to `REEL` in `page.tsx`.
- **Change a formation or camera move**: `buildFormations` and `MARKS` in `scene.ts`. Chapter order there must match `chapters` in `film.ts`.
- **GitHub numbers on Vercel**: the build calls the public API without a token. If it is rate-limited the committed snapshot is kept and the build log says so. Setting `GITHUB_TOKEN` on the Vercel project removes the limit; it is optional.
- When stopping a local `next start`, kill it by PID before rebuilding, or tests hit a stale build.

## 8. What was tested (12 Nov 2026, local production build)

| Check | Result |
| --- | --- |
| ESLint, TypeScript | Clean |
| Unit tests (Vitest) | 32 passed |
| End-to-end (Playwright, desktop Chrome and Pixel 7) | 74 passed, run three times |
| axe WCAG 2.1 AA on `/`, a case study, an article, `/ask`, `/contact`, `/resume` | No serious or critical violations |
| New film tests | Eight chapters in the HTML; intro skips and does not replay; pinned steps advance; method tabs; proof numbers match the snapshot and link out; reduced motion expands everything; readable with JavaScript off; no horizontal overflow; case-study screenshots |
| Visual pass | 24 frames each on desktop (1440x900) and Pixel 7, reviewed over three rounds |

**Lighthouse 13.6, three runs each, simulated throttling, on this machine:**

| | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 94, 98, 98 | 100 | 96 | 92 | 1.0 s | 0 to 150 ms | 0 |
| Mobile | 63, 73, 79 | 100 | 96 | 92 | 4.5 to 4.7 s simulated (0.9 s observed) | 240 to 720 ms | 0 |

For comparison, in the same conditions the unchanged `/about` page scored 90 on mobile and the current live homepage 85.

How to read the mobile number: the hero's largest element is now a portrait instead of a line of text, and Lighthouse's simulated model charges it for all main-thread work around first paint. The lab machine also has no GPU, so nothing can be said from it about frame rate on a real phone. The mobile score is lower than the page it replaces and that is a real cost of an image-led cinematic opening.

## 9. Limitations

1. **Not tested on physical devices.** All checks ran in desktop Chromium and emulated Pixel 7 with software WebGL. Frame rate on real phones, Safari and Firefox are unverified.
2. **Mobile lab performance dropped** from roughly 85 to 90 to roughly 63 to 79 on this machine.
3. **SEO 92 and best-practices 96 are unchanged from before**: the meta description is streamed for browsers (a consequence of the per-request CSP nonce) and one CSP report comes from Google Analytics.
4. **The preview is behind Vercel sign-in**, so it has not been measured from the public internet.
5. **No generated video, hand-drawn animation or collage.** Free tiers for Veo and Gemini imagery do not cover a repeatable build, and frame-by-frame work needs an illustrator. The film is code-drawn instead.
6. **Sahkarmi screenshots show the product website**, not the desktop app running. App captures would be stronger evidence.
7. **"About 650 Vitest cases" was counted on 2 Nov** and not recounted; the page says so.
8. **Zappy's status line is from 2 Nov** ("web live, API degraded"). The site still shows only a sign-in screen.
9. **Phone number**: set to +91 98740 76688 (the CV number) on 12 Nov 2026 on the owner's instruction; the WhatsApp link uses the same number.
10. **LinkedIn could not be read** (it blocks automated requests), so positioning comes from the CV.
11. Three of the four prototype repositories have failing CI, as their case studies state.

## 10. Site-wide stage (added 12 Nov 2026, second pass)

The first pass only restyled the homepage. The second pass puts every route on the same stage.

- **One scene for the whole site.** `SceneHost` in the root layout owns the fixed backdrop and the WebGL scene, so it survives navigation: moving between pages re-forms the same particles. `src/components/film/bus.ts` maps each route to a formation and a brightness (`sceneForRoute`). The homepage film drives the scene with scroll; other pages drift between their chapter's two camera marks as you scroll.
- **One look.** The light theme and its toggle are gone; the tokens in `globals.css` are the film palette. `film.css` is loaded globally.
- **Shared page grammar.** `PageHero` (numbered slate, poster headline with one serif phrase, outlined ghost word), `.card` (cursor light, red line on hover), `.plate` for long reading, `.section-title`, poster headings inside `.prose-site`, `.timeline`, `.showcase` rows with real screenshots on `/projects`, `.index-list` on `/writing`, a full-screen poster menu on phones, an end-card footer and a poster 404.
- **Transitions.** `src/app/template.tsx` replays a red wipe on each navigation; content reveals on scroll (`data-reveal`, only when JavaScript runs and motion is allowed).
- **Phones.** Checked at 320, 412 and 768 px wide: no horizontal overflow, the assistant launcher is icon-only, pinned chapters fit short screens.
- **SEO untouched.** `node tests/tools/seo-parity.mjs` compares title, description, canonical, robots, Open Graph, Twitter card, JSON-LD types and h1 count for every sitemap URL against the live site, plus robots.txt, llms.txt, the feed, verification files and redirects. Result before release: 22 of 22 URLs identical, sitemap identical.
- **Tests.** 92 Playwright tests (was 74). Playwright is limited to 3 workers because every page now runs the scene, which is software-rendered in headless Chromium.
