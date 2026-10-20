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
        <div className="footer-top">
          <div className="footer-brand">
            SHREYASH<i>.</i>
          </div>
          <nav className="footer-links" aria-label="Footer">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
            <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Shreyash Tirpude · application security engineer</span>
          <span><code>Space Grotesk / Inter / JetBrains Mono</code> · Next.js 16</span>
        </div>
      </div>
    </footer>
  );
}
