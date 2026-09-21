import type { Metadata } from "next";
import { Header, Footer } from "@/components/landing/SiteChrome";
import PostCard from "@/components/blog/PostCard";
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import type { Post } from "@/sanity/types";
import "../contentops.css";
export const metadata: Metadata = {
  title: "Articles — ContentOps AI",
  description:
    "Ideas and perspectives on AI, structured content, and better editorial workflows.",
};
export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 30 } },
  );
  const featured = posts.find((post) => post.featured);
  const remaining = posts.filter((post) => post._id !== featured?._id);
  return (
    <div className="co-site">
      <Header />
      <main id="main-content" className="co-container">
        <header className="co-blog-heading">
          <p className="co-eyebrow">THE CONTENT LIBRARY</p>
          <h1>
            Ideas worth
            <br />
            <span>connecting.</span>
          </h1>
          <p>
            Perspectives on artificial intelligence, structured content, and the
            workflows that bring them together.
          </p>
        </header>
        {featured && <PostCard post={featured} featured />}
        {remaining.length > 0 && (
          <>
            <h2 className="co-blog-section-title">
              Latest articles{" "}
              <span className="co-muted">
                / {remaining.length.toString().padStart(2, "0")}
              </span>
            </h2>
            <div className="co-blog-grid">
              {remaining.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
        {posts.length === 0 && (
          <p className="co-empty">
            The library is taking shape. Check back soon for new articles.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
