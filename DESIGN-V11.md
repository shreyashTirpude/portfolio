# Portfolio v11 — systematic security portfolio

## Objective

Preserve the portfolio's verified content and section structure while improving clarity, visual hierarchy, background depth, and transition consistency.

## Copy direction

The interface uses direct professional language. Headings describe the actual content of each section and avoid slogans that sound poetic or vague.

- Hero: `I identify and validate security vulnerabilities.`
- About: `Security engineering with verified results.`
- Career: `Professional experience and security research.`
- Work: `Engineering projects and outcomes.`
- Capabilities: `Security capabilities and technical tools.`
- Method: `Assess. Validate. Remediate.`
- Contact: `Discuss a role or collaboration.`

Supporting copy explains scope, process, tools, evidence, and outcomes using application-security terminology.

## Information structure

1. Overview — role, value statement, availability, primary actions, and proof metrics
2. About — professional summary, recognition, responsibilities, and verified statistics
3. Career — chronological employment, research, and education
4. Projects — problem, implementation, technologies, outcome, and destination
5. Capabilities — grouped security and engineering competencies
6. Method — assessment, validation, reporting, remediation, and retesting
7. FAQ — role fit, disclosure, secure communication, and claim verification
8. Contact — contact channels and a short message form

## Systematic transition model

Every transition belongs to one of six categories:

1. **Page entrance:** five vertical panels clear in sequence. Runs once.
2. **Section boundary:** a horizontal signal trace confirms entry into a new chapter.
3. **Heading reveal:** section titles use the same vertical mask transition.
4. **Evidence reveal:** project visualizations use a horizontal scan reveal and status strip.
5. **Interaction response:** links, project actions, timeline rows, FAQ, and form fields respond consistently.
6. **Reduced motion:** curtains, parallax, blur, clipping, and animated scanning are removed while all content stays visible.

Transitions use opacity, transform, and clip-path. Blur is intentionally excluded from content reveals so text cannot remain unreadable if a browser delays an intersection event. A low-threshold observer and deterministic viewport check work together to guarantee that visible content reaches its final state.

## Background system

- Hero: forensic image, measurement grid, scan line, and controlled optical movement
- About: evidence-card crop using the same image family
- Career: warm evidence-paper background for a clear chapter change
- Projects: individual document-processing and network-route visualizations
- Capabilities: low-contrast technical panels with localized signal lighting
- Method: light operational surface focused on process
- Contact: subdued image crop that connects the closing section back to the hero

## Accessibility and responsive behavior

- Skip link and semantic navigation
- Visible keyboard focus
- FAQ state exposed through `aria-expanded`
- Motion-system control exposes its open state
- Real project and social destinations
- Linear mobile composition with no sticky method sequence
- Full `prefers-reduced-motion` fallback

## Deliverable

Open `/wireframe-v11.html` while the local development server is running.
