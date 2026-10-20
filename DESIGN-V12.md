# Portfolio v12 — dark editorial

Reference: `https://harshallade.site/` (structure, density, and typographic scale),
translated to a dark surface and to application-security content.

Wireframe: open `/wireframe-v12.html` on the running site.

## Objective

Move the portfolio from the emerald "security terminal" system (v11) to a warmer,
editorial dark system: giant grotesque type, hairline rules, mono metadata, framed
technical diagrams, and a single saturated accent used as a structural signal
rather than decoration.

Content and its claims are unchanged. Everything on the page is still drawn from
`lib/data/resume.ts`.

## Visual system

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a0a0b` | page surface |
| `--paper` | `#0e0e10` | panels, case copy |
| `--paper-2` | `#121215` | inputs, quiet panels |
| `--fg` | `#f4f1ea` | primary text (warm off-white) |
| `--muted` | `#a09c94` | body copy |
| `--muted-2` | `#6f6c66` | mono metadata |
| `--border` | `rgba(244,241,234,.14)` | hairlines |
| `--accent` | `#ff5a1f` | signal orange |
| `--cool` | `#c9d4f0` | secondary stat tick |

Type: Space Grotesk (display, tight negative tracking), Inter (body),
JetBrains Mono (labels, numbers, technical copy). No serif; the previous italic
serif accent is gone.

## Layout

1. **Hero** — status line, full-width name (second line in accent and indented),
   statement + primary actions, a framed attack-surface topology panel with a
   simulated trace, and a four-cell proof strip.
2. **About** — evidence card (`ST-024`) opposite the profile copy and award chips.
3. **Career** — dated log: date rail, vertical hairline, role, organisation,
   description, and method tags.
4. **Systems** — three case studies: independent vulnerability research,
   Legalese-to-Simplese, BorderlessBiz. Each has a diagram panel; one is a
   full-accent feature card. Result rows replace decorative empty space.
5. **Stack** — grouped capability rows with chips and three "how I work" notes.
6. **Method** — three numbered principles: map, exploit, report.
7. **FAQ** — two-column section with native accordion semantics.
8. **Contact** — large closing statement, copy-email action, contact meta grid,
   and a mailto form.
9. **Footer** — wordmark, outbound links, and a typographic/stack colophon.

A fixed left rail (≥1180 px) tracks the active section. A ⌘K / Ctrl-K command
palette indexes sections, external profiles, copy-email, and mail actions.

## Motion

- Content reveals: 20 px rise + fade, staggered by 70 ms.
- Headings: masked line reveal (`LineReveal`).
- Topology: a single travelling trace dot along the pipeline.
- Case diagrams: clip-path scan reveal on entry; scanline on hover.
- Header: condenses and blurs after 40 px of scroll.
- All motion collapses under `prefers-reduced-motion`, including clip paths and
  the mask reveal.

## Accessibility

- Skip link, single `h1` with accessible name "Shreyash Tirpude".
- Reveal content is forced visible without JavaScript (`<noscript>` override)
  and under `prefers-reduced-motion`.
- Keyboard-visible focus, 44 px minimum targets.
- Mobile navigation traps focus, restores it, closes on Escape, and marks the
  background inert.
- Command palette: dialog semantics, arrow-key navigation, Escape to close.
- FAQ exposes `aria-expanded` and `aria-controls`.
- Diagrams are `aria-hidden`; captions carry the meaning in text.

## Implementation notes

- Section order is hero → about → career → systems → stack → method → faq →
  contact, matching the nav and the scroll-spy order.
- `.case-visual-shell` drives the clip reveal; `.rv` drives the global observer.
- The v12 stylesheet replaces the v11 production layer in `app/globals.css`;
  components for `about 2.tsx` remain untouched.
