# Technical SEO / GEO research brief — dhrubo.shop

Prepared 2026-11-02 for Dhrubojyoti Gangopadhyay ("Dhrubo"), personal engineering site on Next.js + Vercel; Google Business Profile "Dhrubo AI Builder".

Method: every factual claim below is tied to a URL that was fetched (WebFetch) or found via WebSearch on 2026-11-02. Where an official page could not be rendered (Bing's help centre and OpenAI's help centre return JS-only or 403 to fetchers) that is stated and a secondary source is marked as such. Items marked **[DOC]** are from vendor documentation; **[SEC]** are secondary/press; **[SPEC]** are community speculation.

Current state observed on the live site (fetched 2026-11-02):

- `https://dhrubo.shop/robots.txt` currently serves: `User-Agent: *` / `Allow: /` / `Host: https://dhrubo.shop` / `Sitemap: https://dhrubo.shop/sitemap.xml`. `Host:` is a Yandex-only directive; Google's parser ignores any field other than `user-agent`, `allow`, `disallow`, `sitemap` ([Google robots.txt spec](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)). Harmless, but not doing anything for Google/Bing.
- Home page title: "Dhrubo | Forward Deployed Engineer & Applied AI Solutions Architect". Headings cover forward deployment, RAG, LangGraph multi-agent, Vapi/Twilio voice, FastAPI/Postgres/Supabase, and three case studies (VAYU OS, ZOYA Voice Agent, Supply Chain Intelligence). No JSON-LD was visible in the fetched HTML, and the page does not mention Sahkarmi.

---

## 1. Crawler governance

### 1.1 Robots.txt mechanics that shape the policy (Google's published parser rules)

Source: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt **[DOC]**

- "Only one group is valid for a particular crawler." A crawler uses the *most specific* `User-agent` group that matches it and ignores the rest. Consequence: **every named group must repeat the `/api/` and private-path Disallows**, otherwise a bot that matches a named group gets no Disallows at all.
- "Both the `user-agent` field name and its value are case-insensitive."
- Conflicts between `allow` and `disallow`: longest (most specific) path wins; on an exact tie Google "uses the least restrictive rule".
- `Sitemap:` is global and "may be followed by all crawlers"; crawlers "ignore the `sitemap` line" when evaluating rules.
- `crawl-delay` is not supported by Google; "Rules other than `allow`, `disallow`, and `user-agent` are ignored by the robots.txt parser." So `Content-Signal:` lines are ignored by Google (they are harmless comments to it).

### 1.2 Crawler reference table (as documented on 2026-11-02)

Purpose key: **SI** = search index, **AR** = AI search/answer retrieval index, **TR** = AI training, **UF** = user-triggered fetch, **CT** = control token only (does not crawl), **SEO** = third-party SEO tool.

| Token (robots.txt) | Operator | Purpose | Honours robots.txt? (per operator) | Official doc |
|---|---|---|---|---|
| `Googlebot` | Google | SI — "Builds Google Search indexes"; governs Search, Discover, Images, Video, News, and AI Overviews/AI Mode eligibility | Yes | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers |
| `Googlebot-Image` | Google | SI — image fetch for Google Images, Discover, favicons/logos in Search features | Yes | same |
| `Google-Extended` | Google | **CT** — no UA string; "used in a control capacity". Governs whether content trains "future Gemini models for Gemini Apps and Vertex AI" and grounding "in Gemini Apps and Grounding with Google Search on Vertex AI". **"Google-Extended does not impact a site's inclusion in Google Search, nor is it used as a ranking signal."** Google also states it plans an AIPREF-style token `user-agent: __usage_ai-training` in early 2027. | n/a (control token) | same |
| `Google-InspectionTool` | Google | Testing tools only (Rich Results Test, Search Console URL Inspection); "no effect on Google Search or other products" | Yes | same |
| `GoogleOther`, `Google-CloudVertexBot` | Google | Generic R&D crawler; Vertex AI agent crawls requested by site owner. No Search effect. | Yes | same |
| `Google-Agent`, `Google-GeminiNotebook` (ex `Google-NotebookLM`), `Google-Read-Aloud`, etc. | Google | **UF** — "Because the fetch was requested by a user, these fetchers generally ignore robots.txt rules." | Generally no | https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers |
| `bingbot` | Microsoft | SI — Bing index, which per Bing's guidelines is the same foundation used for Copilot grounding and citations | Yes | https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0 (page is JS-rendered; text could not be extracted by fetcher — token confirmed by Bing Webmaster Guidelines https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a and **[SEC]** directories) |
| `OAI-SearchBot` | OpenAI | **AR** — "surfaces websites in ChatGPT's search features". "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers" (may still appear as navigational links). ~24h to take effect. | Yes (opt-out mechanism) | https://developers.openai.com/api/docs/bots (platform.openai.com/docs/bots now 301s here) |
| `ChatGPT-User` | OpenAI | **UF** — user-initiated page visits and GPT Actions. "Because these actions are initiated by a user, robots.txt rules may not apply." "ChatGPT-User is not used to determine whether content may appear in Search." Not automatic crawling. | May not | same |
| `GPTBot` | OpenAI | **TR** — "Disallowing GPTBot indicates a site's content should not be used in training generative AI foundation models." | Yes | same |
| `OAI-AdsBot` | OpenAI | Ads page validation only; "not used to train generative AI foundation models" | — | same |
| `ClaudeBot` | Anthropic | **TR** — collects content "that could potentially contribute to their training". Anthropic bots honour "industry standard directives in robots.txt" and also `Crawl-delay`. | Yes | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler (support.anthropic.com URL 301s here) |
| `Claude-User` | Anthropic | **UF** — fetches when a user asks Claude; disabling "may reduce visibility in user-directed web search" | Yes (same policy) | same |
| `Claude-SearchBot` | Anthropic | **AR** — "improve the quality and accuracy of search results"; disabling "prevents Anthropic from indexing your content for search" | Yes | same |
| `anthropic-ai`, `claude-web` | — | **Legacy tokens**; not present in Anthropic's current article. Including them is harmless but undocumented. IP list https://claude.com/crawling/bots.json (fetched: 14 prefixes, no UA strings). | — | same |
| `PerplexityBot` | Perplexity | **AR** — "designed to surface and link websites in search results on Perplexity"; "not used to crawl content for AI foundation models"; Perplexity recommends allowing it | Yes (opt-out mechanism) | https://docs.perplexity.ai/guides/bots |
| `Perplexity-User` | Perplexity | **UF** — "Since a user requested the fetch, this fetcher generally ignores robots.txt rules." Not used for training. | Generally no | same |
| `Applebot` | Apple | SI — Spotlight, Siri, Safari | Yes | https://support.apple.com/en-us/119829 |
| `Applebot-Extended` | Apple | **CT/TR** — does not crawl; opts out of "training Apple's general-purpose foundation models". "Webpages that disallow Applebot-Extended can still be included in search results." Apple also honours `nosnippet` for AI-answer context. | n/a | same |
| `Meta-ExternalAgent` | Meta | **TR + indexing** — "training AI models or improving products by indexing content directly" | Block via robots.txt per doc | https://developers.facebook.com/docs/sharing/webmasters/web-crawlers |
| `Meta-ExternalFetcher` | Meta | **UF** — "this crawler may bypass robots.txt rules" | May bypass | same |
| `meta-webindexer` | Meta | **AR** — Meta AI search results; "Allowing Meta-WebIndexer in your robots.txt file helps us cite and link to your content" | Yes (implied) | same |
| `facebookexternalhit` | Meta | Link previews; may bypass for integrity checks | Partly | same |
| `Bytespider` | ByteDance | **TR** (reported) | **No official documentation found.** Third-party directories report it ignores robots.txt; claims conflict. **[SEC]** | None official. Examples: https://cside.com/blog/how-to-block-bytespider , https://datadome.co/bots/bytespider/ |
| `CCBot` | Common Crawl (non-profit) | Open web archive; the corpus is widely used for AI training (Vercel's bot directory classifies it `ai_crawler`: "crawl web content for AI training and research") | Yes — block with `User-agent: CCBot` / `Disallow: /` | https://commoncrawl.org/ccbot ; https://vercel.com/docs/bot-management |
| `Amazonbot` | Amazon | Mixed — "used to improve our products and services" and "may be used to train Amazon AI models"; respects REP, honours `noindex`/`noarchive` meta, **ignores crawl-delay**. Sister agents: `Amzn-SearchBot` (search incl. Alexa, no gen-AI training) and `Amzn-User` (user fetch, "may not follow all robots.txt directives"). | Yes (Amazonbot) | https://developer.amazon.com/amazonbot |
| `DuckAssistBot` | DuckDuckGo | **AR** — "crawls pages in real-time for our AI-assisted answers"; "This data is not used in any way to train AI models"; opt-out takes 72h and "does not affect organic search rankings" | Yes (opt-out mechanism) | https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot/ |
| `YouBot` | You.com | SI/AR — real-time search results for You.com; "fully respects robots.txt directives, including user-agent specific rules and crawl-delay" | Yes | https://you.com/docs/youbot |
| `cohere-ai` / `Coherebot` | Cohere | Cohere states it does **not** currently operate any crawler for training ("N/A" in its bot table); example token in its doc is `Coherebot`; "It is Cohere's policy to require that crawlers be designed to respect robots.txt". The `cohere-ai` token circulating in blocklists is **not** documented by Cohere. | Policy: yes | https://docs.cohere.com/docs/cohere-web-crawlers |
| `MistralAI-User` | Mistral | **UF** for Vibe; "not used for crawling the web in any automatic fashion, nor to crawl content for generative AI training" | robots.txt "governs which sites these user requests can be made to" | https://docs.mistral.ai/robots/ |
| `MistralAI-Index` | Mistral | **AR** — "not used for generative AI training of any kind" | Yes (implied) | same |
| `MistralAI-Training` | Mistral | **TR** — "Webmasters can disallow this user agent in their robots.txt file" | Yes | same |
| `Timpibot` | Timpi (decentralised search) | SI (+ possible LLM use, per third parties) | **No official crawler doc found**; third-party compliance claims conflict **[SEC]** | None official; e.g. https://promptwatch.com/bots/timpibot |
| `Diffbot`, `Diffbot-User` | Diffbot | Knowledge-graph/search crawl; "Diffbot does not crawl pages for training generative AI foundation models" | Yes by default (disallow + crawl-delay), but may be "ignored/overridden" under a partnership agreement with the site | https://www.diffbot.com/docs/crawl/faq/robots-txt |
| `AhrefsBot`, `AhrefsSiteAudit` | Ahrefs | **SEO** + Yep search index; "Both bots strictly respect robots.txt on both disallow and allow rules, as well as crawl-delay" | Yes | https://ahrefs.com/robot |
| `SemrushBot`, `SiteAuditBot`, `SemrushBot-BA/SI/SWA/OCOB/FT/ESI`, `SplitSignalBot` | Semrush | **SEO** | Yes; crawl-delay capped at 10s | https://www.semrush.com/bot/ |
| Others documented in 2026 | — | `ExaSearchBot`/`ExaUser` (Exa), `kernel-searchbot`, `shapbot` (Parallel), `rovo` (Atlassian), `gemini-deep-research`, `chatgpt-operator`, `Amzn-SearchBot`/`Amzn-User` | per Vercel's verified-bots directory | https://vercel.com/docs/bot-management |
| xAI / Grok | xAI | — | **No official doc found**; third-party reports of undocumented UAs and spoofed browser UAs conflict **[SEC/SPEC]** | e.g. https://stackfox.co/research/grok-user-agent |

Note on `User-agent: *`: any bot not named in a group falls through to `*`. So a permissive `*` group already admits every AR/UF/SI bot above; named groups are only needed to (a) *deny* training bots or (b) explicitly document an allow.

### 1.3 Does Google-Extended affect Search / AI Overviews? (verified)

- Google's common-crawlers page: Google-Extended governs Gemini-app/Vertex training and grounding; "Google-Extended does not impact a site's inclusion in Google Search, nor is it used as a ranking signal." **[DOC]** https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- Google's AI features page: Google-Extended is "used to limit AI training and grounding in some of Google's other systems, not Search itself"; AI Overviews/AI Mode inclusion is governed by Googlebot, `noindex`, `nosnippet`/`max-snippet`/`data-nosnippet`, and (since 2026) the Search Console control. **[DOC]** https://developers.google.com/search/docs/appearance/ai-features
- **Trade-off that matters for a personal brand:** disallowing Google-Extended also removes the site from *grounding* in Gemini Apps and Vertex "Grounding with Google Search" (quoted in Vercel's directory entry which mirrors Google: "Grounding with Google Search on Vertex AI does not use web pages for grounding that have disallowed Google-Extended"). If you want Gemini chat answers to cite dhrubo.shop, keep Google-Extended **allowed**.

### 1.4 Recommended robots.txt policy

Goals: (1) full search indexing; (2) full AI search/answer retrieval of public pages; (3) `/api/` and private paths blocked for everyone; (4) an explicit, documented decision on pure-training crawlers.

Private paths assumed: `/api/`, `/_next/` is intentionally **not** blocked (Googlebot needs JS/CSS chunks to render; blocking `/_next/static/` harms rendering). Add `/admin/`, `/draft/`, `/preview/` only if they exist.

**Option A — "Open" (allow training crawlers).**
Pros: content may enter future model weights (brand recall in offline answers); simplest file; zero risk of mis-blocking a mixed-purpose bot (Amazonbot, Meta-ExternalAgent). Cons: no attribution or control over reuse; no documented evidence that training inclusion produces citations (citations come from retrieval bots, which are allowed in both options).

```txt
# dhrubo.shop robots.txt — Option A (open)
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://dhrubo.shop/sitemap.xml
```

**Option B — "Search-and-answers yes, training no" (recommended default for a consultant whose goal is attributed discovery).**
Pros: keeps every search/retrieval/user-fetch bot (so Google, Bing/Copilot, ChatGPT search, Claude search, Perplexity, DuckAssist, Meta AI, Mistral, You.com, Apple) can index and cite; declines pure-training collection. Cons: `Meta-ExternalAgent` and `Amazonbot` are mixed-purpose (training **and** product indexing), so blocking them may cost some non-search visibility; Google-Extended is deliberately left **allowed** because it gates Gemini grounding; Bytespider reportedly ignores the file anyway (enforce with Vercel's AI-bots ruleset if desired).

```txt
# dhrubo.shop robots.txt — Option B (search + AI answers allowed, AI training declined)
# Policy: public pages may be indexed and cited by search engines and AI answer engines.
# Pure model-training crawlers are declined. Google-Extended is intentionally allowed
# because it also controls grounding in Gemini Apps / Vertex AI (see Google docs).
# Content-Signal line is Cloudflare's proposal (contentsignals.org); Google ignores unknown fields.

User-agent: *
Allow: /
Disallow: /api/
Content-Signal: search=yes, ai-input=yes, ai-train=no

# --- Search and AI-answer retrieval: explicitly allowed (documentation) ---
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: bingbot
User-agent: OAI-SearchBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: DuckAssistBot
User-agent: meta-webindexer
User-agent: MistralAI-Index
User-agent: YouBot
User-agent: Applebot
User-agent: Amzn-SearchBot
Allow: /
Disallow: /api/

# --- AI training crawlers: declined ---
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Applebot-Extended
User-agent: Meta-ExternalAgent
User-agent: CCBot
User-agent: Bytespider
User-agent: MistralAI-Training
User-agent: Amazonbot
User-agent: Timpibot
Disallow: /

Sitemap: https://dhrubo.shop/sitemap.xml
```

Notes on the block:
- User-triggered fetchers (`ChatGPT-User`, `Claude-User`, `Perplexity-User`, `Meta-ExternalFetcher`, `MistralAI-User`, `Google-Agent`) are not named; they fall to `*` (allowed) and mostly ignore robots.txt anyway per their docs.
- `Google-Extended` is not named, so it inherits `*` = allowed. To decline Gemini training *and* grounding, add it to the declined group (documented trade-off above).
- `cohere-ai`/`anthropic-ai` are omitted because neither is documented by its vendor; add if you prefer belt-and-braces.
- Named groups repeat `Disallow: /api/` because of Google's one-group-per-crawler rule.
- Next.js implementation: `app/robots.ts` with an array of `rules`; Next ≥16.3 also supports `other` for non-standard lines such as `Content-Signal` **[DOC]** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots . Drop the current `Host:` line.

### 1.5 Meta robots / X-Robots-Tag

Source: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag **[DOC]**

- Supported: `noindex`, `nofollow`, `none`, `nosnippet`, `indexifembedded`, `max-snippet:[n]`, `max-image-preview:[none|standard|large]`, `max-video-preview:[n]`, `notranslate`, `noimageindex`, `unavailable_after`. Google **ignores** `noarchive`, `nocache`, `nositelinkssearchbox`. No `noai` directive exists in Google's docs.
- `nosnippet` "will also prevent the content from being used as a direct input for AI Overviews and AI Mode"; `max-snippet` "will also limit how much of the content may be used as a direct input for AI Overviews and AI Mode". Google's May-2025 blog: "More restrictive permissions will limit how your content is featured in our AI experiences" https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search .
- Bing: supports `data-nosnippet` since Oct 2025 (https://www.bing.com/webmaster/2025/10/Bing-Introduces-Support-for-the-data-nosnippet-HTML-Attribute/). Per SEJ's summary of Bing's Feb-2026 guideline rewrite **[SEC]**, `NOARCHIVE` keeps content out of Copilot responses/grounding and `NOCACHE` limits Copilot to URL/title/snippet; Bing "recommends against NOCACHE on content meant for Copilot" (https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/).
- **Recommendation:** on public pages use `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`; do **not** use `nosnippet`, `noarchive`, or `nocache`. Use `noindex` (via X-Robots-Tag header from the route) on `/api/*` responses and any utility pages.
- **Search Console "Search generative AI" control** (new in 2026): site-wide toggle managing "inclusion in generative AI features on Google Search, including AI Overviews and AI Mode" (https://developers.google.com/search/docs/crawling-indexing/control-what-you-share, updated 2026-10-21). Press reports default = Include and worldwide rollout by 2026-08-31 **[SEC]** (https://searchengineland.com/google-search-console-ai-performance-reports-and-search-generative-ai-control-rolling-out-globally-462214). Keep it on **Include**; Google's AI guide states a site "must be included in Search generative AI features in Search Console" to be eligible.

### 1.6 Content-Signal, llms.txt, ai.txt

- **Content Signals Policy** (Cloudflare, Sept 2025): robots.txt line `Content-Signal: search=yes, ai-input=yes, ai-train=no`; `search` = "building a search index and providing search results" (explicitly excludes AI summaries), `ai-input` = RAG/grounding, `ai-train` = training/fine-tuning. Cloudflare's managed robots.txt already emits `search=yes, ai-train=no` on 3.8M+ domains. **No AI company is documented as committing to honour it**; Cloudflare itself says "Some companies might simply ignore them." https://blog.cloudflare.com/content-signals-policy/ , https://contentsignals.org/ **[DOC]**. Google's parser ignores unknown fields, so it is safe to include as a declaration.
- **llms.txt**: not adopted by any major engine. John Mueller (Bluesky, 2025-06-17): "FWIW no AI system currently uses llms.txt" (via https://www.seroundtable.com/google-ai-llms-txt-39607.html **[SEC]**). Google's official guide (2026-05-15, note added 2026-06-15): "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search"; llms.txt files "aren't needed for Google Search (and won't negatively or positively impact your visibility or rankings)" https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting and https://developers.google.com/search/updates **[DOC]**. OpenAI, Anthropic, Perplexity, Microsoft bot docs make no mention of llms.txt. Verdict: optional nicety for humans/agents; zero documented ranking or citation effect.
- **ai.txt**: no major-engine documentation; skip.

### 1.7 Vercel / Cloudflare bot-management notes

- Vercel Bot Management (https://vercel.com/docs/bot-management, updated 2026-09-10) **[DOC]**: Bot Protection managed ruleset is **off by default**; it challenges non-browser traffic but "automatically excludes verified bots". **AI bots managed ruleset** is **"Allow" by default**; it can log or deny, and since 2026-10-29 splits **AI crawlers** ("bots that collect content for indexing and model training") from **AI assistants** ("bots that fetch pages in response to user actions or search queries") (https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules). Caveat: Vercel's "AI crawlers" category bundles *indexing* bots (e.g. OAI-SearchBot is listed as `ai_assistant`, but ClaudeBot/GPTBot/CCBot/Meta-ExternalAgent/Amazonbot are `ai_crawler`) — denying the whole category is coarser than robots.txt; for Option B prefer a WAF custom rule on `User-Agent` for the specific training tokens, which is the enforcement layer for bots that ignore robots.txt (Bytespider).
- Bot Protection "doesn't work when a reverse proxy (e.g. Cloudflare...) is placed in front of your Vercel deployment." Don't put Cloudflare proxy in front of Vercel just for bot control.
- Cloudflare (only relevant if DNS is on Cloudflare **unproxied**): managed robots.txt "prepends managed directives and the Content Signals Policy" only when Bot Preference Sync is on and a policy is set to Block; "robots.txt compliance is voluntary" https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/ **[DOC]**. New Cloudflare sign-ups block AI crawlers by default (Pay Per Crawl) **[SEC]** https://searchengineland.com/cloudflare-to-block-ai-crawlers-by-default-with-new-pay-per-crawl-initiative-457708 — if the domain is ever moved to Cloudflare, check that default does not silently block OAI-SearchBot/PerplexityBot.

---

## 2. GEO / AEO — what is documented vs. speculated

### 2.1 Google (AI Overviews, AI Mode) — **[DOC]**

- https://developers.google.com/search/docs/appearance/ai-features : to be a supporting link a page must be "indexed and eligible to be shown in Google Search with a snippet"; "There are no additional requirements to appear in AI Overviews or AI Mode"; no "new machine readable files, AI text files, or markup"; "no special schema.org structured data that you need to add"; "You can apply the same foundational SEO best practices for AI features as you do for Google Search overall."
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (2026-05-15): "optimizing for generative AI search is optimizing for the search experience, and thus still SEO." Eligibility: indexed + snippet-eligible + "included in Search generative AI features in Search Console". Content: "unique expert or experienced takes that go beyond common knowledge and the ordinary" (non-commodity). Mythbusting: no chunking ("no requirement to break your content into tiny pieces"), no AI-specific writing style, inauthentic mentions "isn't as helpful as it might seem", many AEO/GEO "hacks" "aren't effective or supported by how Google Search actually works". Structured data: "isn't required for generative AI search... it's a good idea to continue using it as part of your overall SEO strategy."
- https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search (2025-05-21): "Focus on making unique, non-commodity content"; good page experience; meet technical requirements; "make sure that all the content in your markup is also visible on your web page"; support text with images/video; preview controls restrict AI feature inclusion.
- Changelog items: AI Mode counted in Search Console since 2025-06-16; "Preferred sources" available in AI Mode/AI Overviews (2026-05-27) https://developers.google.com/search/updates .
- Search Essentials remains the baseline: https://developers.google.com/search/docs/essentials .

### 2.2 OpenAI (ChatGPT search) — **[DOC]** where fetched

- Bot doc (https://developers.openai.com/api/docs/bots): OAI-SearchBot is the inclusion mechanism; opting out removes you from "ChatGPT search answers"; you can "allow OAI-SearchBot in order to appear in search results while disallowing GPTBot".
- Launch post (2024-10-31, quoted via press because openai.com returned 403 to the fetcher) **[SEC]**: "ChatGPT search leverages third-party search providers and content directly sourced from our partners" — Bing was the named provider https://www.infoq.com/news/2024/11/chatgpt-search-release . Vendor research (Peec.ai, Sept 2026) argues ChatGPT now blends its own index with several providers **[SPEC]** https://docs.peec.ai/research/chatgpt-search-result-providers .
- Practical implication: being indexed by Bing (Bing Webmaster Tools + IndexNow) and allowing OAI-SearchBot are the two documented levers.

### 2.3 Perplexity — **[DOC]**

- Bot doc (https://docs.perplexity.ai/guides/bots): PerplexityBot "designed to surface and link websites in search results on Perplexity"; "we recommend allowing PerplexityBot in your site's robots.txt".
- Help centre (https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work): searches "in real-time, gathering insights from top-tier sources"; "Each answer includes numbered citations linking to the original sources." **No ranking criteria are published.** Every "how Perplexity picks sources" article found is vendor speculation **[SPEC]**.

### 2.4 Bing / Copilot — **[DOC]** + **[SEC]**

- Webmaster Guidelines (https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a; JS-rendered, summarised by SEJ 2026-02-27 **[SEC]**): guidelines now cover Bing, Copilot and grounding; Bing names "Generative Engine Optimization (GEO)" and says it "doesn't guarantee citations, just as SEO doesn't guarantee rankings"; recommendations: state facts directly, keep entity names consistent, one topic per URL, key info near the top; new abuse definition "Large-scale content generated without oversight, quality control, or editorial review"; "Prompt Injection and AI Manipulation" section.
- Bing blog **[DOC]**: AI Performance report in Bing Webmaster Tools (public preview 2026-02-10, Topics Portfolio 2026-10-13); "Keeping Content Discoverable with Sitemaps in AI Powered Search" (2025-07-31); IndexNow posts (2025-05-19) https://blogs.bing.com/webmaster/ .
- IndexNow (https://www.indexnow.org/documentation): key of 8–128 chars hosted as `https://dhrubo.shop/<key>.txt`; `GET https://<engine>/indexnow?url=...&key=...` or `POST /indexnow` JSON with `host`, `key`, `urlList` (≤10,000); 429 on spam. Participants per https://www.indexnow.org/searchengines.json : Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazonbot. Google does not participate.

### 2.5 Studies on what gets cited (2025–2026)

- **Ahrefs, 2025-07-28** (≈17M cited URLs; https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/) **[industry data]**: AI-cited pages average 1,064 days old vs 1,432 for organic (25.7% fresher); ChatGPT citations ~458 days newer than organic; **AI Overviews slightly older (+16 days)**; Perplexity 1,166 days, Gemini 1,118 days. Freshness matters most for ChatGPT, least for Google.
- **Aggarwal et al., "GEO" (KDD 2024, arXiv 2311.09735)** **[academic]**: reported up to ~40% visibility gains from adding citations, quotations, statistics; keyword stuffing did not help; effects vary by domain.
- **Martinez, "Optimizing Visibility in Generative Engines: A Critical Survey (2023–2026)" (arXiv 2607.14035, July 2026)** **[academic]**: reviews 45 studies; the foundational gains are "conditional on a source already being present in a fixed context"; most reproducible levers are topical relevance and context position; generic heuristics transfer poorly; citation-oriented rewrites can *impair* retrieval; commercial audits show low source overlap and high run-to-run variance.
- Vendor citation indices (Profound, Semrush, Peec etc.) report Reddit/Wikipedia dominance and "pages beyond position 20 cited ~90% of the time by ChatGPT" **[SEC/SPEC]** — methods differ; treat as directional only (e.g. https://www.semrush.com/blog/chatgpt-search ).
- **Separation:** Documented facts = be indexed (Google, Bing), be snippet-eligible, allow retrieval bots, non-commodity content, consistent entity names, keep key facts near the top, keep pages fresh when the subject changes. Speculation = word-count sweet spots, "bullet points get 30% more citations", mandatory FAQ blocks, llms.txt, chunking.

---

## 3. Structured data (Google Search Central + schema.org)

Current gallery (https://developers.google.com/search/docs/appearance/structured-data/search-gallery) lists 25 features incl. Article, Breadcrumb, Local business, Organization, Profile page, Software app. **Not listed:** FAQ, HowTo, Sitelinks search box, Person (standalone), ProfessionalService.

| Type | Status / guidance | Use on dhrubo.shop? |
|---|---|---|
| **Person** | No standalone Google feature; used as `mainEntity` of ProfilePage and as `author` of Article. schema.org: https://schema.org/Person | Yes — one canonical Person node (`@id: https://dhrubo.shop/#person`) with `name`, `alternateName: "Dhrubo"`, `jobTitle`, `url`, `image`, `sameAs` (LinkedIn, GitHub `ganguydhrubo`, dev.to), `knowsAbout`, `worksFor`/`memberOf` as applicable. |
| **ProfilePage** | https://developers.google.com/search/docs/appearance/structured-data/profile-page — for pages whose "primary focus is a single person or organization that is affiliated with the overall website"; valid examples include "An employee page on a company website". Required: `mainEntity` (Person, with `name`). Recommended: `dateCreated`, `dateModified`, `description`, `image`, `sameAs`, `alternateName`, `identifier`. | Yes — on `/about` (or the home page if it is the profile). |
| **WebSite + SearchAction** | Sitelinks search box removed from Search and docs 2024-11-29 (https://developers.google.com/search/updates). `WebSite` itself is still valid schema.org for the site name feature (https://developers.google.com/search/docs/appearance/site-names). | Keep a minimal `WebSite` (`name`, `alternateName`, `url`, `publisher`) for site-name; **drop `SearchAction`** (the site has no internal search). |
| **Organization** | https://developers.google.com/search/docs/appearance/structured-data/organization — no required properties; recommended `name`, `url`, `logo` (≥112px), `sameAs`, `contactPoint`, `description`; influences logo and knowledge panel. Doc says if the site is about a local business use the LocalBusiness subtype instead. | Optional. For a solo brand, prefer Person as the main entity and (if a trading name exists) an `Organization` for "Dhrubo AI Builder" with `founder` → Person. Do not create two competing entities for the same thing. |
| **SoftwareApplication** | https://developers.google.com/search/docs/appearance/structured-data/software-app — required `name`, `offers.price` (0 for free), and `aggregateRating` **or** `review`; recommended `applicationCategory`, `operatingSystem`. Not limited to marketplaces. | Yes for Sahkarmi (Windows desktop app, free, open source) **only if** genuine ratings/reviews exist; otherwise mark up as `SoftwareApplication` without expecting a rich result (still useful for entity linking). |
| **Article / TechArticle** | https://developers.google.com/search/docs/appearance/structured-data/article — "Article objects must be based on one of the following schema.org types: Article, NewsArticle, BlogPosting." **TechArticle is not mentioned** by Google (it is a valid schema.org subtype of Article: https://schema.org/TechArticle ; Google generally accepts subtypes but documents only the three). Recommended: `headline`, `image` (16:9, 4:3, 1:1), `datePublished`, `dateModified` (ISO 8601 with TZ), `author` as Person with `url`/`sameAs`; only the name in `author.name`. | Yes — `BlogPosting` (safe) or `TechArticle` for engineering write-ups; `author` → the `#person` node. |
| **BreadcrumbList** | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb — ≥2 `ListItem`s with `position`, `name`, `item` (last item may omit `item`). Changelog 2025-01-22: breadcrumbs "only appear on desktop search results, not mobile." | Yes on nested pages (`/work/vayu-os`, `/writing/...`). |
| **FAQPage** | Restricted in Aug 2023 to "well-known, authoritative government and health websites"; then **deprecated entirely** — changelog 2026-05-08: "This feature will no longer appear in Google Search starting May 7, 2026"; docs removed 2026-06-15 (https://developers.google.com/search/updates). | **Do not add** for rich results. Visible Q&A sections on the page are still fine (and are what answer engines read); markup gives no Google benefit. |
| **LocalBusiness / ProfessionalService** | LocalBusiness requires `address` and `name` (https://developers.google.com/search/docs/appearance/structured-data/local-business); doc is framed around physical locations. `ProfessionalService`: schema.org says "The general ProfessionalService type for local businesses was deprecated due to confusion with Service" (https://schema.org/ProfessionalService). | **Not recommended** for a solo consultant without a public office: you would have to publish a home address to satisfy the required `address` (and GBP tells SABs to hide it). Instead model the offering as `Person` + `Service`/`Offer` (`serviceType`, `areaServed`, `provider` → Person), and optionally `Organization` with `areaServed`. |

General rule from Google: all marked-up content must be visible on the page (https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

---

## 4. "HGO" — does it exist?

Searched (extended) for "HGO optimization", "human-generated optimization", "HGO SEO", "Human Guidance Optimization". **No search/discoverability methodology called HGO exists in any indexed source.** The only "HGO" hits are metaheuristic algorithms unrelated to search: "Human Group Optimization/Optimizer" (Springer 2011; arXiv 1608.01495) https://link.springer.com/chapter/10.1007/978-3-642-21515-5_37 , https://arxiv.org/abs/1608.01495 . A second search for "HGO" + SEO/generative returned only GEO material (https://en.wikipedia.org/wiki/Generative_engine_optimization). Conclusion: HGO is either a private coinage or a typo for GEO; do not cite it as an industry term.

Nearest evidence-based practice:
- Google "Creating helpful, reliable, people-first content" (https://developers.google.com/search/docs/fundamentals/creating-helpful-content): self-assessment ("Does the content provide original information, reporting, research, or analysis?"), E-E-A-T with "trust is most important", **Who/How/Why** (clear bylines; disclose "how automation or AI-generation was used"; content made "primarily to help people"). Scaled AI text "without manual oversight or curation represents little to no effort."
- Google's AI-optimization guide's "non-commodity" principle and Bing's "editorial review" abuse definition (sections 2.1, 2.4).
- Practical translation for dhrubo.shop: first-hand case studies with real numbers, named author with profile page, change-log dates on articles, explicit disclosure line where AI assisted drafting.

---

## 5. Google Business Profile for a solo AI consultant

Sources **[DOC]**: https://support.google.com/business/answer/13763036 (eligibility & ownership), https://support.google.com/business/answer/3038177 (representation guidelines), https://support.google.com/business/answer/2853879 (address), https://support.google.com/business/answer/7032839 (edit profile / website field).

- Core rule: "To qualify for a Business Profile, a business must make in-person contact with customers during its stated hours." Ineligible: "Brands, organizations, artists, and other online-only businesses"; lead-gen agents; P.O. box/remote mailbox addresses; "An ongoing service, class, or meeting at a location that you don't own or have the authority to represent."
- Service-area businesses (SABs): eligible if the business "travels to customers where they are"; "one profile for the central office or location with a designated service area"; "can't list a 'virtual' office unless that office is staffed during business hours"; home-run SABs should "clear the address from your Business Profile"; co-working space only with signage, staffed, receiving customers.
- Address page: "You should only choose to not show your address if your business is a service-area business"; hidden address → profile "will only show your service area".
- Website field: "Enter the full URL, which includes http:// or https://"; the site must not block Google's crawler; some categories may add extra links (appointments etc.). Google also runs a `google-businesslink-verification` fetcher that checks the URL returns a valid status (Vercel directory) — do not block it.
- **What "Dhrubo AI Builder" can and cannot do:** it is compliant only if Dhrubo actually meets clients in person (on-site forward-deployment in Kolkata/India counts as travelling to customers) → keep it as an SAB with address hidden and a Kolkata-centred service area. If engagements are 100 % remote, the profile is technically an online-only business and is at suspension risk; Google provides no "remote consultant" category. Do not attach a virtual office or coworking address that is not staffed.
- Website ↔ GBP linking: put `https://dhrubo.shop` in the Website field; on the site, put the same business name, phone and service area text, and add the GBP/Maps URL to Person/Organization `sameAs`. **LocalBusiness schema is not required for GBP and is not appropriate without a public address** (section 3); Google's local-business doc never references GBP eligibility.

---

## 6. Keyword / entity intelligence

### 6.1 Current SERP observations (WebSearch, US index, 2026-11-02)

| Query | What ranks now | Knowledge panel / GBP card |
|---|---|---|
| "Dhrubojyoti Gangopadhyay" | Only two relevant hits: dev.to post "Why We Built Sahkarmi…" (https://dev.to/ganguydhrubo/why-we-built-sahkarmi-the-open-source-ai-coworker-that-never-acts-without-your-approval-51mo) and GitHub PR to awesome-ai-devtools (#1337) naming him founder with LinkedIn `dhrubojyoti-gangopadhyay`. Remainder are name-collision Wikipedia pages (Dhrubajyoti Chattopadhyay, Phukan, Sunil/Narayan Gangopadhyay). **dhrubo.shop did not appear.** | No knowledge panel observed. GBP cards are not visible through this tool (US-only, non-local); check manually from an Indian IP / Maps. |
| "Dhrubo AI Builder" | No match. Results are unrelated "Dhrubo" entities (DhruboSoft, Dhrubo IT, Dhrubo Holding, individual GitHub users). | None observed. |
| "dhrubo.shop" | Site not returned; unrelated Dhrubo-named businesses (Displate shop, dhrubo.com.bd, dhruboltd.com, Justdial store). Indicates weak/absent indexing or zero link equity. | — |
| "Sahkarmi AI" | Owned entirely by GitHub (`ganguydhrubo/sahakarmi` repo and release pages), awesome-ai-agents issue #857, dev.to post. **sahkarmi.site did not appear** in the top results. | None. |

Immediate actions implied: verify dhrubo.shop in Google Search Console and Bing Webmaster Tools, submit the sitemap, push IndexNow, and link dhrubo.shop from the GitHub profile/repo README, dev.to profile, and LinkedIn (currently the only pages Google associates with the name). Add the exact string "Dhrubojyoti Gangopadhyay" in visible text and Person markup to defeat the Chattopadhyay/Gangopadhyay name collisions.

### 6.2 Search-volume disclaimer

No free, citable search-volume source was found for these terms. Google Keyword Planner requires an Ads account; Google Trends gives relative interest only. The only public demand proxy found is job-posting data: Indeed counted 5,330 "forward deployed engineer" postings in April 2026 vs 643 in April 2025, and ~19× YoY growth in India in June 2026 **[SEC]** (https://www.scaler.com/topics/forward-deployed-engineer-jobs-grew-1165-percent/ , https://www.deccanchronicle.com/amp/nation/in-other-news/demand-for-forward-deployed-engineers-jumps-19-fold-in-india-report-1995773). Volumes below are therefore **not stated**; "potential" is a qualitative judgement of what a single-author site can realistically rank for.

### 6.3 Keyword map

Legend — Potential: **H** realistic for a personal site within months; **M** possible with strong original content/links; **L** dominated by job boards, vendors, Wikipedia (do not target for rankings; target for AI-answer citation only).

**Branded (navigational) — potential H**

| Query | Intent | Target page |
|---|---|---|
| dhrubojyoti gangopadhyay | nav | `/` + `/about` (ProfilePage) |
| dhrubo ai builder | nav/local | `/` (+ GBP) |
| dhrubo.shop | nav | `/` |
| dhrubo forward deployed engineer | nav | `/` |
| sahkarmi / sahkarmi ai / sahkarmi download windows | nav/transactional | `/sahkarmi` (SoftwareApplication) — or link out to sahkarmi.site with canonical decided once |
| sahkarmi vs openclaw / sahkarmi review | investigational | `/sahkarmi` + comparison post |

**Job-family / service terms (non-branded)**

| Query | Intent | Target page | Potential |
|---|---|---|---|
| forward deployed ai engineer india | commercial | `/services/forward-deployed-engineering` | M (India modifier narrows) |
| forward deployed engineer kolkata | commercial/local | same + GBP | H (tiny competition) |
| hire forward deployed engineer | commercial | same | M |
| what does a forward deployed engineer do | informational | `/writing/what-is-a-forward-deployed-engineer` | L for ranking, M for AI citation if first-hand |
| applied ai engineer consultant | commercial | `/services/applied-ai` | M |
| applied ai engineer vs ml engineer | informational | writing post | L/M |
| agentic ai engineer / agentic ai consultant india | commercial | `/services/agentic-systems` | M |
| ai automation engineer india | commercial | `/services/ai-workflow-automation` | M |
| ai workflow automation for small business india | commercial | same | M |
| whatsapp ai automation for business (VAYU OS angle) | commercial | `/work/vayu-os` | M |
| ai systems architect freelance | commercial | `/services/ai-systems-architecture` | M |
| rag engineering services / production rag consultant | commercial | `/services/rag` | M |
| rag pipeline postgres pgvector supabase | informational/technical | writing post | M (dev long-tail) |
| langgraph multi-agent state machine example | informational/technical | writing post (`/work/supply-chain-engine`) | M |
| vapi twilio voice agent production | informational/technical | `/work/zoya-voice-agent` | M |
| ai voice agent for clinics india | commercial | ZOYA case study | M |
| pl/pgsql rule engine stored procedures ai | technical long-tail | writing post | H (near-zero competition) |

**Question / answer-engine queries (write as explicit Q→A sections with definitions near the top)**

| Query | Target | Potential |
|---|---|---|
| how much does a forward deployed engineer cost in india | services page pricing section | M |
| can an ai agent run on my own computer without sending data to the cloud (Sahkarmi) | `/sahkarmi` FAQ-style section (no FAQPage markup) | M |
| what is a human-approval checkpoint in ai agents | writing post | M |
| how to deploy a rag system on supabase | writing post | M |
| who built sahkarmi | `/about` + `/sahkarmi` | H |

**Generic head terms — do not target for rankings (L):** "applied ai engineer", "forward deployed engineer", "agentic ai engineer", "ai automation engineer", "ai systems architect", "rag engineering", "ai workflow automation" — owned by LinkedIn/Indeed/Glassdoor, vendor glossaries and Wikipedia. Mention them in the H1/Person `jobTitle` for entity association, but build pages around the modified/long-tail forms above.

---

## 7. Action checklist (priority order)

1. Replace robots.txt with Option B (or A, decision recorded); remove `Host:`; add `X-Robots-Tag: noindex` on `/api/*`.
2. Verify in Google Search Console (confirm "Search generative AI" = Include) and Bing Webmaster Tools; submit sitemap; add IndexNow key + ping on publish.
3. Ship JSON-LD graph: `WebSite` → `Person#person` (ProfilePage on /about) → `BlogPosting/TechArticle` with `author`, `BreadcrumbList`, `SoftwareApplication` for Sahkarmi. No FAQPage, no LocalBusiness.
4. Meta robots `max-snippet:-1, max-image-preview:large`; no `nosnippet`/`noarchive`.
5. Entity hygiene: exact full name + "Dhrubo" + "Dhrubo AI Builder" on the site; `sameAs` to LinkedIn, GitHub, dev.to, GBP; reciprocal links from those profiles.
6. Content: non-commodity case studies with numbers; dated change-logs; author byline; AI-use disclosure line.
7. GBP: keep as service-area business with hidden address only if in-person work genuinely happens; website field = https://dhrubo.shop.
8. Vercel Firewall: leave AI-bots ruleset on Allow; if Option B, add a custom deny rule for the training UA tokens as enforcement.

---

## Sources

Google
- Common crawlers (Googlebot, Googlebot-Image, Google-Extended, Google-InspectionTool): https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- Special-case crawlers: https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers
- User-triggered fetchers: https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers
- robots.txt spec: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
- Robots meta / X-Robots-Tag: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Control what you share (incl. Search generative AI control): https://developers.google.com/search/docs/crawling-indexing/control-what-you-share
- AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Optimizing for generative AI features (2026-05-15): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Succeeding in AI search (2025-05-21): https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- Helpful, people-first content / E-E-A-T: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Search Essentials: https://developers.google.com/search/docs/essentials
- Documentation changelog: https://developers.google.com/search/updates
- Structured data gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- ProfilePage: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Organization: https://developers.google.com/search/docs/appearance/structured-data/organization
- Article: https://developers.google.com/search/docs/appearance/structured-data/article
- Breadcrumb: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Software app: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Local business: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Site names: https://developers.google.com/search/docs/appearance/site-names
- Structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- GBP eligibility & ownership: https://support.google.com/business/answer/13763036
- GBP representation guidelines: https://support.google.com/business/answer/3038177
- GBP address: https://support.google.com/business/answer/2853879
- GBP edit profile (website field): https://support.google.com/business/answer/7032839

Other operators
- OpenAI bots: https://developers.openai.com/api/docs/bots
- Anthropic crawlers: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; IPs https://claude.com/crawling/bots.json
- Perplexity bots: https://docs.perplexity.ai/guides/bots ; how it works: https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work
- Apple: https://support.apple.com/en-us/119829
- Meta: https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
- Bing crawlers: https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0 ; guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a ; blog: https://blogs.bing.com/webmaster/ ; data-nosnippet: https://www.bing.com/webmaster/2025/10/Bing-Introduces-Support-for-the-data-nosnippet-HTML-Attribute/
- IndexNow: https://www.bing.com/indexnow ; https://www.indexnow.org/documentation ; https://www.indexnow.org/searchengines.json
- Amazon: https://developer.amazon.com/amazonbot
- Common Crawl: https://commoncrawl.org/ccbot
- DuckDuckGo: https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot/
- You.com: https://you.com/docs/youbot
- Cohere: https://docs.cohere.com/docs/cohere-web-crawlers
- Mistral: https://docs.mistral.ai/robots/
- Diffbot: https://www.diffbot.com/docs/crawl/faq/robots-txt
- Ahrefs: https://ahrefs.com/robot ; Semrush: https://www.semrush.com/bot/
- Cloudflare Content Signals: https://contentsignals.org/ ; https://blog.cloudflare.com/content-signals-policy/ ; managed robots.txt: https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/
- Vercel bot management + verified bots directory: https://vercel.com/docs/bot-management ; AI crawlers vs assistants changelog: https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules
- Next.js robots.ts: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- schema.org: https://schema.org/Person ; https://schema.org/ProfessionalService ; https://schema.org/TechArticle

Studies / secondary (marked [SEC]/[academic] in text)
- Ahrefs freshness study: https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
- Aggarwal et al., GEO (KDD 2024): https://arxiv.org/abs/2311.09735
- Martinez, Critical survey of GEO 2023–2026: https://arxiv.org/abs/2607.14035
- Mueller on llms.txt: https://www.seroundtable.com/google-ai-llms-txt-39607.html
- SEJ on Bing guideline rewrite: https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/
- SEL on Search Console AI control rollout: https://searchengineland.com/google-search-console-ai-performance-reports-and-search-generative-ai-control-rolling-out-globally-462214
- ChatGPT search launch coverage (Bing provider): https://www.infoq.com/news/2024/11/chatgpt-search-release
- Bytespider (no official doc): https://cside.com/blog/how-to-block-bytespider
- HGO (algorithm, not SEO): https://arxiv.org/abs/1608.01495 ; https://link.springer.com/chapter/10.1007/978-3-642-21515-5_37
- FDE job-posting growth: https://www.scaler.com/topics/forward-deployed-engineer-jobs-grew-1165-percent/

Entity checks (WebSearch 2026-11-02): https://dev.to/ganguydhrubo/why-we-built-sahkarmi-the-open-source-ai-coworker-that-never-acts-without-your-approval-51mo ; https://github.com/jamesmurdza/awesome-ai-devtools/pull/1337 ; https://github.com/ganguydhrubo/sahakarmi ; https://github.com/slavakurilyak/awesome-ai-agents/issues/857
