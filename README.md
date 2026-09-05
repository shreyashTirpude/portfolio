# Shreyash Tirpude — Portfolio

An editorial, motion-led portfolio built with Next.js, React, TypeScript, and GSAP.

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Review the design proposal at [http://localhost:3000/wireframe-v9.html](http://localhost:3000/wireframe-v9.html).

## Quality checks

```bash
npm run lint
npm run build
npm run test:e2e
```

The Playwright suite starts the local Next.js server automatically and checks desktop and mobile Chromium layouts. Failure-only traces are written to `test-results/`; use `npm run test:e2e:ui` for interactive debugging.

The interface supports keyboard navigation, visible focus states, responsive layouts, and `prefers-reduced-motion`.

## Structure

- `app/` — page composition, global styles, and providers
- `components/blocks/` — reusable navigation, motion, and visual primitives
- `components/sections/` — portfolio sections
- `lib/data/resume.ts` — central content and navigation data
- `e2e/` — Node.js Playwright browser tests
- `playwright.config.ts` — browser, viewport, server, and trace configuration
- `public/wireframe-v9.html` — interactive design wireframe
- `DESIGN.md` — design direction, reference mapping, and motion rationale
