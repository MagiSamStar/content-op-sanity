import ArticleBody from "@/components/blog/ArticleBody";
import { POST_QUERY } from "@/sanity/queries";
import type { Post } from "@/sanity/types";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/image";
import { client } from "@/sanity/client";
import type { Metadata } from "next";
import Link from "next/link";


const options = { next: { revalidate: 30 } };

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const post = await client.fetch<Post | null>(
    POST_QUERY,
    await params,
    options,
  );

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = post.seo?.title || post.title;
  const description =
    post.seo?.description || post.excerpt || undefined;

  const socialImageUrl = post.image?.asset
    ? urlFor(post.image)
        ?.width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: socialImageUrl
        ? [{
            url: socialImageUrl,
            width: 1200,
            height: 630,
            alt: post.image?.alt || post.title,
          }]
        : [],
    },
    robots: {
      index: !(post.seo?.noindex ?? false),
      follow: !(post.seo?.nofollow ?? false),
    },
  };
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<Post | null>(
    POST_QUERY,
    await params,
    options
  );

  if (!post) notFound();

  const postImageUrl = post.image?.asset
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;


  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        â† Back to posts
      </Link>

      {postImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={postImageUrl}
          alt={post.image?.alt || post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}

      <h1 className="text-4xl font-bold">{post.title}</h1>

      {post.author?.name && (
        <p>By {post.author.name}</p>
      )}

{!!post.categories?.length && (
  <div className="flex gap-2 flex-wrap">
    {post.categories?.map((category) => category?.slug ? (
      <Link
        key={category.slug!.current}
        href={`/category/${category.slug!.current}`}
        className="hover:underline"
      >
        {category.title}
      </Link>
    ) : null)}
  </div>
)}


      <div
  className="prose prose-neutral max-w-none dark:prose-invert
    prose-headings:font-semibold prose-headings:tracking-tight
    prose-p:leading-8
    prose-a:text-violet-700 dark:prose-a:text-violet-300
    prose-a:underline-offset-4
    prose-blockquote:border-violet-400"
>
        <p>
          Published:{" "}
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "No publication date"}
        </p>

       {
       Array.isArray(post.body) && (
      <ArticleBody value={post.body} />
      
  )}
      </div>
    </main>
  );
}

