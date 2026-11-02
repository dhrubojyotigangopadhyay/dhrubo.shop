# Quality report: performance, accessibility, security

Measured 2 November 2026. "Before" is the live site at `https://www.dhrubo.shop`. "After" is the rebuilt production build served locally with `next start` on a Windows laptop; the production numbers on Vercel will differ (CDN, Brotli, server location) and must be re-measured after deploy. Raw Lighthouse JSON for every run is in the delivery folder.

## Lighthouse 12, mobile emulation (Moto G Power, slow 4G)

| Page | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| Before: `/` (live) | 59 | 90 | 96 | 100 | 1.7 s | 4.9 s | 980 ms | 0 | 2,653 KiB |
| After: `/` (median of 3 runs; range 71 to 88) | 77 | 100 | 100 | 92 | 3.7 s | 4.3 s | 92 ms | 0 | 583 KiB |
| After: `/` (best of those 3 runs) | 88 | 100 | 100 | 92 | 2.0 s | 3.5 s | 92 ms | 0 | 583 KiB |
| After: `/projects/sahkarmi` | 91 | 100 | 100 | 92 | 1.8 s | 2.9 s | 200 ms | 0.018 | 497 KiB |
| After: `/writing/approval-gates-for-ai-agents` | 95 | 100 | 100 | 92 | 1.8 s | 2.6 s | 110 ms | 0 | 449 KiB |
| After: `/` desktop preset | 98 | 100 | 100 | 92 | 0.9 s | 0.9 s | 0 ms | 0.002 | 581 KiB |

## Lighthouse 12 on the Vercel preview (CDN, Mumbai region, final build with system body font)

| Page | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| `/` mobile, median of 3 (range 95 to 99) | 96 | 100 | 100 | 92 | 1.2 s | 2.6 s | 96 ms | 0 | 527 KiB |
| `/projects/sahkarmi` mobile | 98 | 100 | 100 | 92 | 0.9 s | 2.4 s | 57 ms | 0 | 506 KiB |
| `/` desktop | 99 | 100 | 100 | 92 | 0.3 s | 1.0 s | 0 ms | 0 | 524 KiB |

Preview URL: https://dhrubo-shop-rebuild-preview.vercel.app (scratch project under a different Vercel team, no environment variables, so the assistant and contact delivery report themselves unconfigured). The jump from the laptop numbers came from two things: Brotli and a warm CDN edge, and removing the Inter body font after the LCP breakdown showed the hero paragraph re-painting when the font arrived (render delay 2.1 to 3.6 s before, 1.05 s after).

Notes:

- Page weight fell by 80 percent on the home page (2,653 to 527 KiB on Vercel). The remainder is scripts (Next runtime, React, Motion, the GA tag), two Newsreader font files, the HTML and the portrait.
- Home-page mobile scores varied between 71 and 88 across three consecutive runs on the laptop; server response time was 19 to 62 ms in every run, so the variance is in Lighthouse's simulated critical request chain (stylesheet, fonts, hydration) on a shared laptop, not in the server. The LCP element is the hero paragraph (text, no image). Production on Vercel (CDN, Brotli, warm functions) must be measured with PageSpeed Insights after deploy; the local number is a floor, not a forecast.
- SEO 92 is one audit: Lighthouse looks for the description tag in `<head>`, and Next.js 15 streams metadata into the body for dynamically rendered pages when the client is a normal browser (React hoists it into `<head>` after hydration). Crawlers that do not execute JavaScript, including every AI crawler and link-preview bot named in `next.config.ts`, receive the tags in `<head>`; verified with `curl -A GPTBot` and `curl -A Chrome-Lighthouse`. Googlebot renders JavaScript. A full fix means removing the per-request CSP nonce so pages render statically; that trade-off is recorded in `docs/architecture.md` and left for the owner.
- `bf-cache` is reported on all pages because the response carries `Cache-Control: no-store` style headers from dynamic rendering; same root cause.

## Accessibility

- axe-core 4.14 (WCAG 2.0 A/AA + 2.1 AA) via Playwright on six pages, desktop and Pixel 7 viewports: zero serious or critical violations, enforced in CI (`tests/e2e/site.spec.ts`).
- Fixes made during QA: contrast of the accent and gold tokens in light mode, an unlabeled home link, invisible button text from a wrong colour utility, mid-animation contrast failures removed by not animating opacity in the demo, hidden below-the-fold content caused by scroll-triggered reveal (removed).
- Keyboard: all interactive elements reachable; mobile menu closes on Escape; demo actions are buttons with `aria-pressed`.
- Reduced motion disables transitions globally and stops the demo auto-advance.

## Security

Headers verified on every response from the local build:

| Header | Value |
|---|---|
| `content-security-policy` | `default-src 'self'; script-src 'self' 'nonce-…' 'strict-dynamic' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://stats.g.doubleclick.net; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'; upgrade-insecure-requests` |
| `strict-transport-security` | `max-age=63072000; includeSubDomains; preload` |
| `x-frame-options` | `DENY` |
| `x-content-type-options` | `nosniff` |
| `referrer-policy` | `strict-origin-when-cross-origin` |
| `permissions-policy` | camera, microphone, geolocation, interest-cohort disabled |
| `cross-origin-opener-policy` | `same-origin` |
| `x-powered-by` | removed |

API hardening:

- `/api/chat`: zod schema (max 8 messages, 1,200 chars each, roles user/assistant only), control-character and bidi stripping, override-phrase detection (logged, not blocked), fenced visitor text, retrieval-only grounding with mandatory citations, 450-token cap, 20 s upstream timeout, sliding-window rate limit keyed by salted SHA-256 of the IP, 503 with a clear message when no key is configured. Secrets are read server-side only.
- `/api/contact`: zod schema, honeypot field, consent required, 3,000-char message cap, rate limited, Resend delivery or 503 with mailto fallback. No personal data stored by the site.
- Dependencies: Next.js 15.5.28 carries the 2026 security backports. After `npm audit fix`, `npm audit` still reports 18 advisories (16 moderate, 2 high). All are in build-time or lint-time tooling: the ESLint 9 toolchain (`minimatch` globbing, fixed only by ESLint 10 / a future `eslint-config-next`), `postcss` as bundled inside Next's compiler (fixed only in Next 16), and `brace-expansion` under the same tree. None of these packages runs in the deployed server or browser bundle. Re-evaluate when upgrading to Next 16.
- Residual: `style-src 'unsafe-inline'` (Motion inline styles); in-memory rate limit is per instance on Vercel; no WAF or bot rules configured (owner can enable Vercel Bot Protection).

## Test inventory

| Suite | Count | Covers |
|---|---|---|
| Vitest unit | 32 tests in 5 files | BM25 retrieval over the generated knowledge base, guard schema and injection handling, rate limiter and IP hashing, robots/sitemap/feed/llms/JSON-LD builders, content integrity (banned claims, slugs, article files, contact schema) |
| Playwright e2e | 27 tests × 2 projects (desktop, Pixel 7) = 54 | every route's status/h1/canonical/description/JSON-LD, 404, machine endpoints and content types, security headers, navigation, demo interaction, theme persistence, consent banner, assistant streaming with mocked API and the unconfigured path, API input rejection, contact validation and mailto fallback, axe on six pages |
| Static | lint, `tsc --noEmit`, production build | run in CI before tests |

All green locally on 2 November 2026 (unit 32/32, e2e 54/54, two consecutive runs).
