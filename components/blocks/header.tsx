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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);
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
    const background = Array.from(document.querySelectorAll<HTMLElement>("#main-content, .footer, .side-nav"));
    background.forEach((element) => { element.inert = menuOpen; });

    if (menuOpen) {
      requestAnimationFrame(() => mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = menuOpen;

    const onKey = (event: KeyboardEvent) => {
      if (!menuOpen) return;
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [
        menuButtonRef.current,
        ...Array.from(mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
      ].filter((element): element is HTMLButtonElement | HTMLAnchorElement => element !== null);
      if (!focusable.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      background.forEach((element) => { element.inert = false; });
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={scrolled ? "header scrolled" : "header"}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <a href="#top" className="logo">SHREYASH<span className="dot">.</span></a>
        <nav aria-label="Primary">{NAV.map((item) => <a key={item.href} href={item.href} data-spy>{item.label}</a>)}</nav>
        <a href="#contact" className="cta" ref={ctaRef} data-spy>Contact me ↗</a>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? "Close" : "Menu"}</span></button>
      </header>
      <nav ref={mobileNavRef} id="mobile-navigation" className={menuOpen ? "mobile-navigation open" : "mobile-navigation"} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {[...NAV, { href: "#contact", label: "Contact" }].map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ ["--menu-index" as string]: index }}>{item.label}<span>↘</span></a>)}
      </nav>
    </>
  );
}
