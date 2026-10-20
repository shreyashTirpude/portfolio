import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-two-roan-92.vercel.app"),
  title: "Shreyash Tirpude — Application Security Engineer",
  description:
    "Application security engineer and bug bounty researcher. I find and prove security vulnerabilities, then help fix them. Apple Hall of Fame 2024, 3+ years on HackerOne, OWASP Top 10 / ASVS, SAST/DAST, AWS security.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shreyash Tirpude — Application Security Engineer",
    description:
      "Application security engineer and bug bounty researcher. Apple Hall of Fame 2024, 3+ years on HackerOne.",
    url: "https://portfolio-two-roan-92.vercel.app",
    siteName: "Shreyash Tirpude",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Shreyash Tirpude — Application Security Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyash Tirpude — Application Security Engineer",
    description:
      "Application security engineer and bug bounty researcher. Apple Hall of Fame 2024, 3+ years on HackerOne.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#0a0a0b", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>
        <noscript>
          <style>{`.rv,.blurin,.lines{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
