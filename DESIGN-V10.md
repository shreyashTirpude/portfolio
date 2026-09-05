# Portfolio v10 — forensic editorial proposal

## Intent

Keep the existing information architecture and real portfolio evidence, but increase visual depth and transition quality. The site should feel like a high-end editorial investigation rather than a generic cyberpunk portfolio.

## What the deployed site revealed

- The oversized name, mono labels, dated career evidence, work rows, method, FAQ, and contact structure are worth preserving.
- The current global purple glow and grain create atmosphere but do not give individual sections distinct visual identities.
- The 3,060px method sequence dominates the desktop page; the deployed reduced-motion capture also exposed overlapping method headings. The current local implementation already corrects the reduced-motion flow, and v10 keeps that correction.
- Project rows need visual evidence. The proposal pairs each project with a purpose-built image panel rather than stock photography.

## Visual thesis

**Forensic editorial:** smoked glass, scanned surfaces, warm evidence paper, quiet emerald signals, and large typographic chapter changes.

The hero uses the original generated asset `public/assets/forensic-hero-v1.png`. It deliberately avoids Matrix rain, hooded figures, locks, shields, purple gradients, and generic sci-fi dashboards.

## Preserved structure

1. Hero and verified proof
2. About and evidence statistics
3. Career timeline
4. Selected work
5. Capabilities
6. Three-step method
7. FAQ
8. Contact and footer

## Background and image system

- Hero: full-bleed forensic material image with a restrained grid and scanning line.
- About: cropped evidence image inside a dossier-like identity frame.
- Career: a full-section transition from black to warm evidence paper.
- Projects: bespoke product visualizations—document-processing terminal and cross-border network globe.
- Capabilities: dark technical panels with local radial signal fields.
- Contact: a circular monochrome crop of the hero material, treated as an atmospheric closing image.

## Motion map

- Page load: typography rises through a mask while the background settles from 103% scale.
- Hero scroll: 3.5% optical parallax; scan line loops slowly and remains decorative.
- Section entry: one consistent 700–800ms rise-and-resolve transition.
- Career handoff: background changes to warm paper as a major cinematic chapter break.
- Project entry: copy and visual evidence reveal independently; hover affects only actionable details.
- Method: sticky desktop introduction with normal scrolling steps—no long overlapping pin stack.
- Reduced motion: remove parallax, scan, animated reveals, and smooth scrolling while preserving every layout and image.

## Implementation guardrails

- Use the generated background once at high visual prominence and crop/reuse it sparingly elsewhere.
- Final project visuals should use real screenshots when available; the wireframe panels define composition until those assets exist.
- Preserve text contrast with dark overlays and never place body copy directly over a busy image.
- Animate transforms and opacity only. Avoid WebGL unless later testing proves a meaningful benefit.
- Keep the mobile page linear and shorten decorative sequences.

## Deliverable

Run the project and open `/wireframe-v10.html`.
