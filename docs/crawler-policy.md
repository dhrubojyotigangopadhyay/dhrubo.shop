# Crawler access policy

Decided 2 November 2026 from vendor documentation checked that day. Implemented in `src/lib/seo/robots.ts`; the live file is `/robots.txt`.

## Goals

1. Full search indexing (Google, Bing and the engines that consume their indexes).
2. Full retrieval and citation by AI answer engines (Google AI Overviews and AI Mode, ChatGPT search, Claude search, Perplexity, Copilot, DuckAssist, Meta AI, Mistral, You.com).
3. `/api/` private for every crawler.
4. An explicit decision on crawlers whose only documented purpose is model training.

## Mechanics that shaped the file

- Google applies only the single most specific `User-agent` group to a crawler and ignores the rest, so every named group repeats `Disallow: /api/`.
- Google's parser recognises only `user-agent`, `allow`, `disallow` and `sitemap`. Unknown lines are ignored; Lighthouse flags them as invalid, so the Cloudflare "Content-Signal" preference is recorded as a comment.
- `Host:` is a Yandex-only directive and was removed.
- `/_next/` is not blocked: Googlebot needs the JS and CSS chunks to render.

## Decision by crawler

| Token | Operator | Documented purpose | Decision |
|---|---|---|---|
| Googlebot, Googlebot-Image | Google | Search index; governs AI Overviews / AI Mode eligibility | Allow |
| Google-Extended | Google | Control token: Gemini training **and** grounding in Gemini apps / Vertex; "does not impact a site's inclusion in Google Search, nor is it used as a ranking signal" | Not named, so inherits `*` = allowed (grounding is wanted) |
| bingbot | Microsoft | Bing index, which Copilot cites from | Allow |
| OAI-SearchBot | OpenAI | ChatGPT search inclusion | Allow |
| ChatGPT-User | OpenAI | User-triggered fetch; may ignore robots.txt | Not named (falls to `*`) |
| GPTBot | OpenAI | Training | Decline |
| Claude-SearchBot, Claude-User | Anthropic | Search index / user fetch | Allow / not named |
| ClaudeBot | Anthropic | Training | Decline |
| PerplexityBot, Perplexity-User | Perplexity | Answer index / user fetch | Allow / not named |
| DuckAssistBot | DuckDuckGo | Answer retrieval, no training | Allow |
| meta-webindexer | Meta | Meta AI search index | Allow |
| Meta-ExternalAgent | Meta | Mixed training and indexing | Decline (trade-off noted) |
| MistralAI-Index / MistralAI-Training | Mistral | Index / training | Allow / Decline |
| Applebot / Applebot-Extended | Apple | Siri and Spotlight index / training only | Allow / Decline |
| Amzn-SearchBot / Amazonbot | Amazon | Search / may train | Allow / Decline |
| YouBot | You.com | Answer index | Allow |
| CCBot, Bytespider, Timpibot | Common Crawl, ByteDance, Timpi | Training or undocumented | Decline |

## What this does not do

- It does not guarantee inclusion in any AI answer. Google documents that AI features require the page to be indexed and snippet-eligible with no special markup; Bing's 2026 guidance says the same. The policy removes blockers; content quality does the rest.
- `llms.txt` is published because it is cheap and accurate, not because any engine documents consuming it.
- Bots that ignore robots.txt (Bytespider is reported to) can only be enforced at the edge; Vercel's bot rules are an option the project owner can enable.

## Review cadence

Re-check vendor documentation quarterly; Google has announced an AIPREF-style token for early 2027 that may replace Google-Extended.

Sources are listed in the research record delivered with the rebuild (`research_seo_geo.md`).
