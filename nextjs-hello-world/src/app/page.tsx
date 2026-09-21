import type { Metadata } from "next";
import { Header, Footer, ActionLink } from "@/components/landing/SiteChrome";
import {
  DashboardPreview,
  AuditPreview,
  SearchPreview,
} from "@/components/landing/ProductPreview";
import "./contentops.css";

export const metadata: Metadata = {
  title: "ContentOps AI — Make more of your content",
  description:
    "Audit articles, uncover SEO opportunities, and search your content library with AI. Explore a working content operations portfolio project.",
};
const features = [
  [
    "◎",
    "AI content audit",
    "A second set of eyes for every article.",
    "Analyze SEO, readability, structure, and opportunities to make your content more useful.",
  ],
  [
    "⌕",
    "Content library intelligence",
    "Your library. Ready with answers.",
    "Ask questions across your published content with semantic retrieval and grounded answers.",
  ],
  [
    "▥",
    "SEO health monitoring",
    "Find the gaps before your readers do.",
    "Surface missing metadata in your dashboard and review title quality in individual audits.",
  ],
  [
    "↗",
    "Related content discovery",
    "Connect ideas already in your library.",
    "Find relevant articles through semantic search to inform internal linking and content planning.",
  ],
  [
    "▧",
    "Structured CMS content",
    "Good intelligence starts with good content.",
    "Keep articles, authors, categories, and SEO metadata connected in Sanity.",
  ],
  [
    "◇",
    "Human-in-the-loop AI",
    "Recommendations, with you in control.",
    "Review AI suggestions and decide what to change. An integrated approval workflow is planned.",
  ],
];
const steps = [
  ["Sanity CMS", "Structured articles & metadata"],
  ["FastAPI", "AI services & orchestration"],
  ["Embeddings", "Content represented by meaning"],
  ["ChromaDB / RAG", "Relevant context retrieved"],
  ["OpenAI", "Grounded answers & analysis"],
  ["Dashboard", "Insights ready for editorial review"],
];
export default function Home() {
  return (
    <div className="co-site">
      <Header />
      <main id="main-content">
        <section className="co-hero co-container" id="platform">
          <div className="co-eyebrow">
            <span className="co-dot" /> AI-POWERED CONTENT INTELLIGENCE
          </div>
          <h1>
            More than content.
            <br />
            <span>A connected intelligence.</span>
          </h1>
          <p className="co-hero-lead">
            Turn your content library into an intelligent system.
          </p>
          <p className="co-intro">
            Audit content, surface SEO issues, and discover opportunities across
            your entire library. A clearer picture of what you have. A smarter
            way forward.
          </p>
          <div className="co-actions">
            <ActionLink href="/admin">View ContentOps Demo ↗</ActionLink>
            <ActionLink href="/blog" secondary>
              Explore Articles →
            </ActionLink>
          </div>
          <p className="co-caption">
            A working AI + CMS portfolio project · Built for editorial workflows
          </p>
          <DashboardPreview />
        </section>
        <section
          className="co-stack co-container"
          aria-label="Technology stack"
        >
          <p>STRUCTURED CONTENT. CONNECTED INTELLIGENCE.</p>
          <div>
            {[
              "Next.js",
              "TypeScript",
              "Sanity",
              "FastAPI",
              "Python",
              "OpenAI",
              "ChromaDB",
              "RAG",
            ].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>
        <section className="co-section co-container co-value">
          <div>
            <p className="co-eyebrow">THE OPPORTUNITY</p>
            <h2>
              Your content is valuable.
              <br />
              <span>Make every piece count.</span>
            </h2>
          </div>
          <div>
            <p className="co-section-intro">
              Finding what needs attention shouldn’t be difficult.
            </p>
            {[
              "Growing libraries make manual content audits harder to keep up with.",
              "SEO and metadata gaps are easy to miss between publishing deadlines.",
              "Useful ideas stay buried when connections between articles are difficult to discover.",
            ].map((text, i) => (
              <div className="co-problem" key={text}>
                <span>0{i + 1}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="co-section co-container" id="features">
          <div className="co-section-heading">
            <div>
              <p className="co-eyebrow">THE PLATFORM</p>
              <h2>
                Less searching.
                <br />
                <span>More understanding.</span>
              </h2>
            </div>
            <p>
              Bring your content and AI into one thoughtful workflow, from the
              first question to the next improvement.
            </p>
          </div>
          <div className="co-feature-grid">
            {features.map(([icon, title, heading, description], i) => (
              <article className="co-feature" key={title}>
                <div className="co-feature-top">
                  <span className="co-feature-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span>0{i + 1}</span>
                </div>
                <p className="co-eyebrow">{title}</p>
                <h3>{heading}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="co-section co-container" id="how-it-works">
          <p className="co-eyebrow">HOW IT WORKS</p>
          <h2>
            From structured content
            <br />
            <span>to useful insight.</span>
          </h2>
          <p className="co-section-intro">
            Your CMS stays the source of truth. AI makes it easier to explore.
          </p>
          <ol className="co-flow">
            {steps.map(([title, description], i) => (
              <li key={title}>
                <span className="co-flow-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                {i < steps.length - 1 && (
                  <span className="co-flow-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>
        <section className="co-section co-container" id="workflows">
          <div className="co-section-heading">
            <div>
              <p className="co-eyebrow">INSIDE THE WORKSPACE</p>
              <h2>
                Good questions.
                <br />
                <span>Actionable answers.</span>
              </h2>
            </div>
            <p>
              Review a single article or explore the bigger picture. Here’s a
              preview of the workflows.
            </p>
          </div>
          <div className="co-showcase">
            <article>
              <AuditPreview />
              <h3>Give every article a clear next step.</h3>
              <p>
                Turn an audit into practical recommendations for SEO, content,
                and readability.
              </p>
            </article>
            <article>
              <SearchPreview />
              <h3>Start a conversation with your content.</h3>
              <p>
                Find relevant sources and explore what your library already
                knows.
              </p>
            </article>
          </div>
        </section>
        <section className="co-final co-container">
          <span className="co-brand-mark" aria-hidden="true">
            ✳
          </span>
          <p className="co-eyebrow">EXPLORE THE PROJECT</p>
          <h2>
            See the ContentOps
            <br />
            <span>workflow in action.</span>
          </h2>
          <p>
            Explore the working dashboard, run an AI content audit,
            <br /> and search the content library using RAG.
          </p>
          <div className="co-actions">
            <ActionLink href="/admin">View Demo ↗</ActionLink>
            <ActionLink href="/blog" secondary>
              Explore Articles
            </ActionLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
