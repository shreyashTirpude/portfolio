import { method } from "@/lib/data/resume";

export default function Showcase() {
  return (
    <section id="showcase" aria-label="How I work">
      <div className="container">
        <div className="sec-meta">
          <b>[05]</b>
          <i className="rule" aria-hidden="true" />
          <span>method · how i work</span>
        </div>

        <div className="sec-head">
          <h2 className="rv">Assess. Validate. Report.</h2>
          <p className="rv rv-d1">Three steps, in the same order, every engagement.</p>
        </div>

        <div className="method">
          {method.map((scene, index) => (
            <article className="scene rv" key={scene.no} style={{ transitionDelay: `${index * 0.06}s` }}>
              <div className="no">{scene.no}</div>
              <div className="glyph" aria-hidden="true" />
              <h2>{scene.title}</h2>
              <p>{scene.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
