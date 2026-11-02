# dhrubo.shop

Personal site and engineering platform of Dhrubojyoti Gangopadhyay: forward deployed and applied AI engineer, builder of [Sahkarmi](https://github.com/ganguydhrubo/sahakarmi). Live at [www.dhrubo.shop](https://www.dhrubo.shop).

Rebuilt in November 2026 with one rule: every claim on the site links to public evidence, and the site itself is built to the standard it claims.

## What is in here

| Area | Implementation |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 4 with semantic tokens (`src/app/globals.css`) |
| Content | Typed modules in `src/content/` (profile, projects, FAQ, services) and MDX articles in `src/content/writing/`. One source of truth feeds pages, JSON-LD, `llms.txt`, the RSS feed and the assistant |
| AI assistant | `scripts/build-knowledge.mjs` chunks the content at build time; `src/lib/ai/retrieval.ts` is a dependency-free BM25 index; `src/app/api/chat/route.ts` streams a cited answer from an OpenAI-compatible provider with zod validation, injection containment, hashed-IP rate limiting, timeouts and token caps |
| SEO / GEO | Per-page metadata and canonical on the www host, generated OG images (`/og/...`), Person + ProfilePage + WebSite + TechArticle + BreadcrumbList + SoftwareApplication JSON-LD, sitemap, RSS, `llms.txt` and `llms-full.txt`, a documented crawler policy in `robots.txt` |
| Analytics | GA4 via `@next/third-parties` with Consent Mode v2 defaults, a typed event layer (`src/lib/analytics.ts`) and a single consent banner |
| Security | Per-request nonce CSP with `strict-dynamic` (`src/middleware.ts`), HSTS, frame denial, referrer and permissions policies, server-only secrets, honeypot + schema validation on the contact form |
| Tests | Vitest unit tests (`tests/unit`), Playwright end-to-end with axe accessibility checks on desktop and mobile (`tests/e2e`), GitHub Actions CI |

## Run it

```bash
npm ci
cp .env.example .env.local      # fill GROQ_API_KEY to enable the assistant locally
npm run dev
```

Quality gates, in the order CI runs them:

```bash
npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e
```

`npm test` regenerates `src/generated/knowledge.json` first, so the retrieval tests always run against current content.

## Editing content

- Facts about the person: `src/content/profile.ts`
- Projects and their honest status: `src/content/projects.ts`
- Questions and answers shown on `/about`: `src/content/faq.ts`
- Engagement types on `/services`: `src/content/services.ts`
- Articles: add `src/content/writing/<slug>.mdx` and register it in `src/content/writing.ts`

`tests/unit/content.test.ts` fails the build if a previously removed, unverifiable claim is reintroduced.

## Documentation

- `docs/architecture.md`: decisions and trade-offs
- `docs/crawler-policy.md`: robots.txt rationale with sources
- `docs/analytics.md`: GA4 setup, event taxonomy, conversions
- `docs/deployment.md`: environment variables, Vercel configuration, verification checklist, rollback
