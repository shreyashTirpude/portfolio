# Portfolio design direction

## Memorable idea

An application-security engineer whose work is verifiable: cinematic enough to feel distinctive, restrained enough to feel credible.

## Visual thesis

The site reads like a polished security field report. Oversized editorial typography creates the first impression; mono metadata, numbered sections, thin rules, and an audit-log timeline supply technical credibility. A near-black base with one emerald-to-cyan signal color replaces the more generic violet-gradient look.

## Reference synthesis

- Aceternity's wavy background informs a low-opacity flowing line field behind the hero. The implementation stays lightweight, decorative, and static when reduced motion is requested.
- Awwwards portfolio patterns inform the poster-like first viewport, masked type entrances, strong section pacing, and the single pinned narrative moment.
- Dribbble's editorial portfolio work informs the large-name hierarchy, indexed work rows, restrained palette, and contrast between display, serif, and mono typography.
- `public/inspiration.html` supplies the proof-first security framing: dated evidence, numbered navigation, a scroll-spy rail, and fewer decorative effects.

## Structure

1. Fixed navigation with a skip link and a direct contact action.
2. Full-height hero with role, availability, two clear actions, and compact proof.
3. About section with concise positioning, verified statistics, and facts.
4. Career as a scroll-filled audit timeline.
5. Capabilities as a quiet matrix, not faux-clickable cards.
6. Selected work with explicit destinations and always-visible actions.
7. Method as a three-step cinematic sequence on desktop and normal stacked content on mobile/reduced-motion.
8. FAQ, contact form, and footer.

## Type and color

- Display: Space Grotesk for names and section statements.
- Editorial accent: Instrument Serif for short, deliberate emphasis only.
- Interface: JetBrains Mono for labels, dates, status, and navigation.
- Body: Inter for long-form clarity.
- Background: `#080b0d`; surface: `#101619`; primary text: `#edf7f2`; muted text: `#a7bbb2`; accent: `#56f0b0`; secondary signal: `#67e8f9`.

## Motion rules

- One entrance language: masked rise or short fade-up, 450-800ms.
- One ambient effect: slow flowing lines. No stacked blobs, particles, or WebGL.
- One pinned sequence: the three-step method, shortened on desktop and disabled on mobile.
- Pointer effects only on controls or links. Informational cards do not tilt.
- Reduced motion removes the preloader, stops ambient motion, and returns all content to normal document flow.

## Responsive and accessibility rules

- At 760px and below, navigation reduces to a Work shortcut plus Contact.
- Touch targets are at least 44px tall.
- No instruction depends on hover.
- Section anchors include header offset, focus states remain visible, and a skip link targets the main content.
- Small metadata uses a minimum 12px size and AA-contrast text color.

## Wireframe

The executable desktop/mobile wireframe is available at `/wireframe-v9.html` while the development server is running.
