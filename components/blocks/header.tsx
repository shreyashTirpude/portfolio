"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollSpy } from "@/components/blocks/use-scroll-spy";
import { useMagnetic } from "@/components/blocks/use-magnetic";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Career" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Toolbox" },
  { href: "#showcase", label: "Method" },
];
const SPY_IDS = ["top", "about", "experience", "work", "skills", "showcase", "faq", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useScrollSpy(SPY_IDS);
  useMagnetic(ctaRef, 0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("menu-open"); window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <>
      <header className={scrolled ? "header scrolled" : "header"}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <a href="#top" className="logo">SHREYASH<span className="dot">.</span></a>
        <nav aria-label="Primary">{NAV.map((item) => <a key={item.href} href={item.href} data-spy>{item.label}</a>)}</nav>
        <a href="#contact" className="cta" ref={ctaRef} data-spy>Contact me ↗</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Close" : "Menu"}</button>
      </header>
      <nav id="mobile-navigation" className={menuOpen ? "mobile-navigation open" : "mobile-navigation"} aria-label="Mobile navigation">
        {[...NAV, { href: "#contact", label: "Contact" }].map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span>↘</span></a>)}
      </nav>
    </>
  );
}
