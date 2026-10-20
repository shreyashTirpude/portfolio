import { skillGroups, stackNotes } from "@/lib/data/resume";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="sec-meta">
          <b>[04]</b>
          <i className="rule" aria-hidden="true" />
          <span>stack · capabilities</span>
        </div>

        <div className="sec-head" style={{ marginBottom: "2.4rem" }}>
          <h2 className="rv">The toolbox I actually use.</h2>
          <p className="rv rv-d1">Grouped by the job it does, not by how it looks on a resume.</p>
        </div>

        <div className="stack">
          {skillGroups.map((group, index) => (
            <div className="stack-row rv" key={group.group} style={{ transitionDelay: `${index * 0.04}s` }}>
              <h3>{group.group}<small>{group.no}</small></h3>
              <div>
                <p>{group.desc}</p>
                <div className="chips">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="stack-note rv">
          {stackNotes.map((note) => (
            <div key={note.k}><b>{note.k}</b><span>{note.v}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
