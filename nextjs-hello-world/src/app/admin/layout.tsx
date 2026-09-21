import type { Metadata } from "next";
import Link from "next/link";
import AdminNavigation from "./_components/AdminNavigation";
import "./admin.css";

export const metadata: Metadata = {
  title: "Workspace | ContentOps AI",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-workspace">
      <a href="#workspace-content" className="admin-skip">Skip to content</a>
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand"><span aria-hidden="true">✳</span> ContentOps <small>AI</small></Link>
        <p className="admin-nav-label">EDITORIAL WORKSPACE</p>
        <AdminNavigation />
        <div className="admin-sidebar-note"><span aria-hidden="true">◇</span><strong>Your content. Your call.</strong><p>Explore your library and review AI suggestions, one article at a time.</p></div>
        <Link href="/" className="admin-exit">View website <span aria-hidden="true">↗</span></Link>
      </aside>
      <div className="admin-body">
        <header className="admin-topbar"><span>Workspace <span aria-hidden="true">/</span> Content operations</span><span className="admin-workspace-tag">Editorial tools</span></header>
        <main id="workspace-content" className="admin-content">{children}</main>
        <footer className="admin-footer">ContentOps AI <span>Thoughtful content starts here.</span></footer>
      </div>
    </div>
  );
}
