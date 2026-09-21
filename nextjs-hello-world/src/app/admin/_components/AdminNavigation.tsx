"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavigation() {
  const reviewing = usePathname() !== "/admin";
  return (
    <nav className="admin-navigation" aria-label="Workspace navigation">
      <Link href="/admin" aria-current={!reviewing ? "page" : undefined} className={!reviewing ? "is-active" : ""}><span aria-hidden="true">▦</span> Overview</Link>
      <Link href="/admin#content-library" className={reviewing ? "is-active" : ""}><span aria-hidden="true">▤</span> Content library</Link>
      <Link href="/admin#library-assistant"><span aria-hidden="true">✧</span> Library assistant</Link>
      <Link href="/blog"><span aria-hidden="true">↗</span> Published articles</Link>
    </nav>
  );
}
