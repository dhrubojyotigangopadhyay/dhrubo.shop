# Design system

Name: Ledger. A site about keeping records of what an agent did should look like a well-kept ledger: paper, ink, one accent for things that need a decision.

## Principles

1. Proof before polish. Every number is a link; nothing decorative sits above the fold except the portrait.
2. Text first. The benchmark of 25 engineer sites found the ones recruiters cite are readable without JavaScript. This site renders fully server-side.
3. Motion explains or it is cut. The one animated component is the approval-flow state machine, and it respects `prefers-reduced-motion`.
4. Two themes, same contrast. Light is default; dark follows the system or the toggle and is persisted.

## Tokens (`src/app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f6f2ea` | `#0c0e12` | page |
| `--surface` / `--surface-2` | `#fffdf8` / `#efe9dd` | `#141720` / `#1b1f2a` | cards, inputs |
| `--ink` / `--ink-soft` / `--muted` | `#121417` / `#2b2f36` / `#5c6168` | `#eeeae1` / `#d4cfc4` / `#9aa0a8` | text levels, all ≥ 4.5:1 on `--bg` |
| `--line` / `--line-strong` | ink at 12% / 28% | ink at 12% / 30% | borders |
| `--accent` / `--accent-ink` | `#c94c12` / `#ffffff` | `#ff7a3d` / `#120904` | decisions, gates, focus |
| `--cobalt` | `#1f4fd8` | `#6f93ff` | links in prose |
| `--forest` | `#1f5f3f` | `#5fbf8a` | allowed / shipped |
| `--gold` | `#8a6410` | `#f0c05a` | record keys (the always-dark record panel uses the dark value explicitly) |
| `--code-bg` / `--code-ink` | `#1a1d23` / `#e9e4d8` | `#0a0c10` / `#e9e4d8` | execution record, code |
| `--radius` / `--shadow` | 14 px / soft two-layer | same / deeper | cards |

Tailwind 4 `@theme inline` maps each to `bg-*`, `text-*`, `border-*` utilities (`text-paper` is the bg colour for text on ink buttons).

## Type

- Display: Newsreader (serif), normal and italic, for h1 and h2 only.
- Body and UI: Inter, 16 px base, 1.6 line height.
- Mono: system stack (`ui-monospace`, Cascadia Mono, Consolas, Menlo). The eyebrow style is 10 to 11 px mono, uppercase, 0.18 em tracking.
- Scale: h1 2.6rem on phones, 3.75rem from 640 px, 4.4rem from 1024 px; prose h2 `clamp(1.6rem, 2.4vw, 2rem)`; prose max width 68ch.

## Layout

- Container 72rem (1152 px) with 16 px gutter on phones, 24 px from 640 px.
- Sections separated by 1 px `--line` rules and 4 to 6 rem vertical rhythm.
- Grids: 12 columns on desktop collapsing to one; cards use 1.5rem padding and 0.75rem radius.

## Components (`src/components`)

| Component | Notes |
|---|---|
| `Header` | Sticky, translucent, mobile menu with `aria-expanded`, Escape to close, focus trap not needed (menu is inline) |
| `ButtonLink` | primary (ink on paper), secondary (bordered), ghost; external links get `rel="noopener noreferrer"` |
| `Stat` | Value, label, detail and an optional `href`. The four proof stats on the home page each link to their evidence (GitHub releases, merged PRs, projects, about) |
| `Badge` | Status chips with semantic colours (released = forest, prototype = muted) |
| `Breadcrumbs` | Visible and mirrored in BreadcrumbList JSON-LD |
| `ApprovalFlow` | Client component; five stages, four actions, auto-advances, replay button, `aria-pressed` on action buttons, skipped stages marked with a dashed border and a visually hidden "skipped" label |
| `AssistantPanel` | Streaming answer, source chips, suggested questions; labelled input and buttons |
| `ContactForm` | Honeypot, zod on both sides, `aria-invalid` and inline errors, `role="alert"` result |
| `Reveal` | Intentional no-op wrapper (see ADR-6) |

## Accessibility rules

- Focus visible everywhere via `focus-visible:outline-accent`.
- Skip link to `#main`.
- Icon-only buttons carry `aria-label`; decorative images have empty alt.
- Reduced motion disables all transitions (global rule) and the demo auto-advance.
- Colour never carries meaning alone: status chips carry text.

## Imagery

One portrait (`public/dhrubo-portrait.jpg`, 800 × 800 JPEG), used as hero image, avatar and in generated OG images. No stock imagery, no 3D.
