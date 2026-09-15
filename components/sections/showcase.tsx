"use client";

import { useEffect, useRef } from "react";

const SCENES = [
  {
    label: "the method · 01",
    title: (
      <>
        Recon, <span className="serif">then</span> attack <span className="serif">surface.</span>
      </>
    ),
    body: "Every engagement starts with mapping what you expose — subdomains, APIs, forgotten endpoints. Attack surface you can't see, you can't defend.",
  },
  {
    label: "the method · 02",
    title: (
      <>
        Exploit, <span className="serif">with proof.</span>
      </>
    ),
    body: "Not just \"this looks wrong\" — a reproducible chain, minimized impact, and the business risk spelled out in plain English.",
  },
  {
    label: "the method · 03",
    title: (
      <>
        Report, <span className="serif">and fix it.</span>
      </>
    ),
    body: "Coordinated disclosure only. I stay through remediation — retest, verify, and make sure the fix actually holds.",
  },
];

export default function Showcase() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".scene"));
    const dots = Array.from(root.querySelectorAll<HTMLElement>(".step-dots span"));
    const bar = root.querySelector<HTMLElement>(".progress i");
    if (!scenes.length) return;

    if (reduce) {
      scenes.forEach((sc) => sc.classList.add("on"));
      return;
    }

    let lastIdx = -1;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = root.getBoundingClientRect();
        const total = root.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -r.top / total));
        const idx = Math.min(scenes.length - 1, Math.max(0, Math.round(p * (scenes.length - 1))));
        if (idx !== lastIdx) {
          lastIdx = idx;
          scenes.forEach((sc, i) => {
            sc.classList.toggle("on", i === idx);
            sc.classList.toggle("off", i !== idx);
          });
          dots.forEach((d, i) => d.classList.toggle("on", i === idx));
        }
        if (bar) bar.style.transform = `scaleY(${p.toFixed(4)})`;
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="showcase" id="showcase" ref={rootRef} aria-label="How I work">
      <div className="pin">
        <div className="stage">
          <div className="progress" aria-hidden="true">
            <i />
          </div>
          {SCENES.map((scene) => (
            <div className="scene" key={scene.label}>
              <div className="scene-label">{scene.label}</div>
              <h2>{scene.title}</h2>
              <p>{scene.body}</p>
            </div>
          ))}
        </div>
        <div className="step-dots" aria-hidden="true">
          <span className="on"><i>01</i></span>
          <span><i>02</i></span>
          <span><i>03</i></span>
        </div>
      </div>
    </section>
  );
}
