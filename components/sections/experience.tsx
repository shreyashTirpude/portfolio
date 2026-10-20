import { audit } from "@/lib/data/resume";

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="sec-meta">
          <b>[02]</b>
          <i className="rule" aria-hidden="true" />
          <span>career · dated evidence</span>
        </div>

        <div className="sec-head" style={{ marginBottom: "2.4rem" }}>
          <h2 className="rv">Work, in dated evidence.</h2>
          <p className="rv rv-d1">Employment, independent research, and the education that started it.</p>
        </div>

        <div className="log">
          {audit.map((entry, index) => (
            <article className="log-row rv" key={`${entry.date}-${entry.role}`} style={{ transitionDelay: `${index * 0.06}s` }}>
              <div className="log-when">
                <b>{entry.date}</b>
                <span>{entry.caption}</span>
              </div>
              <div className="log-main">
                <h3>{entry.role}</h3>
                <div className="org">{entry.org}</div>
                <p>{entry.desc}</p>
                <div className="log-tags">
                  {entry.refs.map((ref) => <span key={ref}>{ref}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
