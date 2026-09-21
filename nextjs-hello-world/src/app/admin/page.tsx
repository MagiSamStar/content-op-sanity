import Link from "next/link";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import ContentLibraryChat from "./_components/ContentLibraryChat";
import PostLibrary from "./_components/PostLibrary";
import type { Post } from "@/sanity/types";

const ADMIN_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, featured, excerpt,
    author->{name}, categories[]->{title}, seo {title, description}
  }
`);

export default async function AdminPage() {
  const posts = await client.fetch<Post[]>(ADMIN_POSTS_QUERY, {}, { perspective: "published", cache: "no-store" });
  const missingSeo = posts.filter((post) => !post.seo?.title?.trim() || !post.seo?.description?.trim()).length;
  return (
    <div className="admin-overview">
      <div className="admin-heading">
        <div><p className="admin-eyebrow">A CLEARER PICTURE OF YOUR CONTENT</p><h1>Content overview<span>.</span></h1><p>Your library, its opportunities, and your next great edit.</p></div>
        <Link href="#content-library" className="admin-button">Explore your content <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="admin-stats">
        <StatCard label="Published articles" value={posts.length} detail="Your connected content library" icon="▤" />
        <StatCard label="Featured stories" value={posts.filter((post) => post.featured).length} detail="Selected to take the spotlight" icon="✧" />
        <StatCard label="Missing SEO metadata" value={missingSeo} detail="Articles missing a title or description" icon="◎" attention={missingSeo > 0} />
      </div>
      <div className="admin-dashboard-grid">
        <PostLibrary posts={posts} />
        <div className="admin-assistant-column">
          <ContentLibraryChat />
          <section className="admin-workflow-note"><p className="admin-eyebrow">A LITTLE GUIDANCE</p><h2>Make your next edit count.</h2><ol><li><span>01</span> Choose an article from your library.</li><li><span>02</span> Analyze its content and metadata.</li><li><span>03</span> Review and refine the suggestions.</li></ol><p>You decide which changes are worth keeping.</p></section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, detail, icon, attention = false }: { label: string; value: number; detail: string; icon: string; attention?: boolean }) {
  return <div className={`admin-stat${attention ? " admin-stat-attention" : ""}`}><div><p>{label}</p><span aria-hidden="true">{icon}</span></div><strong>{value.toString().padStart(2, "0")}</strong><p>{detail}</p></div>;
}
