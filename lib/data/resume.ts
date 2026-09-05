// Single source of truth for all portfolio content.
// Recruiter-ready: every claim is backed, sections mirror the wireframe v2.

export const profile = {
  name: "Shreyash Tirpude",
  role: "Application Security Engineer",
  altRole: "Bug Bounty Researcher",
  tagline: "I break things responsibly, then help fix them.",
  heroTag: "Application security engineer — I break things responsibly, then help fix them",
  statement:
    "Application Security Engineer & Bug Bounty Researcher — Apple Hall of Fame 2024 · Bentley reward · 3 yrs industry",
  location: "Mumbai, India",
  email: "tshreyash2002@gmail.com",
  phone: "+91 93568 80446",
  status: "Available for security roles",
   summary:
    "Security-focused software engineer with 2+ years in industry (HERE Technology) and 3+ years in bug bounty. I break things responsibly, then help fix them.",
  summary2:
    "Apple Hall of Fame 2024, Bentley Systems reward, and a steady stream of valid reports. OWASP Top 10 / ASVS, SAST/DAST, Burp Suite, AWS security.",
  aboutFootnote: "// currently hunting on bug bounty platforms · code on GitHub",
  decryptLine: "access granted — 0x hall-of-fame 2024",
  underHood: `// under the hood
// terminal types itself — zero libraries
const reveal = el => el.classList.add("in");
// scroll-linked emphasis · emerald scanline · 60fps`,
  whoami: "whoami --verbose",
};

export const socials = {
  github: { label: "github", href: "https://github.com/shreyashTirpude" },
  linkedin: { label: "linkedin", href: "https://www.linkedin.com/in/shreyash-tirpude-7782a31b4/" },
  email: { label: "email", href: "mailto:tshreyash2002@gmail.com" },
  gpg: { label: "gpg key", href: "#contact" },
};

export const stats = [
  { value: 3, suffix: "+", label: "years bug bounty" },
  { value: 2, suffix: "+", label: "years industry appsec" },
  { value: 5, suffix: "", label: "programs / advisories" },
  { value: 100, suffix: "%", label: "responsible disclosure" },
];

export const marquee = [
  "bug bounty",
  "owasp top 10",
  "web appsec",
  "api security",
  "burp suite",
  "sast · dast",
  "threat modeling",
  "cve research",
  "ctf",
  "responsible disclosure",
];

export const terminal = {
  title: "shreyash@portfolio: ~/security",
  lines: [
    { cmd: "$ whoami", out: "→ shreyash — appsec engineer / bug bounty researcher" },
    { cmd: "$ cat highlights" },
    { out: "• Apple Hall of Fame 2024 — Apple Security" },
    { out: "• Bentley Systems Reward — 2023" },
    { out: "• HackerOne researcher — 2022 → present" },
  ],
};

export const aboutFacts = [
  ["location", "Mumbai, India"],
  ["role", "Application Security Engineer"],
  ["bounty", "3+ yrs · HackerOne"],
  ["awards", "Apple HOF 2024 · Bentley"],
  ["education", "B.Tech (Comp Eng minor)"],
];

export type AuditEntry = {
  date: string;
  role: string;
  org: string;
  desc: string;
  refs: string[];
  dim?: boolean;
};

export const audit: AuditEntry[] = [
  {
    date: "2024 — PRESENT",
    role: "Software Engineer II — Security & AI",
    org: "HERE Technology",
    desc: "Embedded security in the SDLC: threat modeling, code review, SAST/DAST pipelines against OWASP Top 10 and ASVS. Secure-by-design work at the security + AI intersection.",
    refs: ["threat modeling", "sast · dast", "owasp · asvs"],
  },
  {
    date: "2022 — PRESENT",
    role: "Independent Security Researcher",
    org: "HackerOne · Apple · Bentley Systems",
    desc: "3+ years of bug bounty across web, mobile, and API programs. Apple Hall of Fame 2024. Bentley Systems reward. Burp Suite, recon, OWASP Top 10 exploitation.",
    refs: ["apple hof 2024", "bentley reward", "web · mobile · api"],
  },
  {
    date: "2020 — 2024",
    role: "B.Tech, Electronics Engineering (Minor: Comp Eng)",
    org: "Sardar Patel Institute of Technology",
    desc: "Founded the security focus here — first CTFs, first disclosures, the shift into bug bounty.",
    refs: ["ctf", "disclosure"],
    dim: true,
  },
];

export const projects = [
  {
    path: "~/projects/legalese-to-simplese",
    name: "Legalese-to-Simplese",
    desc: "Legal text simplification tool. Top 5 at Elastic Hackathon. Search-driven pipeline over legal docs.",
    tags: ["Elastic", "NLP", "Hackathon"],
    link: "https://github.com/shreyashTirpude/legalese-to-simplese",
    lock: "encrypted",
  },
  {
    path: "~/projects/borderlessbiz",
    name: "BorderlessBiz",
    desc: "Cross-border business platform. Top 20 at Amazon Smbhav. Enables small businesses to go global.",
    tags: ["Amazon Smbhav", "Product", "Full-stack"],
    link: "https://github.com/shreyashTirpude",
    lock: "encrypted",
  },
];

export type SkillGroup = {
  group: string;
  skills: string[];
  script: string;
  desc: string;
  no: string;
};

export const skillGroups: SkillGroup[] = [
  {
    group: "AppSec & Pentesting",
    no: "01 / appsec",
    script: "Offensive + defensive",
    desc: "OWASP Top 10, ASVS, Burp Suite, reconnaissance, and reproducible reports — across web, mobile, and API.",
    skills: ["OWASP", "ASVS", "Burp Suite", "Recon"],
  },
  {
    group: "Secure SDLC",
    no: "02 / sdlc",
    script: "Shift-left, not afterthought",
    desc: "Threat modeling, code review, SAST/DAST pipelines — security embedded from design to deploy.",
    skills: ["SAST", "DAST", "Threat Modeling", "Code Review"],
  },
  {
    group: "Cloud Security",
    no: "03 / cloud",
    script: "Hardened by default",
    desc: "AWS-native hardening — IAM least-privilege, KMS, CloudTrail, GuardDuty detection.",
    skills: ["IAM", "KMS", "CloudTrail", "GuardDuty"],
  },
  {
    group: "Protocols & Auth",
    no: "04 / protocol",
    script: "Auth that holds up",
    desc: "Auth flows and the attacks that break them — OAuth 2.0, OIDC, JWT, IDOR, SSRF.",
    skills: ["OAuth 2.0", "OIDC", "JWT", "SSRF", "IDOR"],
  },
  {
    group: "Languages & automation",
    no: "05 / programming",
    script: "Ship it all",
    desc: "Python, JS/TS, Go, Bash — scripting recon and exploits, then shipping Docker-ized tooling around them.",
    skills: ["Python", "JS / TS", "Go", "Bash", "Docker"],
  },
];

export const nav = [
  { num: "01.", label: "about", href: "#about" },
  { num: "02.", label: "experience", href: "#experience" },
  { num: "03.", label: "projects", href: "#work" },
  { num: "04.", label: "skills", href: "#skills" },
  { num: "05.", label: "method", href: "#showcase" },
  { num: "06.", label: "faq", href: "#faq" },
  { num: "07.", label: "contact", href: "#contact" },
];

export const contact = {
  email: "tshreyash2002@gmail.com",
  phone: "+91 93568 80446",
  location: "Mumbai, India",
  note: "// open to security roles and engineering collaboration",
  links: {
    github: "https://github.com/shreyashTirpude",
    linkedin: "https://www.linkedin.com/in/shreyash-tirpude-7782a31b4/",
    hackerone: "https://hackerone.com/shreyashcipher?type=user",
  },
};
