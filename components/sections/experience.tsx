"use client";

import { useEffect, useRef } from "react";
import { audit } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";

/** Fills the timeline beam as the user scrolls through it. */
function useTimelineFill(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const fill = rail.querySelector<HTMLElement>(".fill");
      if (fill) fill.style.height = "100%";
      return;
    }
    const fill = rail.querySelector<HTMLElement>(".fill");
    if (!fill) return;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const wrap = rail.closest(".timeline") as HTMLElement | null;
        if (!wrap) return;
        const r = wrap.getBoundingClientRect();
        const total = wrap.offsetHeight - window.innerHeight * 0.4;
        const p = Math.min(1, Math.max(0, -r.top / total));
        fill.style.height = `${p * 100}%`;
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ref]);
}

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  useTimelineFill(railRef);

  return (
    <section id="experience">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow rv">02 · career</div>
          <h2 className="section-title rv rv-d1">
            <LineReveal>Work, in</LineReveal> <LineReveal delay={0.1}>dated evidence.</LineReveal>
          </h2>
        </div>
        <div className="timeline">
          <div className="tl-rail" ref={railRef}>
            <div className="fill" />
          </div>
          {audit.map((entry) => (
            <div className="tl rv" key={`${entry.date}-${entry.role}`}>
              <div className="when">
                <span className={entry.dim ? undefined : "now"}>
                  {entry.dim ? entry.date : `▹ ${entry.date}`}
                </span>
              </div>
              <div className="what">
                <h3>{entry.role}</h3>
                <div className="org">{entry.org}</div>
                <p>{entry.desc}</p>
                <div className="tags">
                  {entry.refs.map((ref) => (
                    <span key={ref} className={entry.dim ? "tag dim" : "tag"}>
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
