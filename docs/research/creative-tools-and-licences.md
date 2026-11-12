# Creative tools and licences: evaluation for the scroll-driven WebGL site

Research date: 12 November 2026. Target stack: Next.js 15, React 19, TypeScript, Tailwind 4, Vercel.
Owner constraints: open-source dependencies with verified licences, no paid plugins, no dependence on paid AI services.

## How this was checked

- **Licence and activity**: GitHub API (`repos/<owner>/<repo>`, licence file contents) and the npm registry (`npm view <pkg> version license`), queried today.
- **Bundle weight**: Bundlephobia API, whole-package minified / gzipped. These are upper bounds; tree-shaking reduces them (a lot for three, drei, lucide-react, motion).
- **Model licences**: Hugging Face model API (licence tags and licence names).
- **Google pricing**: Google's own pages (AI Studio pricing, deprecations and video docs; Flow and Vids help pages; Google AI plans page).
- Anything not confirmed from a primary source today is marked **unverified**.

"OSI" below means the licence is approved by the Open Source Initiative. "Source-available" means the code is readable but the licence is custom or restrictive.

## Headline findings

1. **GSAP is free of charge but not open source.** Its licence is a custom Webflow licence with a prohibited-use clause, a discretionary termination clause and an amendment clause. It fails the owner's "open-source with verified licence" rule. Details in the GSAP section.
2. **Veo is no longer in the Gemini API.** All Veo models there are shut down (Veo 3.1 previews on 22 October 2026). The replacement is Gemini Omni Flash, which has **no free API tier**. Free video generation exists only as small consumer allowances in Flow and Vids.
3. **Gemini image generation has no free API tier** either. Every image model on the pricing page shows free tier "Not available".
4. **The whole site runtime can be built on OSI licences** (MIT, ISC, Zlib, OFL) with no loss of capability for this brief.
5. **Theatre.js is dormant** (last commit April 2024, last npm publish May 2024) and its studio is AGPL-3.0. Not recommended.
6. **"givemotion" exists**: a two-week-old MIT code-to-video CLI for AI agents. It is a video renderer, not a web animation library, and is not relevant to the site runtime.

## Licence table

### 3D and graphics

| Tool | Version checked | Licence | OSI open source? | Maintenance | Size (min / gzip) | Fit |
|---|---|---|---|---|---|---|
| three.js | 0.187.0 (r187, 30 Oct 2026) | MIT | Yes | Very active (commits today) | 742 kB / 186 kB whole; tree-shakes | Core choice |
| React Three Fiber (`@react-three/fiber`) | 9.8.2 | MIT | Yes | Active (Oct 2026) | 183 kB / 58 kB | Recommended; v9 is the React 19 line |
| drei (`@react-three/drei`) | 10.7.9 | MIT | Yes | Active (Oct 2026) | 1.68 MB / 521 kB whole; import only what is used | Optional; pull in individual helpers only |
| postprocessing (pmndrs) | 6.39.6 | Zlib | Yes | Active (Nov 2026) | 327 kB / 113 kB whole | Optional; WebGL only |
| `@react-three/postprocessing` | 3.2.2 | MIT | Yes | Active (Oct 2026) | not measured | Optional wrapper |
| Theatre.js `@theatre/core`, `@theatre/r3f` | 0.7.2 | Apache-2.0 | Yes | **Dormant**: last commit 11 Apr 2024, last publish May 2024 | core 100 kB / 31 kB | Avoid |
| Theatre.js `@theatre/studio` | 0.7.2 | AGPL-3.0-only | Yes (strong copyleft) | Dormant | not shipped | Dev-only tool; must never be bundled into production |
| OGL | 1.0.11 | Unlicense (public domain) | Yes | Slow: last commit Apr 2025 | 131 kB / 34 kB whole (README claims ~29 kB total) | Viable lightweight alternative; no React layer |
| Blender | current | GPL (GNU GPL, per repo `COPYING`; "GPL-2.0-or-later" is **unverified** today) | Yes | Very active | desktop tool | Recommended for asset authoring |

### Animation and scroll

| Tool | Version checked | Licence | OSI open source? | Maintenance | Size (min / gzip) | Fit |
|---|---|---|---|---|---|---|
| GSAP (core, ScrollTrigger, SplitText, all plugins) | 3.15.1 | Custom: "Standard 'no charge' license" (Webflow). No LICENSE file in repo; README says "All rights reserved" | **No**: source-available, free of charge | Active (Nov 2026) | core 71 kB / 27 kB; plugins extra | Technically excellent; fails the licence rule |
| Motion (`motion`, formerly Framer Motion) | 14.12.0 | MIT | Yes | Very active (commits today) | 185 kB / 63 kB whole; tree-shakes | Recommended for DOM animation |
| Motion+ | n/a | Paid, one-time (US$399 per page metadata) | No | n/a | n/a | Do not use; `splitText`, Ticker, Cursor, AnimateNumber and others are paid-only |
| Lenis | 1.3.27 | MIT | Yes | Active (Nov 2026) | 19 kB / 5.5 kB | Recommended for smooth scroll |
| anime.js | 4.5.0 | MIT | Yes | Active (Nov 2026) | 117 kB / 41 kB whole; modular | Good OSI alternative to GSAP timelines |
| lottie-web | 5.13.0 | MIT | Yes | Slow: last commit Nov 2024, last publish May 2025 | 306 kB / 77 kB | Only if Lottie files are needed |
| dotLottie (`@lottiefiles/dotlottie-web`) | 0.83.2 | MIT | Yes | Very active (commits today) | 161 kB / 31 kB JS, plus a WASM file not counted here | Preferred Lottie player if needed |
| Rive runtime (`@rive-app/canvas`, rive-runtime) | 2.50.0 | MIT | Yes | Very active | 345 kB / 87 kB | Runtime is open; depends on a proprietary editor |
| Rive editor | n/a | Proprietary SaaS. Free plan ships with a Rive splash screen; removal needs Cadet (US$9 per seat per month) or higher | No | n/a | n/a | Avoid: authoring depends on a closed, partly paid tool |
| Motion Canvas | 3.17.2 | MIT | Yes | Slow: last commit Jul 2026, last publish Feb 2025 | n/a | Offline video tool, not a site runtime |
| HyperFrames (HeyGen) | 0.9.38 | Apache-2.0 | Yes | Very active (commits today) | n/a | HTML-to-video renderer; useful for promo clips, not the site |
| givemotion | 0.1.5 | MIT | Yes | Brand new: repo created 27 Oct 2026, 38 stars, single maintainer | n/a | HTML-to-MP4 CLI for AI agents; too young to rely on; not a site runtime |

### Image and video production

| Tool | Licence | OSI open source? | Notes |
|---|---|---|---|
| ComfyUI (v0.45.0, 10 Nov 2026) | GPL-3.0 | Yes | Local node-based pipeline; very active. GPL covers the tool, not the images made with it |
| SDXL base 1.0 | CreativeML Open RAIL++-M | No (use restrictions), but free for commercial use | Most permissive of the Stability family |
| Stable Diffusion 3.5 Large / Medium | Stability AI Community License | No | Free commercial use only under US$1M annual revenue; user owns outputs; gated download |
| FLUX.1 [schnell] | Apache-2.0 | Yes | Safe choice |
| FLUX.1 [dev] | FLUX.1 [dev] Non-Commercial License | No | Model use is non-commercial. Terms on commercial use of outputs are **unverified**; treat as not cleared |
| FLUX.2 [dev] | FLUX Non-Commercial License | No | Same caution |
| FLUX.2 [klein] 4B | Apache-2.0 | Yes | Safe choice |
| FLUX 3 image klein (Oct 2026) | "flux-kommunity-license" (custom) | No | Terms **unverified** |
| Wan 2.1 (T2V 14B) | Apache-2.0 | Yes | Open weights |
| Wan 2.2 (T2V/I2V A14B, TI2V 5B) | Apache-2.0 | Yes | Open weights; the 5B model is the realistic one for consumer GPUs |
| Wan 2.5 / 2.6 | No public weights found on Hugging Face | n/a | Open-weight status **unverified**; appears to be hosted/API only |
| FFmpeg | LGPL-2.1-or-later by default; GPL-2.0-or-later if built with `--enable-gpl` | Yes | Most prebuilt Windows binaries are GPL builds; fine for a build-time tool |
| OpenToonz | BSD-3-Clause (third-party parts under their own licences) | Yes | Active |
| Blender Grease Pencil | Part of Blender, GPL | Yes | 2D animation inside Blender |

Open alternatives to Rive for vector animation: dotLottie/Lottie (MIT players), Synfig (GPL-3.0, active), Blender Grease Pencil, or hand-written SVG animated with Motion.

### UI

| Tool | Version checked | Licence | OSI open source? | Notes |
|---|---|---|---|---|
| Tailwind CSS | 4.3.5 | MIT | Yes | Very active. Tailwind Plus (paid templates) is separate and not needed |
| shadcn/ui (`shadcn` CLI) | 4.23.0 | MIT | Yes | Code is copied into the repo, so no runtime dependency |
| Radix UI (`radix-ui`) | 1.8.1 | MIT | Yes | Active (Oct 2026) |
| Lucide (`lucide-react`) | 1.72.0 | ISC (Feather-derived icons under MIT) | Yes | 838 kB / 211 kB whole; per-icon imports tree-shake to a few hundred bytes each |
| Google Fonts variable fonts | n/a | Mostly SIL OFL 1.1; a few are Apache-2.0 or UFL | Yes | Check each family's licence on its page; self-host through `next/font` |

## Notes by area

### three.js, WebGPU and TSL

- `WebGPURenderer` is imported from `three/webgpu` and TSL from `three/tsl`. It falls back to a WebGL2 backend when WebGPU is unavailable (a `getFallback` hook is present in `Renderer.js` in r187).
- The r180 to r187 migration notes show continuing breaking changes in WebGPURenderer and TSL (renamed TSL functions, async methods deprecated in r181, storage-buffer changes in r187). It is usable but still moving.
- Custom GLSL `ShaderMaterial` / `RawShaderMaterial` and the pmndrs `postprocessing` library target `WebGLRenderer`. That WebGPURenderer does not accept GLSL materials is long-standing behaviour but was **not re-verified** against r187 docs today (the manual page returned 404).
- Browser support (caniuse, today): Chrome and Edge 113+, Safari 26+ on iOS, Safari 26+ on macOS listed as partial, Samsung Internet 24+. Firefox is listed as not enabled by default; whether it is on for specific platforms is **unverified**. Global coverage about 88.6%.
- **Verdict**: use `WebGLRenderer` with GLSL for this project. The brief calls for custom GLSL particles, WebGL2 reaches effectively every device, and nothing here needs compute shaders. Revisit WebGPU/TSL later.

### GSAP licence verdict

Source: https://gsap.com/standard-license (effective 30 April 2025, last modified 30 May 2025), the GSAP GitHub repo and the npm `license` field.

- Free of charge for commercial sites, including every formerly paid plugin (SplitText, MorphSVG). ScrollTrigger is covered by the "related plugins" definition.
- **Not OSI open source.** The repo has no LICENSE file; the README says "All rights reserved" and points to the Webflow licence.
- **Prohibited use**: tools that let users build visual animations without code, or anything that competes with Webflow's animation-building features.
- **Termination**: "Webflow may terminate this GSAP License and revoke your access in its discretion"; on termination you must stop using it and destroy copies.
- **Amendment**: Webflow can revise the licence at any time by posting new terms. Earlier versions stay under the terms that applied to them, if you reject a revision.
- A personal-brand site is a permitted use, so using GSAP would be legal and free. It still breaks the owner's stated rule, and it adds a single-vendor revocation risk that MIT code does not have.
- **Verdict**: do not use GSAP. Everything this brief needs from it (scroll progress, scrubbed timelines, text splitting) is small enough to hand-roll or cover with Motion and Lenis.

### Motion

- The `motion` package is MIT. Motion+ is a paid add-on, and `splitText` sits behind it, so text splitting must be hand-rolled (about 30 lines) or done with CSS.
- `scroll()` and `useScroll` are part of the MIT package to my knowledge, but the Motion+ page did not state this either way: **unverified** today. The recommended stack below does not depend on them.

### Google AI: Veo, Omni and Gemini image generation

What exists now:

- **Veo in the Gemini API / AI Studio: shut down.** Veo 2.0 and 3.0 ended 30 June 2026; Veo 3.1, 3.1 Fast and 3.1 Lite previews ended 22 October 2026. Google's stated replacement is `gemini-omni-1.2-flash` (released 5 November 2026), or "GA Veo models on Gemini Enterprise Agent Platform" (the enterprise cloud route, formerly Vertex AI). Vertex pricing for those Veo models is **unverified** (the pricing page did not load).
- **Veo 3.1 still exists in consumer tools.** Flow lists Veo 3.1 Lite, Fast and Quality; Fast and Quality are scheduled to retire on 5 December 2026, leaving Veo 3.1 Lite and Omni Flash 1.2.
- **Gemini app**: Google's plan page lists Omni Flash as the video model for paid plans. The help page shows video generation with a different icon for accounts without a plan, which suggests it is not included for free, but the page does not say so outright: **unverified**.

What is free:

| Route | Free allowance | Source |
|---|---|---|
| Gemini API / AI Studio, video (Omni Flash) | **None.** Free tier "Not available" | AI Studio pricing page |
| Gemini API / AI Studio, images (all Nano Banana models) | **None.** Free tier "Not available" | AI Studio pricing page |
| Flow, no subscription | 50 credits per day, no rollover. Omni Flash 1.2 costs 1 credit per second at 360p and 3 per second at 720p; Veo 3.1 Lite costs 10 credits per clip. That is roughly 16 seconds of 720p or five Veo 3.1 Lite clips a day | Flow help page |
| Google Vids, personal account | 60 seconds of AI video clips per month and 50 credits per month (1 credit per image action). A second help page says "most users can generate up to 50 videos per month"; the two pages conflict | Vids help pages |
| Gemini app, images | Image generation (Nano Banana 2) is listed for accounts without a plan at "standard limits"; no number is published | Gemini help page |

What is paid:

| Item | Price |
|---|---|
| Gemini Omni 1.2 Flash (API) | US$12 per 1M video output tokens; about $0.023/s at 360p, $0.07/s at 720p, $0.104/s at 1080p, $0.209/s at 4K |
| Gemini Nano Banana 2.1 (API) | About $0.034 per 1K image, $0.050 per 2K, $0.113 per 4K; batch is half |
| Gemini 3.1 Flash Image (Nano Banana 2) | About $0.067 per 1K image, $0.101 per 2K, $0.151 per 4K |
| Gemini 3 Pro Image (Nano Banana Pro) | $0.134 per 1K/2K image, $0.24 per 4K |
| Gemini 2.5 Flash Image (deprecated, ends 15 Mar 2027) | $0.039 per image |
| Imagen 4 | Shut down 17 August 2026 |
| Google AI Plus / Pro / Ultra | 200 / 1,000 / 10,000 or 25,000 Flow credits per month. Plan prices did not render on Google's page; third-party reports of $4.99, $19.99, $99.99 and $199.99 are **unverified** |

**Verdict**: Google video and image generation cannot be a dependency of this project under the owner's rules. The API is paid-only, and the free consumer allowances are small, change often and come with usage terms rather than a licence. They are fine for an occasional hand-made hero clip (the owner already uses Vids for video hooks), with the output committed to the repo as a static asset. For a repeatable free pipeline use ComfyUI with FLUX.1 [schnell] or FLUX.2 [klein] 4B for images and Wan 2.2 for video, all Apache-2.0, subject to local GPU capacity.

## Recommended minimal stack

Goal: scroll-scrubbed camera through one persistent WebGL scene, custom GLSL particles, DOM typography on top, smooth scrolling.

| Layer | Choice | Licence |
|---|---|---|
| Renderer | `three` with `WebGLRenderer` | MIT |
| React binding | `@react-three/fiber` v9, one `<Canvas>` mounted in the root layout, `position: fixed`, so it persists across routes | MIT |
| Particles | `THREE.Points` with a hand-written GLSL `ShaderMaterial`; uniforms `uTime` and `uProgress` | own code |
| Camera path | `CatmullRomCurve3` sampled by scroll progress inside `useFrame`, with damping | own code |
| Smooth scroll | `lenis` (`lenis/react`) | MIT |
| Scroll progress | Hand-rolled: read Lenis `scroll` / `limit` into a ref (no React state), consume in `useFrame` | own code |
| DOM animation | `motion` for reveals and typography; hand-rolled text splitter | MIT |
| UI | Tailwind 4, shadcn/ui, Radix, `lucide-react` | MIT / ISC |
| Fonts | One or two OFL variable fonts through `next/font` | OFL 1.1 |
| Assets | Blender for models and baked paths; FFmpeg for video encodes | GPL / LGPL (tools only, nothing shipped) |

Optional, add only when needed: individual drei helpers; `postprocessing` (Zlib) for bloom or grain; `anime.js` (MIT) if a GSAP-style timeline API becomes necessary.

Leave out: GSAP, Motion+, Theatre.js, Rive, lottie-web, WebGPURenderer/TSL.

Implementation notes:

- Load the canvas with `next/dynamic` and `ssr: false` so three.js stays out of the first HTML payload; expect roughly 150 to 250 kB gzip of 3D code after tree-shaking (**estimate**, not measured).
- Honour `prefers-reduced-motion`: disable Lenis smoothing and jump the camera between keyframes.
- Cap device pixel ratio at 2 and scale particle count down on mobile.
- Keep typography in the DOM for SEO and accessibility; the canvas is decorative and should be `aria-hidden`.

### GSAP or fully OSI?

Stay fully OSI. Motion, Lenis and about 100 lines of scroll-progress and text-splitting code cover this brief. The cost is writing the scrub and pinning logic by hand instead of using ScrollTrigger; the benefit is a dependency list that is entirely MIT/ISC/Zlib/OFL with no revocable licence. If a later section needs complex nested timelines, reach for anime.js v4 before reconsidering GSAP.

## Items still unverified

- Blender's exact SPDX identifier (repo says "GNU General Public License"; blender.org licence page returned 403).
- That `WebGPURenderer` in r187 still rejects GLSL `ShaderMaterial`; Firefox per-platform WebGPU status.
- Whether Motion's `scroll` / `useScroll` remain in the MIT package.
- FLUX.1 [dev], FLUX.2 [dev] and FLUX 3 klein output-use terms; Wan 2.5 / 2.6 open-weight status.
- Veo pricing on the enterprise cloud platform; Google AI plan prices; whether the free Gemini app allows any video generation; which of the two Vids free limits is current.
- Post-tree-shaking bundle size of the recommended stack.

## Sources

- GitHub API and LICENSE files for each repository listed; npm registry metadata (12 Nov 2026)
- https://gsap.com/standard-license
- https://aistudio.google.com/docs/pricing , https://aistudio.google.com/docs/deprecations , https://aistudio.google.com/docs/video
- https://support.google.com/flow/answer/16526234 , https://support.google.com/docs/answer/15609411 , https://support.google.com/docs/answer/16143507 , https://support.google.com/gemini/answer/16275805
- https://one.google.com/about/google-ai-plans/
- https://caniuse.com/webgpu , https://github.com/mrdoob/three.js/wiki/Migration-Guide
- https://motion.dev/plus , https://rive.app/pricing
- Hugging Face model API (black-forest-labs, stabilityai, Wan-AI); SD 3.5 `LICENSE.md`
- Bundlephobia API
