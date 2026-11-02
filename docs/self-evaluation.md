# Self-evaluation: would this get Dhrubo an interview?

Written 2 November 2026 as the brief required: a senior recruiter at an AI lab or an AI-native startup opens `www.dhrubo.shop` after this rebuild is deployed. Scored honestly, with the weaknesses first.

## Where it is weak

1. **Not deployed by the builder.** The rebuild is complete, tested and documented, but it is not live. Push access to the repository and the Vercel project were not available in the session. Until the owner merges and deploys, the live site is still the September version with the dead GitHub link and the 59 performance score. A recruiter today sees the old site.
2. **One flagship, several prototypes.** Sahkarmi is strong evidence. Of the other eight projects, three are live web products with thin public proof (no usage numbers), and four are honestly labelled prototypes. A lab recruiter will notice that the depth is concentrated in one project.
3. **Thin writing record.** Four articles, all dated the same day, all written during the rebuild. Credibility from writing comes from cadence over months. The content plan in `docs/positioning.md` exists; it has not been executed.
4. **No third-party validation.** No testimonials, no conference talks, no named clients, no external coverage. The site does not fabricate any; it just does not have them.
5. **Assistant depends on a key.** On a deployment without `GROQ_API_KEY`, `/ask` shows an honest "not configured" message. That is better than a broken chat, but a recruiter who clicks "Ask" and gets a placeholder will think less of the site. The owner must set the key before sharing the link.
6. **Mobile performance is 71 to 88 (median 77) on a laptop server** with LCP between 3.5 and 4.4 s on simulated slow 4G. Vercel's CDN should improve it, but that is a prediction, not a measurement.
7. **Phone number inconsistency.** The site and WhatsApp link use +91 82408 01921; the PDF résumé uses +91 98740 76688. The owner must pick one.
8. **Metadata is streamed for browsers** because pages render dynamically for the CSP nonce. It is in `<head>` for every non-JavaScript crawler and Googlebot renders JavaScript, but Lighthouse docks SEO to 92 for it and a purist reviewer could raise it.

## Where it is strong

1. **Every number is clickable and dated.** Fifty releases, 277 commits, 72 merged PRs, Microsoft Store ID, Scoop bucket, test counts. The hero says when the facts were checked. This is rare on engineer portfolios and recruiters at labs are specifically trained to look for it.
2. **The site demonstrates the job.** The approval-flow demo is the actual permission model from Sahkarmi; the assistant is a real retrieval system that explains itself and cites sources; the contact form degrades honestly. An FDE candidate's site should show FDE judgement, and this one does.
3. **Honest statuses and limitations** on every project. "Prototype" is written where it is true.
4. **Engineering hygiene a reviewer can verify in two minutes:** public source, CI, 32 unit tests, 54 end-to-end tests including axe on both viewports, nonce CSP, typed analytics, documented ADRs and a crawler policy with sources.
5. **The sixteen-year operations story is coherent** and connected to the engineering: the writing explains why approval gates exist, in the voice of someone who ran dealer networks.
6. **Measured improvement:** mobile performance 59 to a median of 77 on the home page (best run 88) and 91 to 95 on inner pages, accessibility 90 to 100, page weight down 78 percent, zero serious axe violations, all headers in place.

## Scorecard (recruiter view, 1 to 5)

| Dimension | Score | Why |
|---|---|---|
| Clarity of role and positioning | 5 | One sentence, consistent everywhere |
| Proof of shipped work | 4 | Sahkarmi is excellent; the rest is thinner |
| Technical credibility of the site itself | 5 | Tests, CSP, retrieval, docs |
| Writing and thought leadership | 2 | Four same-day articles |
| Social proof | 1 | None |
| Design and usability | 4 | Clean, fast, accessible; deliberately restrained rather than spectacular |
| Honesty and trust | 5 | Verification dates, limitations, no inflated numbers |

**Overall: a clear interview-stage pass for Applied AI and Forward Deployed roles once deployed, with the writing cadence and social proof as the next ninety days' work.** Before deployment, the live site still argues against the candidate.

## What would move the score fastest

1. Owner deploys this rebuild and sets the three environment variables (one evening).
2. Publish one article every two weeks from the plan; backdate nothing.
3. Ask two former colleagues or one Sahkarmi user for a quoted, attributable line; add a testimonials block only when real ones exist.
4. Record a two-minute screen capture of Sahkarmi approving and rejecting an action; embed it on the project page.
5. Resolve the phone number and re-export the résumé.
