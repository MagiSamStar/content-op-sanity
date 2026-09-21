import Link from "next/link";
import type { Post } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
export default function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const image = post.image
    ? urlFor(post.image)
        ?.width(featured ? 1100 : 720)
        .height(featured ? 720 : 450)
        .fit("crop")
        .auto("format")
        .url()
    : null;
  const date = post.publishedAt ? new Date(post.publishedAt) : null;
  const validDate = date && !Number.isNaN(date.getTime());
  return (
    <article className={`co-post-card ${featured ? "co-post-featured" : ""}`}>
      <Link
        href={`/${post.slug.current}`}
        aria-label={`Read ${post.title}`}
        tabIndex={-1}
      >
        {image /* Sanity serves a sized, optimized image. */ ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={post.image?.alt || post.title}
            className="co-post-image"
            width={featured ? 1100 : 720}
            height={featured ? 720 : 450}
            loading={featured ? "eager" : "lazy"}
          />
        ) : (
          <div className="co-post-image co-post-placeholder" aria-hidden="true">
            ✳
          </div>
        )}
      </Link>
      <div className="co-post-body">
        <div className="co-post-categories">
          {featured && <span className="co-featured-label">FEATURED</span>}
          {post.categories?.map((category, i) =>
            category?.slug?.current ? (
              <Link
                key={`${category.slug.current}-${i}`}
                href={`/category/${category.slug.current}`}
              >
                {category.title}
              </Link>
            ) : null,
          )}
        </div>
        <h2>
          <Link href={`/${post.slug.current}`}>{post.title}</Link>
        </h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="co-post-meta">
          {post.author?.name && <span>By {post.author.name}</span>}
          {validDate && (
            <time dateTime={date.toISOString()}>
              {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          )}
        </div>
        <Link className="co-read-link" href={`/${post.slug.current}`}>
          Read article <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
