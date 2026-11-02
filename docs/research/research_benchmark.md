# International Benchmark Report: Exceptional Personal Websites of Applied-AI, Forward-Deployed, Independent and Creative-Frontend Engineers

Prepared 2026-11-02. Scope: US, UK, Europe, Singapore, Australia, India. 25 sites.

## 0. Method and evidence labels

Every site below was fetched directly on 2026-11-02 with `curl` (homepage HTML, `/robots.txt`, `/llms.txt`, response headers) and grepped for framework fingerprints (`/_next/`, `data-astro`/`/_astro/`, `/_app/immutable`, `<meta name="generator">`, `three.js`, `gsap`, `<canvas>`), `application/ld+json` blocks, RSS/Atom links, and image formats referenced in the HTML. Page content (positioning, sections, proof, CTAs) was read through WebFetch (page converted to text). GitHub repo existence was checked by HTTP status.

Labels used throughout:

- **[V]** verified by fetching the site/HTML/headers/repo on 2026-11-02.
- **[F]** read from the fetched page text (content summary; wording quoted where the page gave it).
- **[I]** inferred (from reputation, code fingerprints, or search snippets; not confirmed on the site itself).

Caveats found while verifying:
- A `200` on `/llms.txt` is not proof of an llms.txt. karpathy.ai, antfu.me and ghuntley.com return 200 with `text/html` (SPA/soft-404 fallback). Only `text/plain` responses are real: swyx.io, levels.io, s-anand.net, arpitbhayani.me, rohitraj.tech, umesh-malik.com, sajalsharma.com. **[V]**
- Framework greps can over-match (brittanychiang.com matched `gatsby` and `jekyll` in footer text; the live build is Next.js per `/_next/` and footer credits). Where ambiguous I state the primary fingerprint only.
- cassie.codes (UK, GSAP/SVG creative dev, formerly a reference portfolio) is now a farewell note: "If you're looking for web animation help you can still find me in the GSAP universe." Dropped from the table; cited in anti-patterns as a data point on maintenance burden. **[F]**
- jeremy.fast.ai returned an empty shell (no title/h1, 0 scripts) and was dropped.

## 1. Site table

| # | Owner, role | URL | Country | Positioning (verbatim where quoted) | Primary conversion | Stack fingerprint [V] | Person JSON-LD [V] | robots / llms.txt [V] | Hosting / payload [V] |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Simon Willison, independent engineer (Datasette, LLM) | https://simonwillison.net | UK-born, US-based [I] | "Simon Willison's Weblog" (no bio line on home) | Newsletter; $10/mo GitHub-Sponsors "Monthly briefing" ("Pay me to send you less!") | Django, server-rendered; blog source public (simonw/simonwillisonblog) | No | robots: yes (ChatGPT-User explicitly allowed; sitemap); llms: no | Cloudflare cache HIT, 92 KB HTML, Atom feed |
| 2 | Hamel Husain, independent AI consultant / evals educator | https://hamel.dev | US | "Notes on applied AI engineering, machine learning, and data science." / "I'm a machine learning engineer with 20+ years of experience." | Course cohort (banner), newsletter | Quarto 1.10.19 (generator meta), static | No | robots: yes + sitemap; llms: no | GitHub Pages, 59 KB, RSS |
| 3 | Eugene Yan, applied-AI engineer (Anthropic; ex-Amazon) | https://eugeneyan.com | Singapore-born, US-based [F] | "I work to bridge the field and the frontier, and help build safe, reliable AI systems that scale." | Newsletter ("11,800+ readers") | Static (GitHub Pages headers) | No | robots: sitemap only; llms: no | Cloudflare + GitHub Pages, 62 KB |
| 4 | Shawn "swyx" Wang, founder (Latent Space, AI Engineer conf) | https://www.swyx.io | Singaporean in San Francisco [F] | "Hey, I'm swyx." / "Writer, Founder, and Devtools Startup Advisor based in San Francisco." | Newsletter ("more than 10,000 readers") | SvelteKit (`/_app/immutable`); template public (swyxio/swyxkit) | WebSite + author Person (sameAs, jobTitle) | robots: yes + sitemap; llms: yes (text/plain) | Cloudflare, s-maxage 86400, 36 KB, RSS |
| 5 | Lee Robinson, engineer/writer (SpaceX ML; ex-Cursor, Vercel) | https://leerob.com | US | "I'm an engineer and writer." | Angel-invest mailto; X | Next.js (`/_next/`), Vercel | Yes: Person with jobTitle, worksFor, alumniOf, sameAs | robots: 404; llms: no | Vercel HIT; 803 KB HTML, 213 script tags |
| 6 | Brittany Chiang, frontend engineer (Klaviyo) | https://brittanychiang.com | US | "Frontend Engineer" who "build[s] accessible, pixel-perfect experiences for the web." | "View Full Résumé" PDF; GitHub/LinkedIn | Next.js + Tailwind; source public (bchiang7/v4) | No | robots: 404; llms: no | Vercel HIT, 63 KB |
| 7 | Andrej Karpathy, AI researcher/educator | https://karpathy.ai | US | "I like to train deep neural nets on large datasets." | Follow X/GitHub; YouTube; email reveal | "pure HTML and CSS in two static files" (stated on page); 1 script tag | No | robots: yes; llms: soft-404 HTML | CDN (X-Served-By), 34 KB |
| 8 | Lilian Weng, AI researcher (ex-OpenAI) | https://lilianweng.github.io | US | "I'm documenting my learning notes in this blog since 2017." | RSS, Scholar, GitHub (no sales CTA) | Hugo 0.163.3 PaperMod | ld+json present (not Person) | robots: yes + sitemap; llms: no | GitHub Pages, 26 KB |
| 9 | Maggie Appleton, designer-engineer (GitHub Next) | https://maggieappleton.com | UK (uk.linkedin in sameAs; en-GB) [V] | "Maggie makes visual essays about programming, design, and anthropology." / "Designer, anthropologist, and mediocre developer." | RSS only | Astro (`data-astro-cid`); source public | Yes: WebSite + Person graph with sameAs | robots: yes + sitemap; llms: no | Vercel HIT, 95 KB, 12 WebP refs |
| 10 | Jeremy Keith, web developer/author (Clearleft) | https://adactio.com | UK (Brighton) [F] | "Making websites. Writing books. Hosting a podcast. Speaking at events. Living in Brighton. Working at Clearleft." | Email, RSS, books | Hand-built PHP/Apache; 45 h-card, 20 h-entry, webmention + micropub endpoints | No | robots: blocks GPTBot and ClaudeBot; llms: no | Apache, no-cache, 62 KB, RSS per section |
| 11 | Matt Webb, product/AI designer-engineer | https://interconnected.org | UK [I] (not stated on page) | "A blog by Matt Webb" (a.k.a. genmon) | Buttondown newsletter; "Unoffice Hours" 30-min Calendly | Static (GitHub Pages); 6 KB homepage | No | robots: yes; llms: no | GitHub Pages, 2 scripts |
| 12 | Jhey Tompkins, design engineer (Shopify) | https://jhey.dev | UK origin [I]; status widget "Chillin in Split" | "Designer · Engineer · Tastemaker" / "Crafting interfaces, prototypes, and experiments for the web." | Email, AMA repo (jh3y/ama), Follow | Astro (generator meta), Vercel; 8 AVIF refs, 1 canvas | No | robots: 404; llms: no | Vercel, 37 KB |
| 13 | Bruno Simon, creative developer (Three.js Journey) | https://bruno-simon.com | France | "My name is Bruno Simon, and I'm a creative developer (mostly for the web)." | Three.js Journey course; Discord; GitHub source | Three.js, one canvas; source public (brunosimon/folio-2025 linked in HTML) | No | robots: 404; llms: no | nginx/Ubuntu, 59 KB, 15 WebP refs |
| 14 | Rauno Freiberg, interaction designer (Vercel, Devouring Details) | https://rauno.me | Estonia | "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details." | Copy-to-clipboard email; Craft/Projects | Next.js, Vercel | Yes: WebSite + Person (nationality, worksFor) | robots: yes + sitemap; llms: no | Vercel HIT, 31 KB |
| 15 | Philipp Schmid, Staff Engineer, Google DeepMind | https://www.philschmid.de | Germany [I] | "Personal Blog of Philipp Schmid Staff Engineer at Google DeepMind." (meta) | Newsletter link | Next.js; source public (philschmid/philschmid.de) | No | robots: yes + sitemap; llms: no | Vercel, no-store, 79 KB |
| 16 | Anthony Fu, open-source founder (Vitest, Slidev, VueUse) | https://antfu.me | France [I] | "Hey! I'm Anthony Fu, a fanatical open sourceror and design engineer." | Sponsorship (GitHub Sponsors, Open Collective, Afdian) | Static; source public (antfu/antfu.me); 16 KB | No | robots: yes; llms: soft-404 HTML | Netlify, 4 scripts, RSS |
| 17 | Pieter Levels, indie founder (Photo AI, Nomads, Remote OK) | https://levels.io | Netherlands [I]; nomad | "Hi. I'm @levelsio and you've found my blog!" / "Bootstrapping startups while traveling the world." | Email subscribe (claims 184,863 full-email readers); Telegram | WordPress (wp-content), Cloudflare; nav exposes `api`, `llms`, `mcp`, `stats` | No | robots: yes + sitemap; llms: yes (text/plain, "941 published posts") | Cloudflare DYNAMIC, 492 KB, 951 img tags |
| 18 | Sajal Sharma, AI engineer, O'Reilly instructor | https://sajalsharma.com | Singapore [I] (GitHub profile; site does not state) | "I build AI systems and teach engineers how." | Newsletter; courses; no hire CTA | Astro v7.0.7 (generator) | No | robots: yes + sitemap; llms: yes (text/plain) | GitHub Pages via Cloudflare, 21 KB |
| 19 | Geoffrey Huntley, independent AI-coding engineer ("Ralph loop") | https://ghuntley.com | Australia [I] (talks at Web Directions Melbourne; base not stated) | meta: "I'm a software engineer who writes about AI-assisted software development. I created the Ralph loop..." | Ghost subscribe; Workshops; paid hourly help by email; speaking | Ghost 6.74 | ld+json present (Ghost default) | robots: yes + sitemap; llms: soft-404 HTML | CDN cache, 59 KB |
| 20 | Kevin Yank, Director of Front End Engineering, Culture Amp | https://kevinyank.com | Australia (Melbourne, stated) [F] | "Make pixels change colour with code, to create beautiful, accessible experiences." | RSS, email | Static + Tailwind [I] | No | robots: blocks GPTBot; llms: no | Netlify, 49 KB, RSS |
| 21 | Rohit Raj, AI consultant · Forward Deployed Engineer | https://rohitraj.tech | India (Bengaluru, stated) [V] | "I embed with your team and ship AI to production." (hire page); home h1 "One engineer. Whole product." | Hire page: call / WhatsApp / brief form; fractional FDE retainer or fixed-scope pilot | Next.js + Three.js + Framer Motion; 52 scripts, 208 KB | Yes: Person, Service, ProfessionalService, WebSite+SearchAction, FAQPage | robots: explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended; llms: yes + llms-full.txt | s-maxage 1y |
| 22 | Umesh Malik, AI engineer / GenAI developer | https://umesh-malik.com | India (Gurugram) [I] | "I'm Umesh Malik. I build intelligent software systems." | "Start a Conversation", résumé, mailto | SvelteKit (`/_app/immutable`) + Three.js (umesh.OS); 231 KB, 5 scripts | Yes: Person graph with alternateName, jobTitle | robots: allows GPTBot/ClaudeBot with comments; llms: yes; `.md` mirror of every path, `/mcp`, `/api/v1`, `rel="service-doc" text/markdown` | Cloudflare, RSS |
| 23 | S Anand, "LLM Psychologist" (Straive), Gramener co-founder, IIT-M faculty | https://www.s-anand.net | India | "LLM Psychologist at Straive, TDS faculty at IIT Madras, Gramener Co-founder. AI & Data Viz." | Talk requests; WhatsApp/phone/email; Google Groups; "send a pull request" | Static blog (sanand0/blog linked); 7 AVIF + 2 WebP refs | Yes (2 ld+json blocks incl. Person) | robots: yes + sitemap; llms: yes + corpus.jsonl + tags.json | Cloudflare, 151 KB |
| 24 | Kailash Nadh, CTO Zerodha; FOSS United co-founder | https://nadh.in | India | "Developer / Tinkerer / Absurdist" / "I am a hobbyist software developer and a tinkerer." | Obfuscated email only | Hugo 0.143.0; 10 KB, 2 scripts | No | robots: yes; llms: no | Cloudflare DYNAMIC, RSS |
| 25 | Arpit Bhayani, Principal Engineer II Razorpay; creator DiceDB | https://arpitbhayani.me | India | "engineering, databases, and systems. always building." | Masterclasses (3); contact page | Astro v5.13.5 (generator); 59 KB | Yes: WebSite + Person graph | robots: explicitly allows GPTBot and ClaudeBot; llms: yes (text/plain) | Cloudflare HIT, RSS |

## 2. Per-site records

Each record: audiences and conversion; information architecture; proof-of-work; design/interaction; stack and machine-readability; performance; why it ranks or gets cited.

### 2.1 Simon Willison (US/UK) — simonwillison.net
- Audiences: AI engineers, journalists, tool authors. Conversion: newsletter plus paid monthly briefing via GitHub Sponsors; a sponsor banner. No consulting pitch. [F]
- IA: About, Newsletter, TILs (separate subdomain), Tools; content types Entries / Links / Quotes / Notes / Guides; tag archive back to 2002. [F]
- Proof: open-source projects (Datasette, LLM, sqlite-utils, shot-scraper) referenced inline; tag counts (2,306 posts tagged "ai", 1,293 "python"); reproducible commands, shared prompts, side-by-side model outputs, recurring "pelican riding a bicycle" benchmark. [F]
- Design: plain, dense, text-first; no hero; 7 script tags; a few WebP. [V]
- Stack: Django server-rendered; blog code public. No JSON-LD; Atom feed; robots lists ChatGPT-User with empty Disallow (allowed). [V]
- Why it ranks/cites: 24-year archive, daily link-blogging with "via" attribution, release notes for every tool, first-party experiments with specific prices and version numbers. [F]/[I]

### 2.2 Hamel Husain (US) — hamel.dev
- Audiences: engineers/PMs buying evals expertise. Conversion: course cohort banner, newsletter. No services page even though he consults; the course is the funnel. [F]
- IA: Blog, Notes, OSS, Teaching; on-page jump menu. [F]
- Proof: "20+ years", Airbnb and GitHub, "5,000+ students from 500+ companies, including OpenAI, Anthropic, and Google". About 45 long-form posts 2017–2026 (LLM-as-judge, evals guide). [F]
- Design: Quarto default; nothing decorative. [V]
- Stack: Quarto static on GitHub Pages; RSS; sitemap; no JSON-LD. [V]
- Why it ranks: a few canonical long guides that practitioners cite; social proof is numeric and attributable. [F]/[I]

### 2.3 Eugene Yan (US / Singapore) — eugeneyan.com
- Audiences: applied-ML/LLM practitioners, hiring managers at labs. Conversion: newsletter, "11,800+ readers". [F]
- IA: Start Here, Writing, Speaking, Prototyping, About, Search; "Latest", "More than 50k Reads", "My Favourites", "teardowns" tag. [F]
- Proof: counters "212 posts, 31 talks, 19 prototypes, 426,673 words"; keynotes (AI Engineer 2023–25, RecSys 2022, Netflix PRS 2024); prototypes (AlignEval, Obsidian-Copilot); GitHub repos linked in HTML (applied-ml, open-llms, ml-design-docs). [V]
- Design: minimal text with a few WebP thumbnails; 16 scripts. [V]
- Stack: static on GitHub Pages behind Cloudflare; robots sitemap-only; no JSON-LD; no llms.txt. [V]
- Why it ranks: "Start Here" curation plus popularity-sorted lists; long surveys become reference material. [F]

### 2.4 swyx (US / Singapore) — swyx.io
- Audiences: AI-engineering community, founders, devtools. Conversion: newsletter (>10k readers), podcast (Latent Space), conference (ai.engineer). [F]
- IA: home, ideas (filter Essay/Talk/Podcast), podcasts, about, subscribe; Cmd-K search; theme toggle; "What I'm building", "People I bet on". [F]
- Proof: free open-source book (Coding Career Handbook), keynotes, companies. [F]
- Design: "notebook" framing, horizontal card rails, SF/Singapore banner, skip-to-content link. [F]
- Stack: SvelteKit; template public (swyxio/swyxkit); WebSite + author Person JSON-LD with sameAs; real llms.txt describing site sections. [V]
- Why it ranks: "learn in public" essays with durable titles; cross-linked to podcast/conference properties he owns. [I]

### 2.5 Lee Robinson (US) — leerob.com
- Audiences: developers; founders seeking angel investment. Conversion: mailto for angel investing; X. [F]
- IA: bio, "Notes" (10 topic pages such as "Understanding AI", "Developer marketing"), 8 blog posts. [F]
- Proof: employers (SpaceX ML, Cursor, Vercel/Next.js), "15 years coding". No metrics. [F]
- Stack: Next.js on Vercel; complete Person JSON-LD (name, image, jobTitle, worksFor, alumniOf, sameAs), the cleanest schema example in the set. But the homepage HTML is 803 KB with 213 script tags for a text page. [V]
- Lesson: schema done right; payload done wrong.

### 2.6 Brittany Chiang (US) — brittanychiang.com
- Audiences: recruiters/hiring managers. Conversion: résumé PDF; GitHub/LinkedIn/CodePen. [F]
- IA: single page: About, Experience (6 roles, dated, linked employer, tech tags), Projects (cards with screenshot, tags, badge "100k+ Installs" for Halcyon theme), Writing; separate project archive. [F]
- Proof: dated experience with tech tags; install-count badge. [F]
- Design: skip link, alt text, clear heading hierarchy; single-page anchor nav. [F]
- Stack: Next.js + Tailwind, Vercel; source public (bchiang7/v4). No JSON-LD, no robots. [V]
- Caveat: this design has been cloned so widely that it now reads as a template to many reviewers. [I]

### 2.7 Andrej Karpathy (US) — karpathy.ai
- Audiences: everyone; a canonical index. Conversion: YouTube, X, GitHub, email reveal. [F]
- IA: intro, whimsical bio, career timeline with logos, featured talks grid, teaching (Zero to Hero, CS231n), featured writing, pet projects (GitHub cards), publications, misc. [F]
- Proof: timeline, publications with venues, course growth (CS231n 150 to 750 students). [F]
- Design: "pure HTML and CSS in two static files" (stated); 1 script; 50 img tags. [V]
- Perf: static, CDN-cached, 34 KB. No JSON-LD; robots yes. [V]
- Lesson: an index page with zero framework is world-class when the proof is real.

### 2.8 Lilian Weng (US) — lilianweng.github.io
- Audiences: researchers and engineers. Conversion: none (RSS, Scholar). [F]
- IA: Posts, Archive, Search, Tags, FAQ; each post shows reading time (20–40 min). [F]
- Proof: the essays themselves (agents, hallucination, reward hacking, diffusion) cite papers; one post notes an OpenAI team role. [F]
- Stack: Hugo PaperMod, GitHub Pages, 26 KB, 9 scripts, keyboard shortcuts. [V]
- Why it is cited: long survey posts become the first link for a topic; zero marketing. [I]

### 2.9 Maggie Appleton (UK) — maggieappleton.com
- Audiences: designers, AI/tools-for-thought community. Conversion: RSS only; no newsletter. [F]
- IA: Garden, Essays ("Opinionated, longform narrative writing with an agenda"), Notes ("Loose, unopinionated notes on things I don't entirely understand yet"), Patterns, Library/Antilibrary, Smidgeons, Talks, Podcasts, Now, About. [F]
- Proof: talks with slides/transcripts/videos; GitHub Next role. [F]
- Design: illustrated cards; 64 inline SVGs, 12 WebP refs; maturity tiers signalled by section, not badges. [V]/[F]
- Stack: Astro on Vercel (HIT); source public; WebSite + Person JSON-LD graph with sameAs; sitemap. [V]
- Why it ranks: distinctive visual essays earn backlinks; the maturity taxonomy makes incomplete work publishable. [I]

### 2.10 Jeremy Keith (UK) — adactio.com
- Audiences: web-standards community; event organisers. Conversion: email, RSS, books. [F]
- IA: Journal (~3,278), Links (~10,899), Articles (~87), Notes (~8,267), About, Speaking, Books; eight selectable themes. [F]
- Proof: three books free online, Clearleft, The Session, Huffduffer. [F]
- Stack: hand-built; 45 h-card and 20 h-entry microformats, webmention/micropub/IndieAuth endpoints; per-section RSS; POSSE to Mastodon/Bluesky. [V]
- Policy: robots.txt disallows GPTBot and ClaudeBot, a deliberate stance that trades AI-answer citations for consent. [V]

### 2.11 Matt Webb (UK) — interconnected.org
- Audiences: product/AI thinkers, collaborators. Conversion: Buttondown newsletter; "Unoffice Hours" 30-minute Calendly booking. [F]
- IA: About, Archive (2007–2026), tag series ("filtered-for", 127 posts), "Best of" per year, "On this day", search, blogroll, colophon. [F]
- Proof: ~1,000 posts since 2000; streak of 344 consecutive weeks; projects inline (Braggoscope, Yesterday weather app). [F]
- Perf: static on GitHub Pages; homepage 6 KB, 2 scripts, the lightest page in the set. [V]
- Why it ranks: consistency streak plus original product experiments get press coverage. [I]

### 2.12 Jhey Tompkins (UK/Shopify) — jhey.dev
- Audiences: design-engineering peers, conference organisers, employers. Conversion: email, AMA GitHub repo, Follow. [F]
- IA: Index, Email, AMA, Follow; "Latest" five prototypes each on its own `/prototypes/2026/...` page; live widgets (status, weather, Spotify, Steam); build hash in footer. [F]
- Proof: Shopify Brand Design Studio; ex-Google, ex-Vercel; CodePen; talks. [F]
- Design: interaction experiments quarantined to standalone pages; home is light (37 KB, 1 canvas, AVIF images). [V]
- Stack: Astro on Vercel; no JSON-LD/robots. [V]

### 2.13 Bruno Simon (France) — bruno-simon.com
- Audiences: creative-dev community, course buyers. Conversion: Three.js Journey course, Discord, GitHub source. [F]
- IA: Home/welcome, Options/Controls, Achievements/Circuit (timed laps, leaderboard), Whispers (guestbook), Behind the scene (stack, credits). [F]
- Proof: the site is the product demo; the course; MIT source (brunosimon/folio-2025 linked in HTML). [V]
- Design: drivable physics car in a 3D world; keyboard/gamepad/touch; "I'm stuck!" teleport. Full WebGL is appropriate here because 3D is the offer. [F]
- Perf: Three.js, one canvas, nginx; 15 WebP refs; no CDN headers; no robots. Page states the score/whisper server is "currently offline" — live features decay. [V]/[F]

### 2.14 Rauno Freiberg (Estonia) — rauno.me
- Audiences: product companies hiring interaction designers; peers. Conversion: copy-email control ("Copied"). [F]
- IA: Craft, Projects, Field Notes, History of Software Design (external); archived yearly versions 2022/2023. [F]
- Proof: Vercel and Devouring Details; manifesto list ("Make it fast." ... "Make it."). [F]
- Stack: Next.js on Vercel (HIT), 31 KB; WebSite + Person JSON-LD including nationality and worksFor. [V]

### 2.15 Philipp Schmid (Germany) — philschmid.de
- Audiences: ML engineers using Gemini/agents. Conversion: Newsletter link. [F]
- IA: Blog index grouped by year/month with tags, 15 pages; Projects; About; Cmd-K search; theme toggle. [F]
- Proof: the post stream (Gemini API, computer use, evals); DeepMind in meta description; site source public. [V]
- Stack: Next.js on Vercel; `no-store` cache header (missed static win); no JSON-LD. [V]
- Why it ranks: frequent how-to posts with code at the moment a model/API ships; search-intent titles. [I]

### 2.16 Anthony Fu (France) — antfu.me
- Audiences: OSS users and sponsors. Conversion: sponsorship. [F]
- IA: Blog, Projects, Talks, Sponsors, Podcasts, Photos, Demos, /use. [F]
- Proof: "Creator of" Vitest, Slidev, VueUse, UnoCSS, Elk; core team Vue/Nuxt/Vite; plain links, no star counts. [F]
- Design: minimal; 16 KB, 4 scripts. [V]
- Stack: source public; Netlify; RSS; llms.txt soft-404. [V]

### 2.17 Pieter Levels (Netherlands/nomad) — levels.io
- Audiences: indie founders. Conversion: email subscribe; Telegram; levels.vc. [F]
- IA: nav home / stats / projects / rss / api / llms / mcp / investments / contact; sort by views; filters by type; pinned posts. [F]
- Proof: public revenue posts; infrastructure numbers ("4 billion requests a year for $244/mo"); about 30 posts in Oct 2026. [F]
- Stack/perf: WordPress on Cloudflare (DYNAMIC); real llms.txt ("941 published posts"); homepage 492 KB with 951 img tags, heavy but tolerated by his audience. [V]

### 2.18 Sajal Sharma (Singapore) — sajalsharma.com
- Audiences: engineers and teams buying training. Conversion: newsletter, courses; no hire CTA. [F]
- IA: Writing (featured + 4 recent), Teaching, About, Contact, Tags, RSS. [F]
- Proof: "O'Reilly Instructor"; hands-on experiment posts. Few named employers. [F]
- Stack: Astro v7 on GitHub Pages/Cloudflare, 21 KB; real llms.txt with post list and "free to read and cite with attribution". [V]

### 2.19 Geoffrey Huntley (Australia) — ghuntley.com
- Audiences: engineering leaders adopting coding agents; conference organisers. Conversion: Ghost subscribe; Workshops; paid hourly help by email; speaking. [F]
- IA: Home, Lately, Media, Workshops, Speaking, Disclosures, Contact; card list with category (AI, NIX). [F]
- Proof: "I created the Ralph loop" (meta); podcast appearances; talks at Web Directions Melbourne 2025 and AI Engineer Singapore 2026. [V]/[F]
- Stack: Ghost 6.74; ld+json present; robots + sitemap; llms soft-404. [V]

### 2.20 Kevin Yank (Australia) — kevinyank.com
- Audiences: front-end leaders. Conversion: RSS/email. [F]
- IA: Notes, "Build the Web", "Know your tools", "The rest", "Reach me here"; horizontally scrolling section carousels. [F]
- Proof: Director of Front End Engineering at Culture Amp leading about 50 engineers; "more than 20 years". Footer says "Principal Architect, Front End" — inconsistent titles. [F]
- Stack: static on Netlify, 49 KB; robots disallows GPTBot. [V]

### 2.21 Rohit Raj (India, Bengaluru) — rohitraj.tech (the only self-described FDE site in the set)
- Audiences: US/EU founders and CTOs buying embedded AI engineering; the FAQ schema answers "Why hire an AI consultant in India over a US contractor?" ("30–40% of US contractor cost"). Conversion: call / WhatsApp / project brief form; fractional FDE (~2 days/week retainer) or fixed-scope pilot; free 30-min scoping; NDA on request; "client owns the code and repo from day one". [F]/[V]
- IA (hire page): Hero, What you get (5 bullets), Two ways to engage, Recent work (3 case studies), Specialised engagements (6 service pages), FAQ (4), Enquiry form. Site: Home, About, Projects, AI Agents (live agents in browser), Services, Hire, Notes. [F]/[V]
- Proof: three anonymised case studies (fintech education platform with an autonomous daily-article agent; AI dispatcher gated by an eval suite; autonomous engineering pipeline). Weak spots: no client names, no quantified outcomes, an unexplained "35 running" badge. [F]
- Design: Next.js + Three.js + Framer Motion; 52 script tags, 208 KB, one canvas, heavier than the text-first leaders. [V]
- Machine-readability: the most complete in the set — Person, Service, ProfessionalService, WebSite+SearchAction, FAQPage JSON-LD; llms.txt + llms-full.txt; robots explicitly allowing GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended; sitemap. [V]

### 2.22 Umesh Malik (India, Gurugram) — umesh-malik.com
- Audiences: hiring teams and product builders. Conversion: "Start a Conversation", "View Resume", mailto, "Product build" card. [F]
- IA: Hero, What I focus on, Start Here, Selected work (cards with outcome line + tech tags + project brief page), By the numbers, Technical skills, Experience (Expedia, Tekion, BYJU'S), Fresh from the blog, Collaboration. [F]
- Proof: outcome lines such as "3x developer velocity improvement" (no method shown); employers; retro "umesh.OS" Windows-95 desktop in Three.js. No GitHub links on home. [F]
- Machine-readability: Person JSON-LD with alternateName; llms.txt (with an "agent-ad-page" header comment); append `.md` to any path for Markdown; `/mcp`; `/api/v1`; `rel="service-doc" type="text/markdown"`; robots with per-crawler comments; 404 returns a recovery map. [V]/[F]
- Stack: SvelteKit, server-rendered, JS "only adds motion"; 231 KB, 5 scripts, Cloudflare. [V]

### 2.23 S Anand (India) — s-anand.net
- Audiences: students (IIT-M), enterprises (talks), AI community. Conversion: invite to speak; WhatsApp/phone/email; Google Groups updates; "send a pull request". [F]
- IA: About me, Working with me, Contact, Get updates; Pages (AI Advice, Career Advice, Prompts, Questions I am asked, Mistakes I made); archives by year to 1999, by tag, by category (Links 1794, LLMs 324). [F]
- Proof: Lehman, BCG, Infosys Consulting, IBM, Gramener (co-founder), Straive; IIT-M/IIM-B/LBS; weekly "Things I Learned"; talk pages with video/transcript/captions/audio. [F]
- Design: calendar strip of posting activity; keyboard shortcuts; CC0 license; obfuscated email. [F]
- Machine-readability: llms.txt, corpus.jsonl, tags.json, with a request to cite canonical URLs; Person JSON-LD; AVIF images. [V]

### 2.24 Kailash Nadh (India) — nadh.in
- Audiences: peers and the FOSS community; nothing commercial. Conversion: email only. [F]
- IA: Home, Projects (/work), Research, Blog, Releases; photo strip; "online since 2001". [F]
- Proof: CTO Zerodha since 2013 ("India's largest stock broker"); co-founder of FOSS United, Rainmatter, Indic Digital Archive, Samagata foundations; PhD. [F]
- Perf: Hugo, 10 KB, 2 scripts; RSS. Credibility sits entirely in the facts and the writing ("Code is cheap. Show me the talk."). [V]/[F]

### 2.25 Arpit Bhayani (India) — arpitbhayani.me
- Audiences: engineers buying masterclasses; employers. Conversion: three masterclasses; Contact & Inquiries. [F]
- IA: Projects, Blogs, Notes, Videos, Papershelf, Bookshelf, Courses, Talks; card grid with counts (Blogs 112, Notes 673, Videos 268, Projects 9, Papers 111, Talks 12); footer lists operating entity and GSTIN. [F]
- Proof: DiceDB with GitHub stars shown (10,771), px0 (1,897); Razorpay, Google (GCP Memorystore/Dataproc), Amazon, Unacademy; Profile.fyi acquired by Mercor; social counts. [F]
- Stack: Astro v5.13.5 on Cloudflare (HIT), 59 KB; WebSite + Person JSON-LD; llms.txt; robots explicitly allows GPTBot/ClaudeBot. [V]

## 3. Cross-cutting patterns that separate world-class sites from template portfolios

1. **One-sentence, verb-first positioning that names the outcome, not the stack.** "I embed with your team and ship AI to production" (Raj), "I build AI systems and teach engineers how" (Sharma), "I like to train deep neural nets on large datasets" (Karpathy), "bridge the field and the frontier" (Yan). Template sites say "full-stack developer passionate about...". The best lines are falsifiable claims about what the person does for whom. [F]
2. **A corpus, not a brochure.** The most-cited sites are archives with visible counts: 2,306 AI-tagged posts (Willison), 212 posts / 426,673 words (Yan), 344-week streak (Webb), 941 posts (Levels), archives to 1999–2002 (Anand, Keith, Willison). Citation and ranking follow depth and longevity, not design. [F]
3. **Explicit content taxonomy by confidence.** Entries/Links/Quotes/TILs (Willison); Essays/Notes/Patterns/Garden (Appleton); Blogs/Notes/Videos/Papershelf (Bhayani); Journal/Links/Articles/Notes (Keith). Owners can publish unfinished thinking without diluting finished work, which is why they publish often. [F]
4. **Countable, attributable proof.** GitHub stars inline (DiceDB 10,771), students with company names (Husain), newsletter reader counts, install badges ("100k+ Installs"), course growth (CS231n 150 to 750). Numbers are sourced to a repo or platform rather than asserted. [F]
5. **Payload restraint on text pages.** Leaders ship tiny HTML: interconnected.org 6 KB / 2 scripts, nadh.in 10 KB / 2 scripts, antfu.me 16 KB, karpathy.ai 34 KB / 1 script. Static hosting with CDN HIT (GitHub Pages, Netlify, Vercel, Cloudflare) is near-universal. The counter-examples (leerob 803 KB / 213 scripts; levels.io 492 KB) succeed despite their payload. [V]
6. **Motion is quarantined and purposeful.** Tompkins routes every experiment to its own prototype page; Freiberg keeps /craft separate from the index; Simon's full-WebGL home is justified because 3D is his product and course. Nobody in the applied-AI group uses a 3D hero. [V]/[F]
7. **Conversion matches the audience's buying motion.** Educators sell cohorts (Husain, Bhayani); OSS maintainers ask for sponsorship (Fu, Willison's paid briefing); consultants offer a scoping call with engagement models and FAQ (Raj) or low-friction "unoffice hours" (Webb); employees show a résumé PDF and dated experience (Chiang). Mismatched CTAs read as unfinished. [F]
8. **Ownership of distribution.** RSS/Atom on 18 of 25; POSSE syndication and webmentions (Keith); owned newsletters (Buttondown, Ghost); public source for the site itself on 10 of 25 (Willison, swyx, Appleton, Chiang, Fu, Simon, Schmid, Huntley, Karpathy, Weng). [V]
9. **Machine-readability is the new baseline, led by India.** Person JSON-LD with sameAs (Robinson, Freiberg, swyx, Appleton, Bhayani, Raj, Malik, Anand); real llms.txt on 7 sites, 5 of them India/Singapore-linked; `.md` mirrors and `/mcp` (Malik), corpus.jsonl (Anand), llms-full.txt (Raj), explicit AI-crawler allow lists (Raj, Malik, Bhayani). The opposite stance exists (Keith and Yank block GPTBot) and is a conscious choice. [V]
10. **Writing quality = specificity + candour.** Willison gives prices, version numbers, timelines and notes where a model broke a product; Nadh's titles argue; Anand keeps a public "Mistakes I made" page. Generic sites write about "passion" and "cutting-edge". [F]
11. **Accessibility and ergonomics as craft signals.** Skip-to-content links (Chiang, swyx), keyboard shortcuts (Anand, Weng), theme toggles (swyx, Schmid, Keith's eight themes), reading-time labels (Weng), copy-email affordance (Freiberg). Cheap, visible to CTOs who care. [F]
12. **Longevity is displayed, not hidden.** Year archives to 1999/2001/2002, archived site versions (rauno.me 2022/2023), "online since 2001" (Nadh), build hash in footer (Tompkins). Templates have no history; authority does. [F]

## 4. Anti-patterns to avoid (evidence-backed)

- **Generic AI/template layout.** The single-page About / Experience / Projects format with spotlight cursor (brittanychiang.com v4, public source) is cloned so widely that it now signals "template". [I]
- **Unexplained or unverifiable metrics.** A "35 running" badge with no label (rohitraj.tech); "3x developer velocity improvement" with no method or baseline (umesh-malik.com). State measure, period and source, or omit. [F]
- **Heavy WebGL hero without a reason.** bruno-simon.com works because the 3D world is the portfolio and the course demo; Three.js + Framer Motion + 52 scripts on a consultant's hire page (rohitraj.tech) adds weight without adding proof, and LCP cost is paid by every CTO on hotel Wi-Fi. [V]/[I]
- **Bloated "minimal" pages.** leerob.com renders a plain list from 803 KB of HTML and 213 script tags. Measure what you ship. [V]
- **Fake machine-readability.** `/llms.txt` returning a 200 HTML app shell (karpathy.ai, antfu.me, ghuntley.com) is a soft-404. Serve text/plain or do not advertise it. [V]
- **Schema stuffing.** ProfessionalService with `priceRange: "$$$$"` plus Service, Person, FAQPage and WebSite on one page (rohitraj.tech) is at the edge; Person + WebSite + a real FAQPage is enough. [V]/[I]
- **CTAs to things that don't exist.** "I don't have a Substack yet" next to a Substack link (huyenchip.com, reviewed). [F]
- **Live features that decay.** Leaderboards and guestbooks "currently offline" (bruno-simon.com); weather/Spotify widgets (jhey.dev) need upkeep. [F]
- **Creative-site burnout.** cassie.codes was a flagship SVG/GSAP portfolio and is now a farewell page. A site that needs continuous novelty is a liability; a site whose value is its archive appreciates. [F]
- **Blocking AI crawlers while wanting AI citations.** adactio.com and kevinyank.com disallow GPTBot (Keith also ClaudeBot), valid as values, incompatible with a goal of being cited in AI answers. Decide explicitly. [V]
- **Dynamic serving for static content.** `no-store`/DYNAMIC on pages that never change (philschmid.de, levels.io, nadh.in) forgoes free CDN wins. [V]
- **Inconsistent titles across page, footer and schema** (kevinyank.com shows two). Recruiters notice. [F]

## 5. Recommendations for an India-based applied-AI / forward-deployed engineer (16 years enterprise revenue-ops; shipped Sahkarmi, an open-source Windows desktop AI-agent platform, plus several live web products)

Principles distilled from the benchmark, not a copy of any site.

### 5.1 Positioning
- Lead with one falsifiable sentence fusing the two unusual assets: enterprise revenue-ops fluency and shipped agent software. Pattern (write your own words): "I build and deploy AI agents inside revenue and operations teams, and I ship the software myself." Follow with one line of proof in numbers (years, products live, open-source release count/version, Store listing), the way Yan and Bhayani use counters.
- Put location and working hours in plain text and in Person JSON-LD (address, areaServed), as rohitraj.tech does; "India-based, overlaps US/EU hours" is the first question an overseas buyer resolves.
- Name FDE engagement models explicitly (fractional retainer; fixed-scope pilot; outcome-priced build) with a free scoping call. Visible terms plus a short FAQ convert better than "let's chat".

### 5.2 Pages to build (ranked by leverage)
1. **Home**: positioning sentence; three proof tiles with checkable numbers; one featured case study (Sahkarmi); one featured essay; one clear CTA per audience (5.4).
2. **Sahkarmi deep-dive** (flagship case study): problem, architecture diagram, key decisions (local-first, approval flow, voice, marketplace, Windows-only scope), evals/testing approach, release timeline (versions and dates from the changelog), distribution proof (GitHub repo, Microsoft Store listing, Scoop bucket), what you'd do differently. This is the "one end-to-end deployment with architecture decisions explained" that FDE buyers look for.
3. **Work / Products**: one card per live product with URL, one-line outcome, stack tags, your role, linked write-up. Mark open-source ones with repo links and real star/download numbers.
4. **Writing**: build logs and decision notes (what broke, what you measured) rather than tutorials; two-tier taxonomy (Essays vs Notes) so you can publish weekly.
5. **Services / Hire**: who it's for (CTO, founder, SMB owner); what you get; two engagement models; process (week 1 to week 4); FAQ (IP ownership, NDA, timezone, pricing band); scoping-call CTA; WhatsApp for Indian SMBs.
6. **About**: the 16-year revenue-ops arc told as domain fluency (CRM, billing, forecasting, ops data) that most AI engineers lack; timeline with employers like karpathy.ai; résumé PDF for recruiters.
7. **Now / Changelog**: a dated "what I'm shipping" page; cheap to maintain, signals activity.
8. **Contact**: email, WhatsApp, Calendly; no forms that go nowhere.

### 5.3 How to present evidence
- Primary artefacts over claims: link the repo, release page, Store listing, live product; screenshots with alt text; cite your own changelog versions and dates.
- Numbers with provenance: "X releases since <date>", "N downloads (Store/Scoop, as of <date>)", "M templates in marketplace", each with its source. No badge you cannot explain in one line.
- Decision records: one "why" paragraph per major architectural choice; this is what CTOs read.
- Candour: a short "limits and known issues" section per product raises trust (Willison, Anand).
- Third-party signal: merged PRs to external projects, talks (even meetups), podcasts, LinkedIn recommendations, listed with dates.

### 5.4 Conversion by audience
- Recruiters: résumé PDF, dated timeline with tech tags, LinkedIn in sameAs; keep job titles consistent across page, footer and JSON-LD.
- CTOs: architecture notes, evals/test approach, security and IP terms, repo links; CTA = 30-min scoping call.
- Founders: shipping cadence (release timeline), products live, scope clarity; CTA = fixed-scope pilot.
- Indian SMB clients: plain-language outcomes (hours saved, leads handled), WhatsApp/phone CTA, INR pricing band or "starts from", one local case study.

### 5.5 Technical and discoverability checklist
- Static site generator (Astro is the modal choice here: Appleton, Tompkins, Bhayani, Sharma) on a CDN with cache HIT; target homepage under 60 KB HTML and under 10 script tags.
- AVIF/WebP images with explicit dimensions; no WebGL hero; at most one restrained signature interaction, off the critical path; respect prefers-reduced-motion.
- Person + WebSite JSON-LD with sameAs (GitHub, LinkedIn, X), jobTitle, address; FAQPage on the hire page only if the answers are real; SoftwareApplication schema on the Sahkarmi page.
- RSS; sitemap; robots.txt that explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended (a conscious decision); real llms.txt (text/plain) plus llms-full.txt; optionally `.md` mirrors of key pages.
- Skip link, visible focus states, keyboard-accessible nav, light/dark via prefers-color-scheme.
- Public source repo for the site itself (10 of 25 benchmark sites do this).
- Dated changelog/Now page and year-based archives from day one; longevity becomes visible proof over time.

### 5.6 What not to do
No generic "passionate full-stack developer" copy; no 3D hero; no unexplained counters; no CTA to a newsletter that does not exist yet; no five-schema stuffing; no no-store on static pages; no live widgets you will not maintain.

## 6. Sources (URLs fetched or consulted, 2026-11-02)

Benchmark sites (fetched):
- https://simonwillison.net/ ; https://simonwillison.net/robots.txt ; https://github.com/simonw/simonwillisonblog
- https://hamel.dev/ ; https://hamel.dev/robots.txt
- https://eugeneyan.com/ ; https://eugeneyan.com/robots.txt
- https://www.swyx.io/ ; https://www.swyx.io/llms.txt ; https://github.com/swyxio/swyxkit
- https://leerob.com/ ; https://github.com/leerob/next-mdx-blog
- https://brittanychiang.com/ ; https://github.com/bchiang7/v4
- https://karpathy.ai/ ; https://github.com/karpathy/karpathy.github.io
- https://lilianweng.github.io/ ; https://github.com/lilianweng/lil-log
- https://maggieappleton.com/ ; https://maggieappleton.com/robots.txt ; https://github.com/MaggieAppleton/maggieappleton.com
- https://adactio.com/ ; https://adactio.com/robots.txt
- https://interconnected.org/home/
- https://jhey.dev/ ; https://github.com/jh3y/ama
- https://bruno-simon.com/ ; https://github.com/brunosimon/folio-2025
- https://rauno.me/ ; https://rauno.me/robots.txt
- https://www.philschmid.de/ ; https://github.com/philschmid/philschmid.de
- https://antfu.me/ ; https://github.com/antfu/antfu.me
- https://levels.io/ ; https://levels.io/llms.txt
- https://sajalsharma.com/ ; https://sajalsharma.com/llms.txt ; https://github.com/sajal2692
- https://ghuntley.com/ ; https://ghuntley.com/contact/ ; https://ghuntley.com/speaking/ ; https://github.com/ghuntley/ghuntley.com
- https://kevinyank.com/ ; https://kevinyank.com/robots.txt
- https://rohitraj.tech/ ; https://rohitraj.tech/hire ; https://rohitraj.tech/llms.txt ; https://rohitraj.tech/robots.txt
- https://umesh-malik.com/ ; https://umesh-malik.com/llms.txt ; https://umesh-malik.com/robots.txt
- https://www.s-anand.net/ ; https://www.s-anand.net/llms.txt ; https://github.com/sanand0/blog
- https://nadh.in/
- https://arpitbhayani.me/ ; https://arpitbhayani.me/llms.txt ; https://arpitbhayani.me/robots.txt

Reviewed but not tabled:
- https://www.cassie.codes/ (farewell page) ; https://huyenchip.com/ ; https://thesephist.com/ ; https://emilkowal.ski/ ; https://dennissnellenberg.com/ ; https://tholman.com/ ; https://jxnl.co/ ; https://manuarora.in/ ; https://paraschopra.com/ ; https://joshwcomeau.com/ ; https://markdalgleish.com/ ; https://glenmaddern.com/ ; https://jeremy.fast.ai/ (empty shell on fetch)

Discovery searches (snippets only):
- https://www.secondtalent.com/occupations/ai-forward-deployed-engineer/
- https://github.com/sajal2692
- https://www.awwwards.com/websites/portfolio/?country=australia (country filter not reliable)
- https://tympanus.net/codrops/2025/12/05/from-illusions-to-optimization-the-creative-webgl-worlds-of-adrian-gubrica/
- https://elementor.com/blog/best-web-developer-portfolio-examples/
- https://en.wikipedia.org/wiki/Jeremy_Howard_(entrepreneur)
