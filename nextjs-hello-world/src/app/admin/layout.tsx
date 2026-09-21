import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <nav aria-label="Admin navigation" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/admin" className="text-lg font-semibold">Content Admin</Link>
          <Link href="/" className="text-sm text-gray-600 hover:underline">View website</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
