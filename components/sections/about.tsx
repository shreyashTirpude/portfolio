import { aboutFacts, awards } from "@/lib/data/resume";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="sec-meta">
          <b>[01]</b>
          <i className="rule" aria-hidden="true" />
          <span>evidence · profile</span>
        </div>

        <div className="sec-grid">
          <aside className="evidence rv" aria-label="Verified professional evidence">
            <div className="evidence-top">
              <span>Evidence file / ST-024</span>
              <span>verified / 2024</span>
            </div>
            <div className="evidence-no" aria-hidden="true">01</div>
            <div className="evidence-facts">
              {aboutFacts.map(([key, value]) => (
                <div key={key}>
                  <span>{key}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </aside>

          <div className="sec-head">
            <span className="eyebrow rv">01 · about</span>
            <h2 className="rv rv-d1">Security engineering with verified results.</h2>
            <p className="about-lead rv rv-d2">
              Application security engineer and independent researcher recognized by Apple and
              Bentley Systems, with more than three years of responsible vulnerability research.
            </p>
            <p className="about-body rv rv-d3">
              At HERE Technology I contribute to secure development through threat modeling, code
              review, SAST/DAST, OWASP Top 10, and ASVS-based controls. My research runs the other
              direction: mapping exposed surface, validating exploitability, and writing the kind of
              report an engineering team can act on.
            </p>
            <div className="awards rv rv-d4">
              {awards.map((award) => (
                <span key={award.label}><b>{award.org}</b> {award.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
