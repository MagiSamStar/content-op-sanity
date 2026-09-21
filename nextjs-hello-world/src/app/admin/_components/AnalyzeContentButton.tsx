"use client";

import { useState } from "react";
import EditorialReview, { type SuggestedEdits } from "./EditorialReview";

type AuditSection = { status: string; issues: string[] };
type AnalyzeResponse = {
  score: number;
  seo: AuditSection;
  content: AuditSection;
  readability: AuditSection;
  recommendations: string[];
  suggested_edits: SuggestedEdits;
};

type Props = {
  title: string;
  excerpt?: string;
  body: string;
  seoTitle?: string;
  seoDescription?: string;

  categories: string[];
};

export default function AnalyzeContentButton({
  title,
  excerpt,
  body,
  seoTitle,
  seoDescription,
  categories,
}: Props) {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          body,
          seo_title: seoTitle,
          seo_description: seoDescription,
          categories,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to analyze content.");
      }

      const data: AnalyzeResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong while analyzing the article.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="my-8 rounded-2xl border border-[#2f2c37] bg-[#18191d] p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#aaa0b8]">
            AI Content Assistant
          </p>
          <h2 className="text-2xl font-medium text-[#f1f0f5]">
            Content Audit
          </h2>
          <p className="mt-1 text-sm text-[#b8afc5]">
            Review SEO, readability, structure, and content opportunities.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-xl bg-[#c7b5ff] px-5 py-3 text-sm font-semibold text-[#191323] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Content"}
        </button>
      </div>

      {error && (
        <div role="alert" className="mt-6 rounded-xl border border-[#713e4a] bg-[#301c24] p-4 text-sm text-[#ffb2bf]">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-[#111216] p-6">
            <p className="text-sm font-medium text-[#aaa0b8]">
              Overall Score
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-medium text-[#f1f0f5]">
                {result.score}
              </span>

              <span className="pb-1 text-lg text-[#aaa0b8]">
                / 100
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <AuditCard
              title="SEO"
              status={result.seo.status}
              issues={result.seo.issues}
            />

            <AuditCard
              title="Content"
              status={result.content.status}
              issues={result.content.issues}
            />

            <AuditCard
              title="Readability"
              status={result.readability.status}
              issues={result.readability.issues}
            />
          </div>
          <EditorialReview
            suggestions={result.suggested_edits}
            originals={{
              seo_title: seoTitle ?? "",
              seo_description: seoDescription ?? "",
              excerpt: excerpt ?? "",
            }}
          />
          {result.recommendations?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-[#f1f0f5]">
                Recommendations
              </h3>

              <div className="mt-3 space-y-3">
                {result.recommendations.map(
                  (recommendation: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-[#2f2c37] p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#292334] text-sm font-semibold">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-6 text-[#c9c1d4]">
                        {recommendation}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function AuditCard({
  title,
  status,
  issues,
}: {
  title: string;
  status: string;
  issues: string[];
}) {
  const readableStatus = status
    ?.replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <div className="rounded-2xl border border-[#2f2c37] p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-[#f1f0f5]">
          {title}
        </h3>

        <span className="rounded-full bg-[#292334] px-3 py-1 text-xs font-medium text-[#c9c1d4]">
          {readableStatus}
        </span>
      </div>

      {issues?.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm text-[#b8afc5]">
          {issues.map((issue: string, index: number) => (
            <li key={index} className="flex gap-2">
              <span>•</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-[#aaa0b8]">
          No major issues found.
        </p>
      )}
    </div>
  );
}
