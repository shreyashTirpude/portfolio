import { contact } from "@/lib/data/resume";

const LINKS = [
  { label: "GitHub", href: contact.links.github },
  { label: "LinkedIn", href: contact.links.linkedin },
  { label: "HackerOne", href: contact.links.hackerone },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="brand">
            SHREYASH<span className="dot">.</span>
          </div>
          <div className="copy">© 2026 · application security engineer</div>
          <nav aria-label="Footer">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <a href="#top" className="back-top">
        ↑ back to top
      </a>
    </footer>
  );
}
