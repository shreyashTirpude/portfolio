# Portfolio Technical Guide and Interview Preparation

This document explains how the portfolio was designed, implemented, tested, and deployed. It is written to help you understand the system deeply enough to discuss it in a frontend, product, or application-security interview.

## 1. Project summary

The portfolio is a responsive, motion-led single-page website for an Application Security Engineer and bug bounty researcher. Its purpose is to communicate four things quickly:

1. Professional identity and availability
2. Evidence-backed security experience
3. Engineering projects and capabilities
4. A clear contact path

The production site is available at [portfolio-two-roan-92.vercel.app](https://portfolio-two-roan-92.vercel.app/), and the source is hosted at [github.com/shreyashTirpude/portfolio](https://github.com/shreyashTirpude/portfolio).

## 2. Technology stack

| Technology | Version | Responsibility |
| --- | --- | --- |
| Next.js | 16.3.3 | Application framework, App Router, production build, metadata and static generation |
| React | 19.2.8 | Component model, state, effects and rendering |
| TypeScript | 5.9.3 | Static typing for components, content models and configuration |
| CSS | Global design system | Layout, typography, responsive behavior, transitions and most animations |
| Lenis | 1.3.26 | Smooth wheel and touch scrolling |
| Playwright | 1.62.1 | End-to-end browser testing on desktop and mobile Chromium |
| ESLint | 9.x | Static code-quality and Next.js rule checks |
| Vercel | Managed platform | Build, static output hosting, CDN and production deployment |

The `motion` dependency is installed, but the current source does not import it. It should not be presented as part of the active animation implementation. Most motion is implemented with CSS transitions/keyframes, `IntersectionObserver`, `requestAnimationFrame`, and scroll event listeners.

## 3. Why Next.js was selected

Next.js provides the structure and production tooling of a React application without requiring a custom bundler or server configuration. This project uses the App Router, where the `app/` directory defines the application shell and page.

Benefits for this portfolio include:

- Static generation: the main route is rendered as static content during `next build`.
- Metadata: SEO, Open Graph and Twitter-card metadata are declared through the typed Metadata API.
- Font optimization: `next/font/google` downloads and self-hosts font files at build time.
- Production optimization: JavaScript splitting, CSS processing, asset hashing and minification are handled by Next.js.
- Deployment compatibility: Vercel detects and builds the Next.js application automatically.

The site does not need a database or server API. Keeping it static reduces operational cost, latency, and attack surface.

## 4. High-level architecture

```text
Browser request
      |
      v
Next.js App Router
      |
      +-- app/layout.tsx
      |     +-- metadata and viewport
      |     +-- optimized fonts
      |     +-- Providers
      |
      +-- app/page.tsx
            +-- global behavior
            |     +-- Preloader
            |     +-- AmbientFX
            |     +-- RevealObserver
            |     +-- Header and SideNav
            |
            +-- semantic main content
            |     +-- Hero
            |     +-- About
            |     +-- Experience
            |     +-- Skills
            |     +-- Projects
            |     +-- Showcase
            |     +-- FAQ
            |     +-- Contact
            |
            +-- Footer

Content components <---- lib/data/resume.ts
Styles and motion <----- app/globals.css
Browser verification <-- e2e/portfolio.spec.ts
```

The architecture separates three concerns:

- Content lives primarily in `lib/data/resume.ts`.
- Structure and behavior live in React components.
- Presentation and most motion live in `app/globals.css`.

This separation makes content updates safer and keeps visual rules consistent.

## 5. Rendering model: server and client components

Next.js App Router components are Server Components by default. Server Components execute during rendering and do not send their component logic to the browser.

`app/page.tsx` is a Server Component. It composes the page but has no browser-only state or effects. Components that require browser APIs start with `"use client"`, including:

- `app/providers.tsx`: reads `matchMedia` and initializes Lenis.
- `components/blocks/header.tsx`: tracks scrolling and mobile-menu state.
- `components/blocks/preloader.tsx`: uses state, timers and `sessionStorage`.
- `components/blocks/reveal-observer.tsx`: uses `IntersectionObserver`.
- `components/sections/showcase.tsx`: calculates scroll-linked scene progress.
- `components/sections/faq.tsx`: stores the open accordion item.
- `components/sections/contact.tsx`: handles form submission.

This boundary matters because browser APIs such as `window`, `document`, `sessionStorage`, and `matchMedia` do not exist during server rendering.

### Interview explanation

> I kept the root page as a Server Component and moved only interactive behavior into focused Client Components. This limits client-side JavaScript while still allowing smooth scrolling, menus, accordions, and motion.

## 6. Page composition and semantic structure

`app/page.tsx` is the composition root. All content sections are wrapped in:

```tsx
<main id="main-content">...</main>
```

This creates a semantic main landmark and provides a destination for the keyboard-accessible skip link. The header, main content, and footer remain separate landmarks.

Every major section has a stable ID:

| Section | ID |
| --- | --- |
| Hero | `top` |
| About | `about` |
| Career | `experience` |
| Projects | `work` |
| Capabilities | `skills` |
| Method | `showcase` |
| Questions | `faq` |
| Contact | `contact` |

The header, side navigation, calls to action, tests, and URL fragments all use these IDs. Stable IDs make navigation shareable and testable.

## 7. Content architecture

`lib/data/resume.ts` is the main content source. It exports typed objects and arrays for:

- Profile and availability
- Social links
- Career statistics
- Experience timeline
- Projects
- Skill groups
- Navigation
- Contact information

For example, project cards are rendered by mapping over the `projects` array rather than duplicating markup. The `SkillGroup` and `AuditEntry` TypeScript types document the required data shape and catch missing properties during compilation.

Benefits of this approach:

- A content edit does not require restructuring a component.
- Repeated UI is consistent because it comes from a shared renderer.
- TypeScript catches incompatible data before deployment.
- Claims and contact information have one primary maintenance location.

## 8. Design system

The visual direction combines an editorial portfolio layout with application-security evidence and diagnostic-interface details. The goal is premium and technical without looking like a generic neon “hacker” theme.

### Color system

CSS custom properties in `app/globals.css` define reusable design tokens:

- Near-black backgrounds provide contrast and cinematic depth.
- Pale foreground colors keep long text readable.
- Emerald (`--accent`) communicates active status and verified evidence.
- Muted colors establish hierarchy without relying only on font size.
- Warm light sections create deliberate chapter changes.

Using variables prevents slightly different hard-coded colors from spreading through the interface.

### Typography

Four optimized Google fonts are configured in `app/layout.tsx`:

- Space Grotesk: large display headings
- Inter: readable body copy
- JetBrains Mono: metadata, labels, status and technical details
- Instrument Serif: selective editorial contrast

The fonts are loaded through `next/font`, which self-hosts the generated assets and reduces layout shift compared with loading a public stylesheet at runtime.

### Layout

The site uses:

- A shared maximum-width container
- Responsive CSS Grid layouts
- `clamp()` for fluid type and spacing
- Consistent section padding
- Borders and signal lines to connect visual chapters
- Media-query breakpoints at approximately 900, 760, 700, 600 and 420 pixels

Desktop layouts become linear mobile layouts instead of shrinking complex two-column compositions until they are unreadable.

## 9. Motion architecture

The motion system has several layers, each with a specific purpose.

### 9.1 Smooth scrolling with Lenis

`app/providers.tsx` wraps the application with `ReactLenis`. Important settings include:

- `autoRaf: true`: Lenis updates itself through animation frames.
- `duration: 0.9`: keeps the response polished but not slow.
- `easeOutQuart`: creates quick initial response and a smooth finish.
- `smoothWheel: true`: smooths wheel input.
- `touchMultiplier: 1.8`: keeps touch scrolling responsive.

Lenis is skipped completely when the user requests reduced motion.

### 9.2 Section reveals

`RevealObserver` searches for `.rv`, `.blurin`, and `.lines` elements. An `IntersectionObserver` adds `.in` when an element becomes visible.

Why use `IntersectionObserver` instead of calculating every element on every scroll event?

- The browser optimizes intersection calculation.
- Work happens only near viewport entry.
- Elements are unobserved after revealing, so the effect is one-time.
- It avoids repeated layout calculations during scrolling.

The threshold is `0.16`, meaning roughly 16% of an element should intersect before the reveal starts.

### 9.3 Scroll progress

`AmbientFX` listens to scrolling with a passive listener. It schedules DOM updates through `requestAnimationFrame` and scales a fixed progress bar based on:

```text
current scroll position / (document height - viewport height)
```

The `ticking` flag prevents multiple updates from being scheduled within the same animation frame.

### 9.4 Pinned Method sequence

The Method section is `230vh` high on desktop and contains a `position: sticky` viewport. Scroll progress is normalized from 0 to 1 and mapped to one of three scenes:

```text
section position -> normalized progress -> nearest scene index
```

Only the selected scene receives the `.on` class. On mobile, the sticky presentation is removed and all scenes become a normal vertical sequence. This avoids trapping or overcomplicating touch scrolling.

### 9.5 Preloader

The preloader animates the name and a 0–100 counter only once per browser tab. `sessionStorage` records `portfolio-intro-seen`, so internal navigation or reloads do not repeatedly delay the user.

A safety timeout guarantees that the overlay closes even if the main timer behaves unexpectedly. Reduced-motion users skip it.

### 9.6 CSS-first animation

The site favors `transform`, `opacity`, and `clip-path`. Transform and opacity can usually be composited without forcing layout recalculation. CSS handles hover, focus, scan-line, background and reveal transitions; JavaScript mainly determines state.

## 10. Responsive design

Responsive behavior is not just visual scaling. Some interactions change mode:

- Desktop navigation becomes a full-screen mobile menu.
- Side navigation disappears below 900px.
- Two-column case studies become single-column cards.
- The sticky Method sequence becomes regular document flow.
- Contact details wrap and long values use `overflow-wrap` on small screens.
- Touch targets use a minimum height near 44px.
- Fluid `clamp()` typography avoids abrupt size jumps.

The `body.menu-open` class disables background scrolling while the mobile navigation is open. Pressing Escape closes the menu, and selecting a link also closes it.

## 11. Accessibility

Accessibility was treated as an implementation requirement rather than a final visual check.

Implemented features include:

- `<html lang="en">` for document language
- Semantic header, navigation, main, section and footer structure
- A “Skip to content” link for keyboard users
- Visible global `:focus-visible` styling
- Descriptive navigation labels
- `aria-expanded` and `aria-controls` on mobile navigation and FAQ controls
- A region relationship between each FAQ trigger and panel
- `aria-hidden` on decorative effects
- `aria-live="polite"` for contact-form status
- Minimum-size navigation and button targets
- `rel="noopener noreferrer"` on external links
- Complete `prefers-reduced-motion` behavior

### Reduced-motion strategy

Reduced motion is handled in both JavaScript and CSS:

1. Lenis is not mounted.
2. The preloader is skipped.
3. Reveal content is immediately marked visible.
4. The Method scenes are all visible.
5. CSS animations and transitions are disabled or simplified.

This is stronger than merely slowing animations because users who request reduced motion should not need to pass through the same moving experience.

## 12. Contact-form design

The contact form is intentionally serverless. On submit it:

1. Prevents the normal form request.
2. Reads name, email and message through `FormData`.
3. URL-encodes a subject and body.
4. Opens a `mailto:` URL in the visitor's mail application.
5. Announces the state change through an ARIA live region.

Advantages:

- No backend, database, email API key or spam-processing service
- Smaller attack surface
- No storage of personal form data

Trade-off: it depends on the visitor having a configured email client. A future version could use a server action and transactional email service with validation, rate limiting, CSRF considerations, logging and abuse protection.

The hidden honeypot field provides a lightweight bot signal, although the current client-side handler does not reject a populated honeypot. Do not claim full anti-spam protection.

## 13. SEO and sharing

`app/layout.tsx` defines:

- Page title and description
- Canonical URL
- Open Graph title, description, image and site name
- Twitter summary-card metadata
- Theme color
- A 1200×630 social-sharing image

This metadata is generated with Next.js's typed API, so it is part of the rendered document head rather than added later by client-side JavaScript.

## 14. Testing strategy

The project uses three verification layers.

### 14.1 Static analysis

```bash
npm run lint
```

ESLint checks React, TypeScript and Next.js conventions.

### 14.2 Production compilation

```bash
npm run build
```

The build validates TypeScript, compiles assets, generates the static pages, and exposes errors that may not appear during development.

### 14.3 End-to-end browser testing

```bash
npm run test:e2e
```

Playwright starts a production build on port 3100 and runs eight tests across:

- Desktop Chromium at 1440×900
- Mobile Chromium using the iPhone 13 device profile

The tests verify:

- The accessible main heading
- The `main#main-content` landmark
- Presence of all seven content sections
- No horizontal overflow
- No browser-console errors
- Navigation to `#work`
- Active scroll-spy navigation state
- Keyboard operation of the FAQ
- Reduced-motion content availability
- Lenis being absent in reduced-motion mode

Traces and screenshots are retained on failure, making intermittent or visual failures easier to diagnose.

### Why browser tests matter here

Unit tests would verify small functions, but the highest risks in this portfolio are integration risks: hidden content, wrong landmarks, broken anchors, overflow, inaccessible accordions, and animations that fail under reduced motion. Browser tests exercise those behaviors in the rendered application.

## 15. Performance decisions

- Static output avoids server rendering on each request.
- The page does not fetch runtime API data.
- `next/font` self-hosts and optimizes fonts.
- Scroll listeners are passive.
- Visual writes are grouped in `requestAnimationFrame`.
- `IntersectionObserver` replaces repeated manual visibility calculations.
- Revealed elements are unobserved.
- Most animation uses compositor-friendly transform and opacity.
- The mobile layout removes the long sticky scroll sequence.
- The forensic hero image is a local asset, avoiding a third-party runtime request.

Potential future performance work:

- Convert the 1.8 MB hero PNG to AVIF or WebP and provide responsive sizes.
- Remove the unused `motion` package if it remains unused.
- Split the large global stylesheet into documented layers or modules.
- Measure Core Web Vitals with real-user monitoring instead of relying only on local checks.

## 16. Security considerations

This is a static portfolio, so its server-side attack surface is small. Relevant decisions include:

- No secrets or environment variables are required by the client.
- No user-submitted data is stored.
- The contact form delegates delivery to the local email client.
- External links use `noopener noreferrer` where a new tab is opened.
- React escapes rendered strings by default.
- Content is imported from local TypeScript data rather than inserted as raw HTML.
- Generated directories, environment files and `.vercel` metadata are excluded from Git.

Remaining considerations:

- A Content Security Policy could further restrict script, image, font and connection sources.
- Dependency updates and vulnerability scanning should be performed regularly.
- If a backend contact endpoint is added, it will require server-side validation, rate limiting and abuse controls.

## 17. Build and deployment pipeline

### Local workflow

```bash
cd /Users/shreyash/Repos/portfolio
npm install
npm run dev
```

Open `http://localhost:3000`.

### Pre-deployment verification

```bash
npm run lint
npm run build
npm run test:e2e
```

### Production deployment

The project is linked to Vercel. A production deployment runs:

1. Dependency installation
2. The repository postinstall compatibility script
3. `next build`
4. TypeScript validation
5. Static route generation
6. Upload of optimized output to Vercel's edge network
7. Assignment of the production alias

The active production alias is:

```text
https://portfolio-two-roan-92.vercel.app/
```

GitHub and Vercel are separate systems: pushing code records source history, while a Vercel deployment publishes a compiled application. A push is not proof that the production alias changed unless Vercel is configured to deploy that branch or a production deploy command is run.

## 18. Repository map

```text
portfolio/
├── app/
│   ├── globals.css          # Design tokens, layouts, responsive rules and motion
│   ├── layout.tsx           # Fonts, metadata, viewport and provider shell
│   ├── page.tsx             # Route composition and semantic structure
│   └── providers.tsx        # Lenis and reduced-motion subscription
├── components/
│   ├── blocks/              # Reusable behavior and visual primitives
│   └── sections/            # Major portfolio content sections
├── e2e/
│   └── portfolio.spec.ts    # Playwright behavior and accessibility checks
├── lib/data/
│   └── resume.ts            # Typed portfolio content
├── public/
│   ├── assets/              # Production visual assets
│   ├── reference-shots/     # Design research captures
│   └── wireframe-v11.html   # Approved interactive design reference
├── scripts/vendor/          # Vendored build packages used by postinstall
├── playwright.config.ts     # Test projects and production test server
├── package.json             # Scripts and dependency versions
└── tsconfig.json            # TypeScript compiler configuration
```

## 19. Important engineering trade-offs

### Global CSS versus CSS Modules

Global CSS makes the design system and cross-section transitions easy to coordinate. The trade-off is a large stylesheet and greater risk of selector collisions. CSS Modules or cascade layers would improve isolation as the site grows.

### CSS/browser APIs versus an animation library

CSS plus browser APIs reduces runtime dependency and gives direct control over performance. The trade-off is more custom state and timing logic. A motion library might simplify orchestration, but it would add JavaScript and is unnecessary for the current effects.

### Static content versus a CMS

Typed local data keeps builds deterministic and avoids runtime infrastructure. The trade-off is that content changes require a code change and deployment. A CMS is useful only if non-developers need frequent editing.

### `mailto:` versus a backend form

`mailto:` avoids data collection and backend abuse risks. The trade-off is dependence on a configured mail client and weaker conversion tracking.

### Cinematic scroll versus direct reading

The sticky Method sequence creates a memorable desktop presentation. The trade-off is additional scroll distance. The mobile and reduced-motion layouts deliberately replace it with direct linear reading.

## 20. Common interview questions and strong answers

### “How did you structure the application?”

> I used the Next.js App Router. The root layout owns metadata, optimized fonts and providers. The page remains a Server Component that composes semantic sections. Browser-dependent behavior is isolated in small Client Components. Portfolio content is centralized in typed TypeScript data, while a token-based global stylesheet owns the visual system and motion.

### “How does smooth scrolling work?”

> Lenis intercepts wheel and touch input and advances scrolling through `requestAnimationFrame` using a quartic ease-out curve. I disable the provider when `prefers-reduced-motion` is active, so native scrolling remains available and accessibility preferences are respected.

### “How did you keep animations performant?”

> I use CSS transform and opacity for most animation, `IntersectionObserver` for one-time reveals, passive scroll listeners, and `requestAnimationFrame` for DOM writes. The observer disconnects from each revealed element, and a ticking flag prevents duplicate frame work.

### “Why are some components Client Components?”

> They depend on browser state or APIs. For example, the menu uses React state, the preloader uses session storage, and the Method sequence reads element geometry. Pure composition stays on the server to avoid shipping unnecessary client logic.

### “How did you test responsiveness?”

> I combined CSS breakpoints with automated browser checks. Playwright runs desktop and mobile projects, checks horizontal overflow, navigation, FAQ keyboard behavior, console errors and reduced motion. During design QA I also inspected representative 320, 390, 768, 1440 and 1920 pixel viewports.

### “What accessibility work did you do?”

> I added semantic landmarks, a skip link, visible focus states, accessible names, ARIA state for menus and accordions, keyboard operation, 44-pixel targets, and reduced-motion fallbacks. Playwright verifies the main landmark, heading, FAQ keyboard interaction and reduced-motion content visibility.

### “What would you improve next?”

> I would convert the large hero image to modern responsive formats, remove the unused motion dependency, add a Content Security Policy, introduce real-user Core Web Vitals monitoring, and replace `mailto:` only if the product needs a reliable server-side contact workflow.

### “What was the hardest part?”

> The main challenge was balancing cinematic motion with readability, accessibility and performance. I handled that by making motion systematic, keeping content reveals one-time, switching the pinned sequence to normal flow on mobile, and implementing a full reduced-motion path rather than treating it as an afterthought.

## 21. Terms you should be able to explain

- Hydration: React attaching behavior to HTML that was rendered before client JavaScript runs.
- Server Component: a component rendered outside the browser whose component code is not shipped for client execution.
- Client Component: a component allowed to use state, effects, events and browser APIs.
- Static generation: producing route HTML during the build instead of on every request.
- Semantic HTML: elements whose names communicate document meaning to browsers and assistive technology.
- ARIA: attributes that expose interaction state and relationships when native semantics are insufficient.
- Intersection Observer: a browser API that reports when elements enter or leave a viewport/root.
- `requestAnimationFrame`: a browser callback scheduled before the next paint.
- Passive listener: a listener promising not to cancel scrolling, allowing the browser to optimize input handling.
- Compositing: moving or blending already-painted layers, usually cheaper than recalculating layout.
- Responsive design: adapting layout, type and interaction to device constraints.
- Core Web Vitals: user-experience metrics such as LCP, INP and CLS.
- Open Graph: metadata used to create link previews on social platforms.
- CDN: geographically distributed servers that deliver assets close to users.
- CSP: Content Security Policy, a browser security control for permitted resource sources.

## 22. How to demonstrate the project in an interview

Use this order:

1. Open the deployed site and explain the communication goal.
2. Show `app/page.tsx` and describe the semantic component structure.
3. Show `lib/data/resume.ts` and explain typed content-driven rendering.
4. Show `app/providers.tsx` and explain smooth scrolling plus reduced motion.
5. Show `RevealObserver` and `Showcase` to explain two different motion strategies.
6. Show `app/globals.css` tokens and responsive breakpoints.
7. Show `e2e/portfolio.spec.ts` and explain what is verified.
8. Run `npm run test:e2e` if time allows.
9. Close with the trade-offs and next improvements rather than claiming the project is perfect.

## 23. One-minute project explanation

> I built this as a statically generated Next.js and TypeScript portfolio for application-security roles. The root route is composed from semantic React sections, and the professional content is centralized in typed data. The visual system uses CSS variables, responsive Grid layouts and optimized fonts. For motion, I used Lenis for smooth scrolling, Intersection Observer for one-time reveals, requestAnimationFrame for scroll-linked updates, and CSS transitions for most visual effects. I created separate mobile and reduced-motion behavior so the experience remains usable instead of merely shrinking the desktop design. I test the production build with Playwright on desktop and mobile Chromium, including navigation, overflow, keyboard FAQ behavior, console errors and reduced motion. The static output is deployed through Vercel, which keeps hosting simple and limits runtime attack surface.

## 24. Final accuracy checklist

Before discussing the project, remember:

- Say Next.js, React, TypeScript, CSS, Lenis, Playwright and Vercel.
- Do not claim GSAP is used; it is not in the current dependencies.
- Do not claim the installed `motion` package is actively used.
- Do not describe the contact form as a server API; it opens the mail client.
- Do not claim full anti-spam protection from the unused honeypot value.
- Do not claim all animations run for every user; reduced-motion users receive a simplified experience.
- Explain trade-offs openly. Strong engineering interviews reward accurate reasoning more than a list of libraries.
