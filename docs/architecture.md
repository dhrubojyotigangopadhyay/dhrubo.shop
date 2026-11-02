# Architecture and decisions

Date: 2 November 2026. Status of each decision is "accepted" unless noted.

## ADR-1: Keep Next.js 15 App Router on Vercel

The existing repository already used Next.js 15, React 19 and Tailwind 4 and built cleanly. There was no measurable requirement that a migration (Astro, SvelteKit) would satisfy better, and the AI assistant needs a server route in any case. Next was bumped to 15.5.28 for the security backport. Node runtime is used for API routes (streaming, `crypto.subtle`, no edge-only constraints).

Trade-off accepted: pages that read the CSP nonce render dynamically rather than as static HTML. TTFB on Vercel remains well under the LCP budget; the benefit is a real nonce-based CSP instead of `'unsafe-inline'`.

## ADR-2: Content as typed modules, not a CMS

Profile, projects, FAQ and services live in `src/content/*.ts`; articles are MDX. One source feeds pages, JSON-LD, `llms.txt`, RSS and the assistant's knowledge base, so they cannot drift. A CMS would add an external dependency, a login surface and a sync problem for a site edited by one engineer who is comfortable in git.

## ADR-3: Retrieval without a vector database

The corpus is about 100 passages. A BM25 index built in memory at module load answers a query in under a millisecond and is deterministic, testable and free. Embeddings would add a provider call, a store and a cost for no measurable gain at this size. The index interface is small enough that a vector or hybrid retriever can replace it if the corpus grows by an order of magnitude.

## ADR-4: Assistant grounding and containment

The model receives only retrieved passages tagged with ids and must cite them. Visitor text is wrapped in `<visitor_message>` delimiters after sanitisation; the system prompt states that delimited text is data. Override phrasing is detected and logged as a flag but not blocked, because false positives would frustrate real visitors; the containment comes from grounding plus the delimiter rule, not from the pattern list. Output is capped at 450 tokens and the upstream call times out at 20 seconds.

## ADR-5: In-memory rate limiting, pluggable

Rate limiting is a sliding window keyed by a salted SHA-256 of the client IP, stored in memory. On Vercel this is per function instance and resets on cold start. For a personal site with a cost-capped model this is acceptable; the `RateLimiter` interface is async so a shared store (Upstash Redis) can be dropped in without touching the route. Stated plainly in `/ask` and `/privacy`.

## ADR-6: No WebGL hero, motion only where it carries meaning

The previous site loaded 48 WebP frames (2 MB) for a canvas scrubber that scanned a line across a portrait, and scored 59 on mobile performance with a 4.9 s LCP. The benchmark of 25 world-class engineer sites found no applied-AI site with a 3D hero and found creative motion quarantined to places where it is the point. The rebuild spends its interaction budget on one thing that explains the work: the approval-flow state machine (`ApprovalFlow.tsx`), which honours reduced motion and works with a keyboard. Three.js and React Three Fiber were evaluated and not adopted; the evaluation is in the research record.

## ADR-7: Fonts

One self-hosted family via `next/font`: Newsreader (normal and italic) for display headings, latin subset, `display: swap`. Body text uses the system sans-serif stack and code uses the system monospace stack. Inter and JetBrains Mono were removed after Lighthouse on the Vercel preview showed the LCP element (the hero paragraph) waiting on the body font: dropping it removes about 63 KB from the critical path and makes the first paint the final paint for body text.

## ADR-8: GA4 with Consent Mode, one implementation

The measurement ID in git history (removed when the site moved from static HTML to Next.js in September 2026) is reused so the property's history continues. The consent default is set in the root layout before the tag loads. No second analytics vendor is loaded.

## ADR-9: Crawler policy

See `docs/crawler-policy.md`. Search and answer-engine crawlers are allowed; pure training crawlers are declined; Google-Extended is left allowed because it also governs Gemini grounding and has no effect on Search.

## ADR-10: Contact delivery with an honest fallback

The form posts to `/api/contact`, which sends through Resend when configured. Without credentials it returns 503 and a prefilled `mailto:` so no enquiry is lost. Both paths emit the same `enquiry_submit` event with a `channel` parameter.

## Known limitations (as of 2 Nov 2026)

- Repository push access and the Vercel project that serves `dhrubo.shop` are owned by accounts not available to the builder; see `docs/deployment.md`.
- The assistant is only live where `GROQ_API_KEY` is set.
- Middleware CSP uses `style-src 'unsafe-inline'` because Motion writes inline styles.
- Pages render dynamically (nonce); a future change could switch to static rendering with hash-based CSP if TTFB becomes a concern.
