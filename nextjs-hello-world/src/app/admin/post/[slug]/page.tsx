import Link from "next/link";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { getEditorialPost } from "@/lib/editorial";
import AnalyzeContentButton from "@/app/admin/_components/AnalyzeContentButton";

const ARTICLE_ID_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    "slug": slug.current
  }
`);

export default async function AdminPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await client.fetch<{ _id: string; slug: string } | null>(
    ARTICLE_ID_QUERY,
    await params,
    { perspective: "published", cache: "no-store" },
  );

  if (!article) notFound();

  const post = await getEditorialPost(article._id);

  return (
    <>
      <Link
        href="/admin"
        className="text-sm text-[#b8afc5] hover:underline"
      >
        Back to posts
      </Link>

      <div className="admin-article-heading mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="admin-eyebrow">
            {post.is_draft ? "Reviewing draft" : "Reviewing published version"}
          </p>
          <h1 className="text-3xl font-medium">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-3 max-w-2xl text-[#b8afc5]">
              {post.excerpt}
            </p>
          )}
          <p className="mt-3 text-sm text-[#aaa0b8]">
            {post.is_draft
              ? "These unpublished changes are ready for your review."
              : "You are reviewing the version currently published on your site."}
          </p>
        </div>

        <Link
          href={`/${article.slug}`}
          className="rounded-xl border border-[#48404f] bg-[#18191d] px-4 py-2 text-sm font-medium hover:bg-[#292334]"
        >
          View published article
        </Link>
      </div>

      <AnalyzeContentButton
        key={`${post.source_id}:${post.source_revision}`}
        documentId={post.document_id}
        sourceId={post.source_id}
        sourceRevision={post.source_revision}
        title={post.title}
        excerpt={post.excerpt ?? undefined}
        body={post.body}
        seoTitle={post.seo_title ?? undefined}
        seoDescription={post.seo_description ?? undefined}
        categories={post.categories}
      />
    </>
  );
}