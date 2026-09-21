import Link from "next/link";
import type { ReactNode } from "react";
export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`co-button ${secondary ? "co-button-secondary" : ""}`}
    >
      {children}
    </Link>
  );
}
const links = [
  ["Platform", "/#platform"],
  ["Features", "/#features"],
  ["How It Works", "/#how-it-works"],
  ["Articles", "/blog"],
];
export function Header() {
  return (
    <header className="co-header">
      <a className="co-skip" href="#main-content">
        Skip to content
      </a>
      <div className="co-container co-nav">
        <Link href="/" className="co-brand" aria-label="ContentOps AI home">
          <span className="co-brand-mark" aria-hidden="true">
            ✳
          </span>
          ContentOps <span className="co-brand-ai">AI</span>
        </Link>
        <nav className="co-desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="co-nav-demo">
          <ActionLink href="/admin">View Demo ↗</ActionLink>
        </div>
        <details className="co-mobile-nav">
          <summary>Menu ＋</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link href={href} key={label}>
                {label}
              </Link>
            ))}
            <Link href="/admin">View Demo ↗</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="co-footer co-container">
      <div>
        <Link href="/" className="co-brand">
          <span className="co-brand-mark" aria-hidden="true">
            ✳
          </span>
          ContentOps <span className="co-brand-ai">AI</span>
        </Link>
        <p>Built as an AI + CMS portfolio project.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/blog">Articles</Link>
        <Link href="/admin">Admin Demo ↗</Link>
        <a href="#" aria-label="GitHub repository (link coming soon)">
          GitHub <span className="co-muted">(soon)</span>
        </a>
      </nav>
    </footer>
  );
}
