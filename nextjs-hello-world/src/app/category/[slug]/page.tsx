import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { CATEGORY_QUERY } from "@/sanity/queries";
import type { PostSummary } from "@/sanity/types";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = await client.fetch<{ title: string; posts: PostSummary[] } | null>(
    CATEGORY_QUERY, await params, { perspective: "published", next: { revalidate: 30 } }
  );
  if (!category) notFound();

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <Link href="/blog" className="hover:underline">â† Back to posts</Link>
      <h1 className="my-8 text-4xl font-bold">{category.title}</h1>
      {category.posts.length === 0 ? <p>No posts in this category yet.</p> : (
        <ul className="space-y-4">
          {category.posts.map((post) => (
            <li key={post._id}>
              <Link href={`/${post.slug.current}`} className="text-xl font-semibold hover:underline">{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

