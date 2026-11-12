# Cinematic, scroll-driven WebGL sites: a pattern study

Research date: 12 November 2026. Purpose: grounding for the dhrubo.shop rebuild (Next.js 15, React 19): dark thriller atmosphere, controlled red accent, film grain, bioluminescent particles, one continuous camera journey through 8 chapters.

This is a study of patterns, not a source of designs to copy. Nothing here should be reproduced visually.

## How to read the evidence labels

- **Verified**: I read it on the primary page in this pass (the site's Awwwards entry, an Awwwards case study written by the makers, the maker's own blog, a GitHub repo or licence file).
- **Secondary**: reported by a search summary or third-party article; I did not open the primary page.
- **Unverified**: I could not confirm it. Treat it as a lead, not a fact.

Limits of this pass:

- I did not load any of the sites in a real browser, so nothing below is a first-hand observation of motion, sound or mobile behaviour. Every reference URL returned HTTP 200 on 12 Nov 2026 except locomotive.ca, which returned 403 to an automated request (probably bot protection, not confirmed).
- Codrops (tympanus.net) returned 403 to my fetcher, so its case studies are cited only at Secondary level from search summaries.
- Awwwards entries rarely list typefaces. Where a typeface is not named below, it is because I could not confirm it.

---

## 1. Reference sites

### 1. Igloo Inc — https://www.igloo.inc/
- **Won (Verified):** Awwwards Site of the Day, 23 Jul 2024 (7.92/10); Awwwards Site of the Year 2024 and Developer Site of the Year 2024. Built by Abeto with Bureaux.
- **Awwwards dev scores (Verified):** Animations/Transitions 9.60, WPO 8.00, Responsive 8.40, but Semantics/SEO 6.60, Accessibility 6.60, Markup/Meta-data 6.40.
- **Stack (Verified, makers' case study):** Three.js, three-mesh-bvh, Svelte, GSAP, Vite, vanilla JS; assets in Houdini and Blender. Custom tooling: in-browser live editing of shaders, textures and models; a VDB-to-browser volume exporter; custom geometry exporters.
- **Scroll:** three scrollable sections; the jury praised "an immersive 3d experience with an easy to navigate, scroll interaction". The case study does not explain how scroll maps to the camera.
- **Transitions (Verified):** chromatic aberration, a "tech displacement" and a frost effect; the same chromatic aberration is reused on materials so transitions and scenes share one visual language.
- **Particles (Verified):** an interactive particle simulation that swirls into a different shape per selected link; particles change colour with speed and glow as they morph; volume data shipped in a compressed format smaller than a typical web image.
- **Type and UI (Verified):** the UI is rendered in WebGL, not HTML. Text scramble is done by shifting the offset of an SDF texture, which avoids browser style recalculation.
- **Sound (Verified):** music and effects supplied by Bureaux and synced to particle motion.
- **Performance (Verified):** real-time intro instead of video, to save file size; shaders and textures compile during initial load and in the background; settings tuned for low-end devices.
- **Lesson:** the visual ceiling. Also the clearest warning: an all-WebGL UI is what produced the 6.6 accessibility and SEO scores.

### 2. Bruno Simon — https://bruno-simon.com/
- **Won:** 2019 version: Awwwards Site of the Day 11 Nov 2019 and Site of the Month Nov 2019 (Secondary, Awwwards pages surfaced in search); Developer Site of the Year in the 2019 annual awards (Secondary). 2025 version: Site of the Month January 2026 (Secondary). FWA: not found.
- **Stack (Verified, his Awwwards case study, March 2026):** Three.js, running on WebGPU automatically when available; shaders written in TSL; the whole world authored in Blender, with object names driving behaviour in code. Rapier physics and Howler audio are Secondary (a third-party summary of the MIT-licensed repo brunosimon/folio-2025).
- **Performance (Verified):** instancing for repeated objects; grass as one geometry of about 78,400 triangles; frustum culling; hidden faces removed and geometries merged; one palette texture for colour; ETC1S and UASTC texture compression; Draco for models.
- **Mobile (Verified):** a lower quality preset; water blur and depth of field are disabled; shadow map resolution is reduced.
- **Sound (Verified):** three CC0 music tracks; spatialised object sounds; ambient layers; one UI click sound with varied playback rate.
- **Lesson:** quality tiers are explicit presets, and the expensive post effects (blur, depth of field) are the first things dropped on mobile.

### 3. Lusion v3 — https://lusion.co/
- **Won (Verified):** Awwwards Site of the Day, 2 Oct 2023 (8.25/10); Dev Award 8.41 with Animations/Transitions 10.00, WPO 9.00, Accessibility 7.40, Semantics/SEO 7.60. Site of the Year 2023 and Developer Site of the Year 2023 (Secondary, Awwwards annual pages).
- **Colour (Verified):** Awwwards lists a two-colour palette: #1a2ffb and #f0f1fa. One saturated accent on a near-white field.
- **Stack:** WebGL is confirmed (Secondary, Cannes Lions entry: "HTML5, CSS3, and WebGL"). Framework, scroll library and typeface: Unverified.
- **Lesson:** the top animation score sits beside a 9.0 performance score. Restraint in palette (two colours) is part of why the 3D reads as premium.

### 4. Active Theory v6 — https://activetheory.net/
- **Won (Verified):** Awwwards Site of the Day, 6 Feb 2024 (7.95/10); Dev Award 7.92; Accessibility 6.40, Semantics/SEO 7.20.
- **Described as (Verified):** "V6 brings new rendering techniques, AI chat and multiplayer to our growing portfolio."
- **Stack:** the studio has built its own framework, Hydra, since 2012, including a 3D engine tuned for GPU throughput with low CPU use (Secondary, the studio's Medium posts). Whether v6 runs on Hydra: Unverified, though likely.
- **Lesson:** another full-canvas site with a low accessibility score. The pattern repeats.

### 5. Basement Studio — https://basement.studio/
- **Won:** no award for the studio's own site was found. Their Next.js Conf work lists an Awwwards Developer Award and Site of the Day (Secondary).
- **Stack (Verified, package.json of github.com/basementstudio/website-2k25):** Next.js 16.3.0, React 19.2.7, three ^0.180, @react-three/fiber 9.0.0-rc.6, drei 10 rc, @react-three/rapier, @react-three/uikit, @react-three/offscreen, tunnel-rat, zustand 5, motion 12, Tailwind 3, Sanity, r3f-perf and leva for tuning, react-device-detect and isbot. No GSAP, no Lenis and no postprocessing package are listed, so effects are presumably hand-written shaders (inference).
- **Licence:** no LICENSE file was visible in the repo listing, so read it for architecture only; do not reuse code.
- **Lesson:** the closest stack match to dhrubo.shop. Worth noting: `tunnel-rat` (portal DOM-declared content into one persistent canvas), `@react-three/offscreen` (render in a worker), `isbot` (serve crawlers without the 3D), and device detection for tiers.

### 6. Aristide Benoist — https://aristidebenoist.com/
- **Won:** Awwwards Site of the Month, June 2021, for Portfolio 2021 with designer Jon Way (Verified); Site of the Day 11 Oct 2017 for an earlier version and Independent of the Year 2023 (Secondary).
- **Stack (Verified):** built "from scratch: no libraries and frameworks used"; HTML, CSS, PHP, JS; custom bundler (Rollup, PostCSS, CSSO); homepage images drawn with the raw WebGL API; about 67 KB of JavaScript for the whole site before gzip.
- **Typography (Verified):** Timmons, a bold compressed display face by Matt Willey (commercial, not open). Each of the 28 project titles is set with a different letter position, so type alone gives each case study its own composition.
- **Scroll (Verified):** scroll-jacking is deliberately avoided; navigation is click and keyboard based; interactions "never paralyze user interactions".
- **Lesson:** a compressed display face used as the main graphic element, plus a tiny JS budget, beats heavy 3D for perceived craft.

### 7. Obys — https://obys.agency/
- **Won:** earlier agency site, Awwwards Site of the Day 9 Jan 2020 (Secondary); Awwwards Studio of the Year 2023 (Verified as the studio's claim on its Awwwards article). No award confirmed for the 2026 redesign.
- **Stack (Verified, Awwwards article of 1 Jul 2026):** custom codebase served and bundled with Bun; React used only as a server-side templating engine with no client rendering; interactions and routing in TypeScript; in-house animation system on requestAnimationFrame and the Web Animations API; some visuals in native WebGL; Strapi; plain CSS. Principle: "use only what is necessary and stay in control of every detail."
- **Typography (Verified):** the redesign began with type: a custom neo-grotesque, OTF Obys NG, which sets hierarchy, spacing and rhythm.
- **Motion (Verified):** "It's not decorative. It helps explain the idea and keeps the experience consistent across the site." Virtual scrolling; SPA page transitions; an opening that moves from dark to light.
- **Lesson:** server-rendered HTML first, motion layered on top. Type decided before anything else.

### 8. Henri Heymans — https://www.henriheymans.com/
- **Won (Verified):** Awwwards Site of the Day, 25 Feb 2025 (7.52/10); Dev Award 7.17.
- **Colour (Verified):** pure black and white only (#000000, #FFFFFF).
- **Patterns (Secondary):** WebGL horizontal-scroll gallery with cursor interaction, a loading animation, project detail views. Stack and typeface: Unverified.
- **Lesson:** a personal site can win with a two-value palette if motion and type are disciplined.

### 9. Locomotive — https://locomotive.ca/
- **Won (Verified):** Awwwards Site of the Month, June 2019.
- **Stack (Verified):** locomotive-scroll v2, GSAP, Three.js, Hammer.js for touch and drag, native canvas; a shader for a fluid flag effect; page transitions by their own modularLoad; in-house PHP CMS.
- **Scroll (Verified):** lerp-based smoothing "to get a smooth feeling across the site". Their library popularised this approach; Lenis is the current successor in the same role.
- **Performance and mobile (Verified):** aggressive Cloudflare caching; dedicated mobile pages rather than a shrunk desktop.
- **Lesson:** mobile was designed as its own experience, not a degraded one.

### 10. Dogstudio — https://dogstudio.co/
- **Won (Verified):** Awwwards Site of the Month, April 2019.
- **Stack (Verified):** Three.js and TweenMax for one animated 3D dog; WordPress for content; sound design as a named layer.
- **Lesson (Verified):** the team called the 3D integration "a real challenge" for performance and tuned for the devices in their analytics. One hero 3D subject, with ordinary CMS-driven HTML around it. The current site may differ from the 2019 build (Unverified).

### 11. Stripe globe — https://stripe.com/blog/globe
- **Won:** none claimed. Engineering write-up by Stripe (Verified).
- **Implementation (Verified):** Three.js; `WebGLRenderer({ antialias: false, alpha: true })` because disabling antialiasing helped on all devices; about 60,000 dots cut to about 20,000 by rendering only relevant ones; a custom fragment shader for twinkle; arcs revealed with `setDrawRange`.
- **Performance rules (Verified):** a hard 60 fps target; scroll handler throttled to 16 ms; other animations paused while the user scrolls; all animation stopped once the globe leaves the viewport; a static image planned as the fallback if 60 fps could not be held.
- **Lesson:** the budget and the fallback were decided before the effect. Stop the loop when off screen.

### 12. Linear — https://linear.app/
- **Won:** none claimed.
- **Typography (Verified, Linear's own post):** Inter Display for headings "to add more expression to our headings while maintaining their readability"; regular Inter for everything else.
- **Colour (Verified):** themes generated in LCH rather than HSL, because equal lightness looks equal; three inputs (base, accent, contrast) instead of 98 variables; a contrast variable that produces high-contrast themes automatically.
- **Homepage:** described by third parties as typography and whitespace with little scroll effect (Unverified).
- **Lesson:** build the dark palette in a perceptual space (OKLCH in CSS today) with one accent, and get a high-contrast variant for free.

### 13. Apple product pages — https://www.apple.com/airpods-pro/
- **Won:** not checked.
- **Pattern (Secondary, CSS-Tricks tutorial and GSAP forum; Apple has not published its method):** a canvas pinned in the viewport inside a tall spacer (for example 500vh); scroll progress mapped to a frame index; pre-rendered frames (often 60 to 180) drawn to the canvas; frames preloaded, with smaller sets on some devices.
- **Lesson:** "cinematic" does not have to mean real-time 3D. A pre-rendered sequence scrubbed by scroll gives film-quality lighting at a fixed cost, and is a valid fallback tier for a chapter that is too heavy on phones.

### 14. Rauno Freiberg — https://rauno.me/
- **Won:** none claimed. Staff Design Engineer at Vercel (Secondary).
- **Principles (Verified, his essay "Invisible Details of Interaction Design"):** animate by frequency and novelty ("When so commonly executed, the interaction novelty is also diminished"); gestures must respond immediately; interactions must be interruptible, not animations the user waits out; motion should explain spatial relationships (where a thing comes from).
- **Lesson:** the rule set for the DOM layer: navigation, links, the contact form. Rare moments get cinema; frequent actions get speed.

### 15. Resn — https://resn.co.nz/
- **Won:** the 2016 redesign took the first "FWA of the Day", an Awwwards Site of the Day and a CSSDA Website of the Day (Secondary, NZ press). Resn's Pioneer "Corn Revolutionized" won Awwwards Site of the Year (Secondary); for that project Resn rendered most UI and text in WebGL.
- **Current homepage implementation:** Unverified.

### 16. "They Call Me Giulio" cinematic cyberpunk portfolio — Codrops case study, 14 Apr 2026
- **Won:** Unverified. Site URL not confirmed.
- **Patterns (Secondary, search summary only):** moved from a wrapper to plain Three.js for rendering control; GSAP timelines animate material uniforms; Lenis handles page scroll; several render targets (a multi-pass pipeline). A sibling Codrops piece ("More Than a Portfolio", 28 Apr 2026) uses Three.js, GSAP ScrollTrigger, Observer and SplitText, Blender-baked lighting and KTX2 textures. Another Codrops tutorial exports a camera curve from Blender as JSON and advances the camera along it with scroll.
- **Lesson:** the nearest published relatives of the planned build. Read both in a browser before starting.

### Considered but not usable as evidence
- **Samsy** (https://samsy.ninja/): live; Awwwards lists the portfolio with webgl, webgpu and threejs tags (Secondary). No specific award confirmed.
- **Unseen Studio** (https://unseen.co/): live; WebGL case studies exist on Codrops (Secondary). Nothing verified about the studio site itself.
- **Monopo London** (https://monopo.london/): live; no Site of the Day found for the London site. The 2017 Site of the Day belongs to the Tokyo portfolio (Secondary).
- **Cuberto** (https://cuberto.com/): live; not researched.

---

## 2. What the evidence says, by topic

| Topic | What the strongest sites do | Source |
|---|---|---|
| Typography | Decide type first (Obys). One compressed display face as the main graphic device (Aristide Benoist). Display cut for headings, text cut for everything else (Linear). | Verified |
| Colour | Two or three values: Lusion (blue + near-white), Heymans (black + white), Igloo (two greys). Perceptual colour space for themes (Linear). | Verified |
| Camera | Authored in a DCC tool and exported as a curve; scroll advances position along it. | Secondary |
| Lighting | Baked in Blender; real-time lights kept minimal; shadows reduced on mobile (Bruno Simon). | Verified / Secondary |
| Particles | GPU-simulated, colour tied to velocity, shape morphs between targets, compact data formats (Igloo). | Verified |
| Scroll | Native scroll kept, smoothed by lerp (Locomotive, Lenis). Scroll-jacking avoided (Aristide Benoist). | Verified |
| Transitions | One shared effect vocabulary reused across scenes and materials (Igloo). | Verified |
| Sound | Optional layer, synced to motion, few UI sounds with pitch variation (Igloo, Bruno Simon). | Verified |
| Mobile | Named quality presets; drop blur, depth of field and shadow resolution first; or separate mobile pages. | Verified |
| Fallback | Static image if the frame budget fails; stop rendering off screen (Stripe). | Verified |
| Reduced motion | Lenis disables smoothing by default under prefers-reduced-motion and exposes a flag for your own animations. None of the award case studies I read mentions reduced motion at all. | Verified |

---

## 3. Transferable principles for the dhrubo.shop build

1. **Text lives in the DOM; the canvas is atmosphere.** Keep every chapter's words as server-rendered HTML above one fixed canvas. The all-WebGL sites score about 6.4 to 6.6 on accessibility and SEO at Awwwards (Igloo, Active Theory); Lusion, which scores higher, still tops out at 7.4. Since the site exists to get an engineer found and hired, the text cannot be inside the canvas.
2. **One persistent canvas, one renderer, for the whole journey.** Mount it once in the root layout so it survives route changes; pass scene content into it from pages (the `tunnel-rat` pattern in Basement's stack). This is what makes a "one-take" possible: there is no scene reload to hide.
3. **Camera on an authored spline, scrubbed by scroll progress.** Author the 8-chapter path as one curve (Blender export or a CatmullRom curve), map total scroll progress 0 to 1 onto it, and damp the camera toward the target each frame so it is smooth but never detached from the scrollbar. Chapters are ranges on that single progress value.
4. **Native scroll, smoothed; never hijacked.** Use Lenis (MIT; keeps native scroll so `position: sticky` works) with GSAP ScrollTrigger driven from one ticker: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t => lenis.raf(t * 1000))`. Do not snap, do not lock, do not force a chapter to finish. GSAP's pricing page states the whole library, plugins included, is free; read its terms before shipping.
5. **Type is the hero; decide it before the 3D.** One condensed display face at very large scale carries the thriller tone; the 3D sits behind and between. Animate type by line or word reveal tied to chapter entry, not by per-letter effects on body copy.
6. **A strict palette: near-black, off-white, one red.** Every top reference uses two or three values. Define tokens in OKLCH, keep red for one job per screen (the active chapter, the key number, the call to action), and let the particles carry the only other hue.
7. **One transition vocabulary.** Pick a single device for all chapter changes (for example, a grain-and-exposure dip with a slight red channel offset) and reuse it in materials too, as Igloo does with chromatic aberration. Eight different transitions read as a demo reel; one reads as a film.
8. **Budget first, with named tiers and a kill switch.** Set a frame target, then define High, Low and Static tiers. Drop depth of field, blur and shadow resolution first on mobile (Bruno Simon). Cap device pixel ratio, pause the loop when the tab or canvas is not visible, and fall back to a still frame per chapter if the budget is missed (Stripe).
9. **Reduced motion is a designed mode, not an off switch.** Under `prefers-reduced-motion`: no smoothing (Lenis does this by default), no camera travel, each chapter shows a static composed frame with cross-fades, and all content stays reachable. The same Static tier serves low-end phones and crawlers.
10. **Load the film in reels.** Ship the first chapter's assets only; compile shaders and fetch later chapters in the background while the visitor reads (Igloo). Compress textures (KTX2: ETC1S or UASTC) and geometry (Draco or Meshopt). Sound is opt-in, off by default, with a visible toggle.

---

## 4. Common failure modes and how the best sites avoid them

| Failure | How it shows up | What the best ones do |
|---|---|---|
| Slow first load | Long loader before any content | Real-time intro instead of video; background shader compile and asset loading (Igloo). Compressed textures and geometry, instancing, merged meshes (Bruno Simon). Tiny JS where 3D is not needed: 67 KB total (Aristide Benoist). For dhrubo.shop: the HTML headline must paint before the canvas exists. |
| Scroll-jacking | Wheel input feels delayed, snapped or trapped | Keep native scroll and only smooth it (Locomotive, Lenis). Aristide Benoist rejects any pattern that "paralyzes" input. Rauno Freiberg: interactions must be interruptible. |
| Unreadable text | Type over bright particles or moving geometry | Small palettes with high contrast (Heymans, Lusion). For dhrubo.shop: darken the scene behind each text block with a gradient scrim, keep particles out of the text column, and check body text against WCAG AA (4.5:1) with grain applied. |
| Inaccessible content | Canvas-only UI, no keyboard path, no reduced-motion mode | This is where award sites are weakest (accessibility 6.4 to 7.4). Avoid by keeping semantic HTML, real links and headings, visible focus styles, `aria-hidden` on the canvas, and a designed reduced-motion mode. |
| SEO-invisible canvas | Crawlers see an empty page | Server-render all content (Obys uses React purely as a server template; Dogstudio and Locomotive keep CMS-driven HTML). Basement's stack includes bot detection so crawlers skip the 3D. Use Next.js server components for chapter text and metadata. |
| Mobile meltdown | Heat, dropped frames, crashes on phones | Quality presets (Bruno Simon), dedicated mobile layouts (Locomotive), antialiasing off (Stripe), static fallback (Stripe). Lenis notes Safari caps at 60 fps and 30 fps in low power mode, so never tie animation speed to frame count. |
| Style over message | Visitor remembers the effect, not the person | Obys: motion "helps explain the idea". Rauno Freiberg: reserve motion for rare moments. Each chapter needs one sentence a recruiter can repeat. |
| Autoplay sound | Visitors close the tab | Sound as an opt-in layer synced to motion (Igloo, Bruno Simon). Browsers block autoplay with sound anyway. |

---

## 5. Typeface recommendation (all SIL Open Font License 1.1)

### Recommended set
| Role | Typeface | Why | Licence check |
|---|---|---|---|
| Display / titles | **Big Shoulders** (Patric King) | Tall, condensed, industrial; reads like a film title card at heavy weights and like signage at light ones. Variable weight 100 to 900 plus an optical-size axis (10 to 72), so one file serves both huge chapter titles and small labels. | OFL 1.1, verified in github.com/xotypeco/big_shoulders OFL.txt; no Reserved Font Name. Axes verified in Google Fonts metadata. |
| Text | **Inter** (Rasmus Andersson) | The precision-tech reference (Linear uses Inter and Inter Display). Variable weight 100 to 900 with optical size 14 to 32, italics, wide language coverage. Quiet enough to let the display face speak. | OFL 1.1, verified in github.com/rsms/inter LICENSE.txt; no Reserved Font Name. |
| Mono | **JetBrains Mono** | Clear at small sizes for code, metrics, timestamps and "case file" labels; weight 100 to 800 with italics. | OFL 1.1, verified in github.com/JetBrains/JetBrainsMono OFL.txt; no Reserved Font Name. |

Usage notes:
- Titles: Big Shoulders at weight 700 to 900, uppercase, tight leading (about 0.9), slight negative tracking at large sizes; set `font-optical-sizing: auto`.
- Body: Inter at 16 to 18 px, weight 400, line height about 1.5 to 1.6 on dark; avoid weights under 400 on near-black with grain.
- Mono: small uppercase labels with positive tracking; use it for the red accent sparingly.
- Load all three through `next/font`, which self-hosts the files (no third-party request, no layout shift). OFL allows self-hosting and commercial use; it forbids selling the fonts on their own.
- Big Shoulders has Latin, Latin Extended and Vietnamese only. It has no Devanagari.

### Alternative A: the Indian-script option
**Anek Latin** (display, used at width 75 for a condensed look) + **Anek Devanagari** for any Hindi title cards + **Geist** (text) + **Geist Mono**.
- Anek is by Ek Type, an Indian foundry, with matching families across Indian scripts. Width axis 75 to 125 and weight 100 to 800 (verified in Google Fonts metadata). This is the right choice if any chapter title should appear in Devanagari with the same voice as the Latin.
- Less dramatic than Big Shoulders when condensed; warmer and more humanist.
- Licences: Anek OFL 1.1 (verified, github.com/EkType/Anek OFL.txt). Geist OFL 1.1 (verified, github.com/vercel/geist-font LICENSE.txt, copyright Vercel with basement.studio; the file does not name the two families separately, but both ship from that repo).

### Alternative B: the poster option
**League Gothic** or **Bebas Neue** (display) + **Instrument Sans** (text) + **IBM Plex Mono**, with **Instrument Serif Italic** as an optional editorial accent.
- League Gothic has a width axis (75 to 100) but one weight. Bebas Neue is a single weight, capitals only, and very widely used, so it is less distinctive.
- Licences: Bebas Neue OFL 1.1 (verified, Dharma Type repo). Instrument Serif OFL 1.1 (verified). IBM Plex OFL 1.1 with Reserved Font Name "Plex" (verified), which only matters if you modify and redistribute the font. League Gothic and Instrument Sans are distributed by Google Fonts, which lists them as OFL; I did not open their licence files (Unverified at file level).

---

## 6. Sources

Primary pages read in this pass:
- Igloo Inc case study: https://www.awwwards.com/igloo-inc-case-study.html and entry https://www.awwwards.com/sites/igloo-inc
- Bruno Simon case study: https://www.awwwards.com/brunos-portfolio-case-study.html
- Lusion v3 entry: https://www.awwwards.com/sites/lusion-v3
- Active Theory v6 entry: https://www.awwwards.com/sites/active-theory-v6
- Basement Studio repo: https://github.com/basementstudio/website-2k25 (package.json)
- Aristide Benoist Site of the Month: https://www.awwwards.com/aristide-benoist-portfolio-2021-wins-site-of-the-month-june-2021.html
- The new Obys: https://www.awwwards.com/the-new-obys.html
- Henri Heymans entry: https://www.awwwards.com/sites/henri-heymans-25
- Locomotive Site of the Month: https://www.awwwards.com/locomotive-by-locomotive-wins-site-of-the-month-june-a-case-study.html
- Dogstudio Site of the Month: https://www.awwwards.com/dogstudio-by-dogstudio-wins-site-of-the-month-april.html
- Stripe globe: https://stripe.com/blog/globe
- Linear UI redesign: https://linear.app/now/how-we-redesigned-the-linear-ui
- Rauno Freiberg essay: https://rauno.me/craft/interaction-design
- Lenis: https://github.com/darkroomengineering/lenis
- GSAP pricing: https://gsap.com/pricing/
- Font licences: the OFL or LICENSE files in the repos named in section 5; axis data from https://fonts.google.com/metadata/fonts

Found but not readable by my fetcher (read these in a browser):
- https://tympanus.net/codrops/2026/04/14/they-call-me-giulio-the-making-of-a-cinematic-cyberpunk-portfolio/
- https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/
- https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/
- https://tympanus.net/codrops/2026/04/13/lusion-where-digital-craft-meets-ambitious-experimentation/
- Awwwards annual award pages: https://www.awwwards.com/annual-awards-2024/site-of-the-year and https://www.awwwards.com/annual-awards-2023/site-of-the-year
