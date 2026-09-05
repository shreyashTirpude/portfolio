"use client";

import { useEffect } from "react";

/** Scroll-spy: marks the current section's dot / nav link via `.on`. */
export function useScrollSpy(ids: string[], offset = 120) {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-spy]'));
    if (!links.length) return;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY + offset;
        let currentId = ids[0] ?? "";
        for (const id of ids) {
          const sec = document.getElementById(id);
          if (sec && sec.offsetTop <= y) {
            currentId = id;
          }
        }
        links.forEach((link) => {
          const active = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("on", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids, offset]);
}
