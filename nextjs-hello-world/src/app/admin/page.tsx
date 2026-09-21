import Link from "next/link";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import ContentLibraryChat from "./_components/ContentLibraryChat";
import type { Post } from "@/sanity/types";
const ADMIN_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    featured,
    excerpt,

    author->{
      name
    },

    categories[]->{
      title
    },

    seo {
      title,
      description
    }
  }
`);

export default async function AdminPage() {
  const posts = await client.fetch<Post[]>(ADMIN_POSTS_QUERY);

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-500">
          Content Operations
        </p>

        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Review, analyze, and manage your published content.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Posts"
          value={posts.length}
        />

        <StatCard
          label="Featured"
          value={posts.filter((post) => post.featured).length}
        />

        <StatCard
          label="Missing SEO"
          value={
            posts.filter(
              (post) =>
                !post.seo?.title ||
                !post.seo?.description
            ).length
          }
        />
      </div>

<div className="mb-8">
  <ContentLibraryChat />
</div>      

<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold">
            Posts
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900">
                  {post.title}
                </h3>

                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                  {post.author?.name && (
                    <span>By {post.author.name}</span>
                  )}

                  {post.publishedAt && (
                    <span>
                      {new Date(
                        post.publishedAt
                      ).toLocaleDateString()}
                    </span>
                  )}

                  {post.featured && (
                    <span>Featured</span>
                  )}
                </div>
              </div>

              <Link
                href={`/admin/posts/${post.slug.current}`}
                className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
              >
                Review Post
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}
