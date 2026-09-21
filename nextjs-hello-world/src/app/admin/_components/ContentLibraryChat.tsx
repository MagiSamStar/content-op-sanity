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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-500">
          AI Content Intelligence
        </p>

        <h2 className="text-2xl font-bold text-gray-900">
          Ask Your Content Library
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Ask questions across your published Sanity content.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What have we written about AI agents?"
          rows={4}
          className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none transition focus:border-gray-500"
        />

        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching..." : "Ask Content Library"}
        </button>
      </form>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-900">
              Answer
            </h3>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-700">
              {result.answer}
            </p>
          </div>

          {result.sources?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900">
                Relevant Content
              </h3>

              <div className="mt-3 space-y-3">
                {result.sources.map((source, index) => (
                  <div
                    key={`${source.slug}-${index}`}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <p className="font-medium text-gray-900">
                      {source.title || "Untitled"}
                    </p>

                    {source.slug && (
                      <a
                        href={`/admin/posts/${source.slug}`}
                        className="mt-1 inline-block text-sm text-gray-600 hover:underline"
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