"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/sanity/types";

export default function PostLibrary({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const needsSeo = (post: Post) => !post.seo?.title?.trim() || !post.seo?.description?.trim();
  const visible = posts.filter((post) => {
    const searchable = [post.title, post.author?.name, ...(post.categories ?? []).map((category) => category?.title)].filter(Boolean).join(" ").toLowerCase();
    return searchable.includes(query.trim().toLowerCase()) && (filter === "all" || (filter === "featured" ? post.featured : needsSeo(post)));
  });
  return (
    <section className="admin-library" id="content-library" aria-labelledby="library-heading">
      <div className="admin-panel-heading"><div><p className="admin-eyebrow">YOUR PUBLISHED CONTENT</p><h2 id="library-heading">Content library</h2></div><span className="admin-count">{posts.length} articles</span></div>
      <div className="admin-library-controls"><label className="admin-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search articles by title, author, or category" placeholder="Search your articles…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><select aria-label="Filter articles" value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All articles</option><option value="seo">Missing SEO</option><option value="featured">Featured</option></select></div>
      <p className="admin-results-count" role="status">{visible.length} {visible.length === 1 ? "article" : "articles"} shown</p>
      <div className="admin-post-list">
        {visible.map((post) => <article className="admin-post-row" key={post._id}>
          <div className="admin-post-icon" aria-hidden="true">▤</div>
          <div className="admin-post-info"><h3>{post.title || "Untitled article"}</h3><div className="admin-post-meta"><span>{post.author?.name || "No author assigned"}</span>{post.publishedAt && !Number.isNaN(Date.parse(post.publishedAt)) && <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>}</div><div className="admin-post-tags"><span className={`admin-badge ${needsSeo(post) ? "admin-badge-amber" : "admin-badge-green"}`}>{needsSeo(post) ? "Missing SEO" : "Metadata complete"}</span>{post.featured && <span className="admin-badge">Featured</span>}</div></div>
          {post.slug?.current ? <Link className="admin-review-link" href={`/admin/posts/${post.slug.current}`} aria-label={`Review ${post.title || "untitled article"}`}>Review <span aria-hidden="true">↗</span></Link> : <span className="admin-badge admin-badge-amber">Missing slug</span>}
        </article>)}
      </div>
      {!visible.length && <div className="admin-empty"><span aria-hidden="true">⌕</span><h3>{posts.length ? "No matching articles" : "Your library starts here"}</h3><p>{posts.length ? "Try another search or choose a different filter." : "Publish your first article in Sanity to see it here."}</p>{posts.length > 0 && <button className="admin-button admin-button-secondary" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</button>}</div>}
    </section>
  );
}
