"use client";

import { profile, aboutFacts } from "@/lib/data/resume";
import { LineReveal } from "@/components/blocks/line-reveal";
import { NumberTicker } from "@/components/blocks/number-ticker";
import { Marquee } from "@/components/blocks/marquee";

const STATS = [
  { value: 3, suffix: "+", label: "years bug bounty" },
  { value: 2, suffix: "+", label: "years industry appsec" },
  { value: 50, suffix: "k+", label: "bounties earned" },
  { value: 100, suffix: "%", label: "responsible disclosure" },
];

const MARQUEE_ITEMS = [
  "Burp Suite",
  "OWASP Top 10",
  "ASVS",
  "SAST / DAST",
  "Threat Modeling",
  "Apple HOF 2024",
  "HackerOne",
  "Bentley Reward",
  "API Security",
  "Cloud Security",
];

export default function About() {
  return (
    <>
      <Marquee items={MARQUEE_ITEMS} />
      <section id="about">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow rv">01 · about</div>
            <h2 className="section-title rv rv-d1">
              <LineReveal>Security engineer,</LineReveal>{" "}
              <LineReveal delay={0.1}>
                proof <span className="serif">not adjectives.</span>
              </LineReveal>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy blurin">
              <p className="lead">
                I break software <strong>responsibly</strong>, then help you fix it —{" "}
                <span className="marker-hl">Apple Hall of Fame 2024</span>,{" "}
                <span className="marker-hl">Bentley Systems reward</span>, and 3+ years hunting on
                HackerOne.
              </p>
              <p>
                Security-focused software engineer with <strong>2+ years in industry</strong> (HERE
                Technology) embedding security in the SDLC — threat modeling, code review,
                SAST/DAST against OWASP Top 10 and ASVS. I don&apos;t sell fear; I find what your
                stack is hiding.
              </p>
              <p>
                {profile.aboutFootnote.split("// ")[1] ?? "B.Tech in Electronics (Comp Eng minor), Sardar Patel Institute of Technology."}{" "}
                First CTFs became first disclosures, and disclosures became a career.
              </p>
            </div>
            <div>
              <div className="about-stats">
                {STATS.map((s, i) => (
                  <div className={`stat rv ${i > 1 ? `rv-d${i - 1}` : ""}`} key={s.label}>
                    <NumberTicker value={s.value} suffix={s.suffix} />
                    <div className="lbl">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="about-facts">
                {aboutFacts.slice(1).map(([k, v]) => (
                  <div className="fact rv" key={k}>
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
                <div className="fact rv">
                  <span className="k">status</span>
                  <span className="v">{profile.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
