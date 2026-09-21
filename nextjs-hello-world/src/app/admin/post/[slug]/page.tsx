import Link from "next/link";
import type { Post, FaqBlock } from "@/sanity/types";
import { notFound } from "next/navigation";
import { toPlainText, type PortableTextBlock } from "next-sanity";
import { client } from "@/sanity/client";
import { POST_QUERY } from "@/sanity/queries";
import AnalyzeContentButton from "@/app/admin/_components/AnalyzeContentButton";

export default async function AdminPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await client.fetch<Post | null>(POST_QUERY, await params, {
    perspective: "published",
    cache: "no-store",
  });
  if (!post) notFound();

const textBlocks = (post.body ?? []).filter(
  (item): item is PortableTextBlock => item._type === "block",
);
const faqBlocks = (post.body ?? []).filter(
  (item): item is FaqBlock => item._type === "faq",
);

const faqText = faqBlocks
  .flatMap((faq) => [
    faq.heading || "Frequently Asked Questions",
    ...(faq.items ?? []).flatMap((item) => [
      item.question || "",
      item.answer || "",
    ]),
  ])
  .filter(Boolean)
  .join("\n\n");

const bodyText = [toPlainText(textBlocks), faqText]
  .filter(Boolean)
  .join("\n\n");
  return (
    <>
      <Link href="/admin" className="text-sm text-gray-600 hover:underline">← Back to posts</Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {post.excerpt && <p className="mt-3 max-w-2xl text-gray-600">{post.excerpt}</p>}
        </div>
        <Link href={`/${post.slug.current}`} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100">View public post</Link>
      </div>
      <AnalyzeContentButton
        key={post._id}
        title={post.title}
        excerpt={post.excerpt ?? undefined}
        body={bodyText}
        seoTitle={post.seo?.title ?? undefined}
        seoDescription={post.seo?.description ?? undefined}
        categories={post.categories?.flatMap((category) => category?.title ? [category.title] : []) ?? []}
      />
    </>
  );
}
