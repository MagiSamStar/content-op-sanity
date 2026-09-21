"use client";

import { useState } from "react";

type Source = {
  title?: string;
  slug?: string;
  distance?: number;
};

type RagResponse = {
  answer: string;
  sources: Source[];
};

export default function ContentLibraryChat() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<RagResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/rag/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          n_results: 3,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to query the content library.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching your content.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="library-assistant" className="admin-chat" aria-labelledby="assistant-heading">
      <div className="mb-5">
        <p className="admin-eyebrow">
          AI Content Intelligence
        </p>

        <h2 id="assistant-heading">
          A little content clarity.
        </h2>

        <p className="mt-1 text-sm text-[#b8afc5]">
          Ask questions across your published Sanity content.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="library-question" className="sr-only">Ask your content library</label>
        <textarea
          id="library-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What have we written about AI agents?"
          rows={4}
          className="w-full rounded-xl border border-[#48404f] p-4 text-sm outline-none transition focus:border-[#c7b5ff]"
        />

        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="rounded-xl bg-[#c7b5ff] px-5 py-3 text-sm font-semibold text-[#191323] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching..." : "Ask Content Library"}
        </button>
      </form>

      {error && (
        <div role="alert" className="mt-5 rounded-xl border border-[#713e4a] bg-[#301c24] p-4 text-sm text-[#ffb2bf]">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-6" aria-live="polite">
          <div className="rounded-xl bg-[#111216] p-5">
            <h3 className="font-semibold text-[#f1f0f5]">
              Answer
            </h3>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#c9c1d4]">
              {result.answer}
            </p>
          </div>

          {result.sources?.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#f1f0f5]">
                Relevant Content
              </h3>

              <div className="mt-3 space-y-3">
                {result.sources.map((source, index) => (
                  <div
                    key={`${source.slug}-${index}`}
                    className="rounded-xl border border-[#2f2c37] p-4"
                  >
                    <p className="font-medium text-[#f1f0f5]">
                      {source.title || "Untitled"}
                    </p>

                    {source.slug && (
                      <a
                        href={`/admin/posts/${source.slug}`}
                        className="mt-1 inline-block text-sm text-[#b8afc5] hover:underline"
                      >
                        Review post →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}