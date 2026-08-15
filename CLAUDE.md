# Noema marketing site

Pre-launch marketing site for Noema. Live at https://noemabrain.com, repo at
https://github.com/sachusnair/noema_website.

## Working agreement

- Commit and push to `main` after each piece of work lands. The client works in
  short cycles and expects changes live without asking twice.
- Verify in the browser before saying something is done. Measure rather than
  eyeball: read `getBoundingClientRect()` and computed styles, do not trust a
  screenshot alone.
- Flag a concern once, then build what was asked. The client has overridden
  several rules from the original brief deliberately; do not re-litigate.

```bash
npm run dev      # dev server
npm run build    # static export to out/
npx tsc --noEmit # must be clean
npx eslint . --max-warnings=0   # must be clean, zero warnings
```

## What it is, and who it is for

An AI operations product for UK SMEs. The buyer is an operations manager or MD,
**not technical**, sceptical, time-poor. They are not impressed by AI language.

Positioning has moved during the build. It began as "an overnight brief you
read at 08:00" and is now "an AI employee that does the work and asks for
approval". The page reflects the newer framing. If asked to write copy, write
for the operator, about outcomes, not about plumbing.

## Architecture

- Next.js 15 App Router, TypeScript, `src/`, `output: "export"` (static, no
  server, no API routes)
- Tailwind v4, CSS-first via `@theme` in `src/app/globals.css`
- Framer Motion for reveals only
- No component library. Everything is hand-built.

**All copy lives in `src/content/site.ts`** as typed exports. Components hold no
literal strings. To change wording, edit that file, not a component.

## Design rules

Tokens are in `globals.css` under `@theme`. Never hardcode a hex in a component.

| Token | Value | Means |
| --- | --- | --- |
| `--color-void` | `#0A0A0B` | Page background |
| `--color-carbon` | `#131417` | Card surfaces |
| `--color-bone` | `#EDEDEA` | Body text |
| `--color-ash` | `#82858C` | Secondary text, hairlines |
| `--color-ember` | `#FF5A1F` | The one accent. Action, priority, "needs you" |
| `--color-live` | `#3DB37A` | Healthy/running only. The only non-ember signal |

Ember means *needs you*. Green means *running fine*. Do not use ember for both;
that collision was a real bug once already.

Brand logos in the connections marquee and the hero graphic carry their own
colours. That is deliberate and does not break the one-accent rule, because
they are third-party marks rather than the site signalling anything.

### Gotcha: display type classes beat Tailwind utilities

`.type-display-l/m/s` and `.type-payoff` are plain unlayered CSS. A Tailwind
utility like `text-[clamp(...)]` **will not override them**, and it fails
silently. Add a class in `globals.css` instead.

## Page structure

Home (`src/app/page.tsx`): Hero → Problem → Difference → Connections → ClosingCta

- **Hero** — headline, waiting list email capture, `OvernightGraphic` (two
  counter-rotating rings of brand logos around the wordmark). Fills the viewport.
- **Problem** — the claim, plus "Will it work for your business?" beside it.
  Carries `NotificationToast` and `SignalAlert`. Fills the viewport.
- **Difference** — before and after, one morning lived twice. Fits one screen.
- **Connections** — three numbered steps (`ConnectorConsole`, `ReconcilePanel`,
  `DraftPanel`), then the tool marquee, then a "Built on" row. By far the
  longest section on the page.

Other routes: `/about` (ends with `FounderNote`), `/blog`, `/contact`,
`/privacy`, `/terms`.

**Parked routes** use a leading underscore, which Next excludes from routing:

- `src/app/_pricing` — taken off the site while pre-launch. Rename to `pricing`
  and restore the nav, footer and sitemap entries to bring it back.
- `src/app/blog/_slug` — the post page. `output: "export"` refuses a dynamic
  route that generates nothing, so it stays parked until `content/blog` holds a
  post. See `content/blog/README.md`.

## Honesty rules, and what has already gone

There are **no customers, no logos, no testimonials, no metrics, no
certifications**. Never invent any. Illustrative product data is fine; claims
about traction are not.

Lines marked in `site.ts` as required honesty lines must not be removed or
softened:

- Step one and step two: "Illustrative. Connections are in build…"
- About: "We are pre-launch. No customers, no case studies, no certifications yet."

Removed on the client's instruction, worth knowing:

- The Trust section, which held the only statements about data handling
  (read-only, UK/EU residency, never used to train models, delete on request).
  Nothing on the site answers the security question now.
- The FAQ, which held "Is this live yet? No."
- The illustrative caveat inside the alert dialog.
- "Connections are in build. Nothing above is live yet.", which sat under the
  tool marquee. The two step captions still say connections are in build, so
  the claim survives above the marquee but no longer beside the logo rows.

## Banned vocabulary

From the original brief, to avoid sounding like the competitors (Supermemory,
Hyperspell, Hyper) who sell to engineers:

> context layer, memory graph, RAG, embeddings, vector, agentic, MCP, ingestion,
> retrieval, second brain, knowledge graph, tokens, latency

Also banned visually: glassmorphism, gradient mesh, floating 3D orbs, neon glow,
animated gradient text, bento grids, blurred washes behind headings, generic
network-node illustrations, **emoji as icons**, heavy drop shadows.

MCP appears as a logo in the hero ring and the "Built on" row on the client's
explicit instruction. The word is not used in copy.

The client has twice supplied copy lifted from a competitor's page. Take the
structure, not the words.

## Integrations

Both endpoints are checked into `site.ts` under `integrations`, with env vars
still overriding. **Do not move them back to env-only**: the host was never
given the variables and shipped a site with no contact form and mailto demo
buttons.

- Calendly: `https://calendly.com/sachusnair-ai/30min`, loaded on first press
  only, never on page load
- Formspree: `https://formspree.io/f/mgawagep`, used by the contact form and
  the hero waiting list, tagged by subject

## Deployment

Hostinger, rebuilding from `main`. It runs Next as a **server**, not the static
export, and caches HTML for a year. If a change looks missing, it is the cache:
check with `curl "https://noemabrain.com/?cb=$(date +%s)"` before believing it.

## Third-party logos

`simple-icons` supplies most marks. Slack, Outlook, LinkedIn, OpenAI, Monday,
Dext and GoCardless are **not in it**, several having asked to be removed.

- Slack and Outlook: official SVGs in `public/logos/`, provenance in
  `public/logos/SOURCES.md`
- OpenAI: `public/chatgpt.png`, recoloured to bone on transparency
- The rest show a wordmark. Do not draw an approximation of a trademark.

Inside an SVG, draw marks as a raw path with a transform. A nested `<svg>` does
not size reliably and once rendered the logos several times too large.

## Accessibility and motion

Everything must work with JavaScript off and under `prefers-reduced-motion`.
Reveals are 16px rise, 400ms, `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 60ms,
fired once.

Hover-only interactions must not strand touch or keyboard users. The
notification checks `(hover: hover) and (pointer: fine)` at runtime, because
phones synthesise mouseenter and mouseleave from taps and were closing it on
their own.

## Brand assets

`brand/` holds the wordmark and N mark as PNGs, generated from the site's own
Poppins file and `icon.svg` so they cannot drift. See `brand/README.md`.

## Open items

- Three social URLs (X, YouTube, Instagram). Icons are in the footer but inert
  until `socials.items[].href` is filled in `site.ts`.
- Real About and Pricing copy. About is currently assembled from copy approved
  elsewhere on the site; Pricing carries no numbers by design.
- "See what Noema can handle" on the home page points at `/about`, which is a
  company story rather than a list of capabilities.
- The time rail (`RailSection`) still renders a line down the page but every
  timestamp has been deleted, so its `time` prop is now unused.
- No live test has been sent through the contact form.
- The GitHub repo is **public**.
