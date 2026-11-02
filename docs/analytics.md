# Analytics

## Property

GA4 measurement ID `G-1M1HKNCHYB`. It was present in the static site from January 2026 and silently dropped when the site was rebuilt in Next.js in September 2026 (confirmed by `git log -S gtag/js`). The rebuild restores the same property so history continues. The ID is set by `NEXT_PUBLIC_GA_MEASUREMENT_ID` and defaults in `src/lib/site.ts`.

Audit limitation: the GA4 admin, Search Console and Google Tag Manager interfaces were not accessible from this session (no Google credentials). Everything below describes what the site sends; property-side configuration (conversion marking, data retention, Search Console link) is listed as owner action in `docs/deployment.md`.

## Consent

Consent Mode v2 default is set in the root layout before the tag loads: `analytics_storage=denied`, all ad signals denied, `wait_for_update=500`. The banner (`src/components/site/Analytics.tsx`) stores the choice in local storage and calls `gtag('consent','update')`. Accepting enables an analytics cookie; declining keeps cookieless pings only. Ad signals are never granted.

## Event taxonomy

All events go through `track()` in `src/lib/analytics.ts`; nothing else calls `gtag`. Each event fires once per interaction.

| Event | Where | Parameters |
|---|---|---|
| `page_view` | automatic (GA4) | |
| `scroll_depth` | every page, thresholds 25/50/75/90 once per view | `percent`, `page_path` |
| `project_view` | `/projects/[slug]` | `project`, `status` |
| `case_study_view` | released or live projects | `project` |
| `github_click`, `linkedin_click`, `email_click`, `whatsapp_click`, `outbound_link_click` | `TrackedLink` | `href`, `label` |
| `enquiry_start` | first focus in the contact form | |
| `enquiry_submit` | successful API delivery, or mailto fallback | `intent`, `channel` |
| `ai_assistant_open` | widget open or `/ask` page view | `surface`, `page_path` |
| `ai_question_submit` | question sent | `surface`, `length` |
| `ai_response_received` | stream complete | `surface`, `ms`, `sources` |
| `ai_source_click` | citation or source chip | `surface`, `url` |
| `resume_view` | `/resume` | |
| `resume_download` | PDF button | |
| `theme_toggle` | header | `theme` |
| `consent_update` | banner | `value` |

Removed from the brief's list: `contact_click` is covered by `email_click` and `whatsapp_click` to avoid double counting.

## Conversions to mark in GA4 (owner action)

Key events: `enquiry_submit` (primary), `resume_download`, `ai_source_click`. Secondary engagement: `case_study_view`, `github_click`. Vanity, not conversions: `scroll_depth`, `theme_toggle`.

Suggested explorations: acquisition by channel with landing page; organic queries (after linking Search Console); project engagement (`project_view` by `project`); assistant funnel `ai_assistant_open` → `ai_question_submit` → `ai_response_received` → `ai_source_click`; enquiry funnel `enquiry_start` → `enquiry_submit` split by `intent`.

## Verification

- Local: open the site with the GA4 DebugView extension or `?debug_mode=1` after accepting consent; events appear with the parameters above.
- Duplicate check: `tests/e2e` asserts a single GA script tag; `track()` is the only emitter.
