"use client";

import { stats } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";
import { NumberTicker } from "@/components/blocks/number-ticker";

export default function About() {
  return (
    <section id="about" className="about-v11">
      <span className="chapter-number" aria-hidden="true">01</span>
      <div className="container about-v11-grid">
        <div className="evidence-panel rv" aria-label="Verified professional evidence">
          <div className="evidence-top"><span>Evidence file / ST-024</span><span>Verified / 2024</span></div>
          <div className="evidence-number">01</div>
          <div className="evidence-facts">
            <div><span>Role</span><strong>Application Security Engineer</strong></div>
            <div><span>Awards</span><strong>Apple HOF · Bentley</strong></div>
            <div><span>Platform</span><strong>HackerOne</strong></div>
            <div><span>Education</span><strong>B.Tech · Comp Eng minor</strong></div>
          </div>
        </div>
        <div className="about-v11-copy">
          <div className="eyebrow rv">01 · about</div>
          <h2 className="section-title v11-title rv rv-d1">
            <LineReveal>Security engineering</LineReveal>
            <LineReveal delay={0.1}><span className="serif">with verified results.</span></LineReveal>
          </h2>
          <p className="about-lead rv rv-d2">
            Application security engineer and independent researcher recognized by Apple and
            Bentley Systems, with more than three years of responsible vulnerability research.
          </p>
          <p className="about-body rv rv-d3">
            At HERE Technology, I contribute to secure development through threat modeling,
            code review, SAST/DAST, OWASP Top 10, and ASVS-based controls.
          </p>
          <div className="v11-stats rv rv-d4">
            {stats.map((stat) => <div key={stat.label}><NumberTicker value={stat.value} suffix={stat.suffix} /><small>{stat.label}</small></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
