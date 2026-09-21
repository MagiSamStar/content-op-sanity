export function DashboardPreview() {
  return (
    <div
      className="co-dashboard"
      aria-label="Illustrative dashboard preview with sample data"
    >
      <div className="co-window-bar">
        <span className="co-window-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span>ContentOps workspace</span>
        <span className="co-sample">SAMPLE PREVIEW</span>
      </div>
      <div className="co-dashboard-body">
        <aside className="co-preview-sidebar" aria-hidden="true">
          <strong>
            ✳ <span>ContentOps AI</span>
          </strong>
          <div className="co-sidebar-active">▦ &nbsp; Overview</div>
          <div>▤ &nbsp; Content library</div>
          <div>◎ &nbsp; Content audits</div>
          <div>⌕ &nbsp; Ask your library</div>
          <p>
            WORKSPACE
            <br />
            <span>Editorial team</span>
          </p>
        </aside>
        <div className="co-preview-content">
          <div className="co-preview-heading">
            <div>
              <p className="co-muted">YOUR CONTENT, AT A GLANCE</p>
              <h2>Content overview</h2>
            </div>
            <span className="co-preview-tag">✦ AI-assisted</span>
          </div>
          <div className="co-stat-grid">
            {[
              ["Content health", "82", "/100", "Room to grow"],
              ["Total posts", "24", "", "In your library"],
              ["Missing SEO", "03", "", "Needs attention"],
            ].map(([label, value, suffix, note]) => (
              <div key={label} className="co-mini-stat">
                <p>{label}</p>
                <strong>
                  {value}
                  <small>{suffix}</small>
                </strong>
                <span>{note}</span>
              </div>
            ))}
          </div>
          <div className="co-preview-bottom">
            <div>
              <div className="co-panel-heading">
                Recently analyzed <span>Score</span>
              </div>
              {[
                ["Building better content workflows", "92"],
                ["A practical guide to AI agents", "84"],
                ["Making structured content work", "71"],
              ].map(([title, score]) => (
                <div className="co-preview-row" key={title}>
                  <span>
                    <i aria-hidden="true">▤</i>
                    {title}
                  </span>
                  <b>{score}</b>
                </div>
              ))}
            </div>
            <div className="co-mini-search">
              <span className="co-purple">✦ CONTENT LIBRARY SEARCH</span>
              <h3>
                Your next insight
                <br />
                starts with a question.
              </h3>
              <div>
                Ask about your content <span aria-hidden="true">↗</span>
              </div>
              <p>Answers grounded in your library.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function AuditPreview() {
  return (
    <div className="co-workflow-panel">
      <div className="co-panel-heading">
        <span>◎ &nbsp; AI Content Audit</span>
        <span className="co-sample">SAMPLE PREVIEW</span>
      </div>
      <div className="co-audit-score">
        <div className="co-score-ring">
          <strong>
            84<small>/100</small>
          </strong>
        </div>
        <div>
          <h4>A strong foundation.</h4>
          <p>A few improvements can go a long way.</p>
        </div>
      </div>
      <div className="co-audit-status">
        <span>
          SEO <b className="co-amber">Needs improvement</b>
        </span>
        <span>
          Content <b>Good</b>
        </span>
        <span>
          Readability <b>Good</b>
        </span>
      </div>
      <p className="co-small-label">RECOMMENDED NEXT STEPS</p>
      {[
        "Improve meta description",
        "Add an FAQ section",
        "Add relevant internal links",
      ].map((text, i) => (
        <div className="co-recommendation" key={text}>
          <span>0{i + 1}</span>
          {text}
          <span aria-hidden="true">↗</span>
        </div>
      ))}
    </div>
  );
}
export function SearchPreview() {
  return (
    <div className="co-workflow-panel">
      <div className="co-panel-heading">
        <span>✦ &nbsp; Ask Your Content Library</span>
        <span className="co-sample">SAMPLE PREVIEW</span>
      </div>
      <div className="co-question">
        What have we written about artificial intelligence?
        <span aria-hidden="true">↗</span>
      </div>
      <div className="co-answer">
        <span className="co-purple">✦ &nbsp; LIBRARY ANSWER</span>
        <p>
          This example library explores AI agents, semantic search, and
          practical content workflows. Start with the agent guide for the
          foundations, then explore how retrieval connects your content.
        </p>
      </div>
      <p className="co-small-label">ILLUSTRATIVE SOURCES</p>
      {[
        "A practical guide to AI agents",
        "Semantic search, explained",
        "Building better content workflows",
      ].map((title, i) => (
        <div className="co-source" key={title}>
          <span>0{i + 1}</span>
          <p>{title}</p>
          <span aria-hidden="true">↗</span>
        </div>
      ))}
    </div>
  );
}
