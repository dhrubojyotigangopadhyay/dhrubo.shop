# Deployment

## Current production (observed 2 Nov 2026)

- `dhrubo.shop` 308-redirects to `https://www.dhrubo.shop`; the www host is served by Vercel (`Server: Vercel`, `x-vercel-id: bom1`).
- DNS: apex A `216.198.79.1`, `www` CNAME to `*.vercel-dns-017.com`. No TXT verification records.
- The Vercel project is attached to the GitHub repository `dhrubojyotigangopadhyay/dhrubo.shop`; the deployed build corresponds to the commit of 6 Sep 2026. One later local commit (27 Oct 2026) was never pushed.

## Access limitations found during this rebuild

| Needed | Status | Owner action |
|---|---|---|
| Push to `dhrubojyotigangopadhyay/dhrubo.shop` | Denied (403) for the GitHub accounts logged in on this machine (`ganguydhrubo`, `dhrubojyoti-1xl`, `workspace1xl-cmd`) | Either log in as `dhrubojyotigangopadhyay` and push the `rebuild/world-class-2026-11` branch, or add `ganguydhrubo` as a collaborator |
| Vercel project for dhrubo.shop | Not visible in the only Vercel team available here (`dgg3`) | Deploy from the Vercel account that owns the domain, or transfer the project |
| Google Analytics admin, Search Console, Google Business Profile | No Google credentials in this session | Complete the checklists below |
| Model and email provider keys | None available | Set `GROQ_API_KEY`, `RESEND_API_KEY`, `CONTACT_FROM` in Vercel |

## Environment variables

See `.env.example`. `NEXT_PUBLIC_SITE_URL` must be `https://www.dhrubo.shop` in production so canonical, sitemap and JSON-LD match the host Vercel serves. If the owner prefers the apex as canonical, flip the redirect direction in Vercel Domains first, then change this variable.

## Deploy steps

1. Merge the rebuild branch to `main` (CI must be green: lint, typecheck, unit, build, e2e).
2. In Vercel: Node 22, build command `npm run build` (the `prebuild` hook generates the knowledge base), framework Next.js, add environment variables.
3. Deploy. Vercel keeps previous deployments; rollback is "Promote to Production" on the prior deployment, one click, no DNS change.

## Post-deploy verification checklist

Run against `https://www.dhrubo.shop`:

- [ ] `/api/health` returns `ok:true`, `assistantConfigured:true`, `contactConfigured:true`
- [ ] `/`, `/about`, `/projects`, `/projects/sahkarmi`, `/writing`, `/services`, `/ask`, `/contact`, `/resume` return 200; `/nope` returns 404
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/feed.xml`, `/og`, `/google2b1b04098cb099d4.html`, `/BingSiteAuth.xml` return 200
- [ ] Response headers include `content-security-policy` with a nonce, `strict-transport-security`, `x-frame-options: DENY`
- [ ] Ask a question on `/ask`; answer streams with source chips
- [ ] Submit the contact form; email arrives (or mailto fallback appears if unconfigured)
- [ ] GA4 DebugView shows `page_view`, `scroll_depth`, `ai_question_submit` after accepting consent
- [ ] Rich Results Test on `/`, `/projects/sahkarmi`, `/writing/approval-gates-for-ai-agents` validates Person/ProfilePage, SoftwareApplication, TechArticle
- [ ] PageSpeed Insights mobile: performance ≥ 85, accessibility ≥ 95
- [ ] `npm run test:e2e` with `PLAYWRIGHT_BASE_URL` pointed at production (optional)

## Google Search Console (owner action)

1. Add a **Domain** property for `dhrubo.shop` (DNS TXT) so both hosts and both schemes are covered; the two HTML verification files are restored in `public/` for the legacy URL-prefix properties.
2. Submit `https://www.dhrubo.shop/sitemap.xml`. The old sitemap listed one URL on the apex host, which redirects; that is the likely cause of any earlier "couldn't fetch" or "redirect" reports.
3. Under Settings → "Search generative AI", confirm the site is set to Include.
4. Link the property to the GA4 property.
5. Request indexing for `/`, `/about`, `/projects/sahkarmi` after deploy.

## Google Business Profile "Dhrubo AI Builder" (owner action)

Google's eligibility rules require in-person contact with customers; online-only businesses are ineligible and virtual offices are not allowed. Keep the profile only if on-site client work genuinely occurs; if kept: category "Software company" or "Business management consultant", website `https://www.dhrubo.shop/services`, hide the address (service-area business), description copied from the About page summary, no reviews solicited that did not happen. No LocalBusiness schema is emitted by the site for this reason.

## Bing

`BingSiteAuth.xml` is restored. Submit the sitemap in Bing Webmaster Tools; IndexNow is optional.
