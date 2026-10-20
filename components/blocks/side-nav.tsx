"use client";

import { useScrollSpy } from "@/components/blocks/use-scroll-spy";

const DOTS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Career" },
  { href: "#work", label: "Systems" },
  { href: "#skills", label: "Stack" },
  { href: "#showcase", label: "Method" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const SPY_IDS = ["top", "about", "experience", "work", "skills", "showcase", "faq", "contact"];

export default function SideNav() {
  useScrollSpy(SPY_IDS);
  return (
    <nav className="side-nav" aria-label="Section navigation">
      <span className="rail-label" aria-hidden="true">portfolio / 2026</span>
      <span className="rail-line" aria-hidden="true" />
      {DOTS.map((dot, index) => (
        <a key={dot.href} href={dot.href} data-spy aria-label={dot.label}>
          <span className="lbl" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </a>
      ))}
    </nav>
  );
}
