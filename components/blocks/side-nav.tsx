"use client";

import { useScrollSpy } from "@/components/blocks/use-scroll-spy";

const DOTS = [
  { href: "#top", label: "Top" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Career" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Toolbox" },
  { href: "#showcase", label: "Method" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const SPY_IDS = ["top", "about", "experience", "skills", "work", "showcase", "faq", "contact"];

export default function SideNav() {
  useScrollSpy(SPY_IDS);
  return (
    <nav className="side-nav" aria-label="Section navigation">
      {DOTS.map((d) => (
        <a key={d.href} href={d.href} data-spy>
          <span className="lbl">{d.label}</span>
        </a>
      ))}
    </nav>
  );
}
