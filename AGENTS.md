<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design Workflow

This is a **portfolio site** (Next.js 16 App Router + React 19 + Tailwind CSS v4, currently a fresh scaffold). The main task is producing **editable wireframes** that the owner reviews before anything is built. Use the references below to inform design decisions — **never invent UI from scratch when a reference already solves the problem**.

## Workflow: wireframe-first

1. **Plan and delegate.** Split the page into self-contained sections (hero, nav, projects, about, contact, footer…). Delegate each section to a sub-agent as a single, self-contained chunk. Run independent chunks in parallel.
2. **Wireframe, don't polish.** The deliverable at this stage is an editable wireframe the owner can approve or reject — not final production styling. Layout, hierarchy, and content structure come first; full polish happens only after the owner approves a section.
3. **One section at a time per agent.** Each sub-agent owns exactly one section. Define the interfaces (component names, props, file paths) up front so parallel agents do not conflict.
4. **Reuse before inventing.** Prefer an existing component or block from the references below over writing a new one. Reuse *patterns*, not entire pages — adapt to this project's tokens.
5. **Keep one visual language.** Consistent spacing, radii, typography, and motion across all sections. No section may look like it came from a different site.
6. **Animation is selective.** Animate a few key moments (hover, scroll reveal, page load). Don't animate everything; motion must serve the design, not decorate it.
7. **Assemble and review.** The orchestrator integrates section outputs, checks consistency, and flags gaps before showing the owner.

## Design references

### Foundation
- **shadcn/ui** — base primitives and design tokens: `https://ui.shadcn.com`

### Component / Block Sources
- **BagUI** — production-ready shadcn components, blocks, templates: `https://bagui.vercel.app`
- **Cult UI** — animated, copy-paste shadcn components and blocks: `https://www.cult-ui.com`
- **Aceternity UI** — 200+ copy-paste components, blocks, landing templates (Tailwind + Motion): `https://ui.aceternity.com`
- **Skiper UI** — 100+ uncommon, single-file shadcn/ui components: `https://skiperui.com`
- **Animaster** — animated shadcn-style components: `https://animaster-ui.com`
- **UI Watermelon** — premium React components, dashboards, and blocks: `https://ui.watermelon.sh`

### Visual Inspiration
- **RareUI** — rare animated React components (Tailwind + Motion, shadcn CLI): `https://www.rareui.com`
- **BEUI** — animated components for React/Next.js (Motion + Tailwind): `https://beui.dev`
- **COSS UI** — modern component library on Base UI + shadcn: `https://coss.com/ui`
- **Orbs** — shadcn-style components and variants: `https://shadcnspace.com/components`
- **CodeFronts** — shadcn UI component collections: `https://shadcnstudio.com/components`

### Design / UX Guidance
- **UI Skills** — component-level design skill practice: `https://ui-skills.com`
- **DesignPrompts.dev** — design prompts for UI work: `https://designprompts.dev`
- **Design System Checklist** — audit and build a consistent design system: `https://www.designsystemchecklist.com`
- **Transitions.dev** — animation and transition patterns: `https://transitions.dev`

## Rules

1. Inspect the references before inventing UI.
2. Prefer existing components/blocks over writing new ones.
3. Reuse patterns, not entire pages.
4. Keep one consistent visual language across the product.
5. Do not blindly copy a reference's branding, colors, or content.
6. Adapt components to this project's design tokens (Tailwind v4 `@theme` in `app/globals.css`).
7. Use animation selectively; don't animate everything.
8. When multiple references solve the same problem, choose the simplest implementation.
