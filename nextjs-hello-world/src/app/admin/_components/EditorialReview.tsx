"use client";

import { useId, useState } from "react";

type TextSuggestion = {
  proposed: string;
  reason: string;
};

export type SuggestedEdits = {
  seo_title: TextSuggestion;
  seo_description: TextSuggestion;
  excerpt: TextSuggestion;
};

type Field = keyof SuggestedEdits;
type Values = Record<Field, string>;

type Props = {
  suggestions: SuggestedEdits;
  originals: Values;
};

const fields: { key: Field; label: string; limit?: number }[] = [
  { key: "seo_title", label: "SEO title", limit: 60 },
  { key: "seo_description", label: "Meta description", limit: 160 },
  { key: "excerpt", label: "Excerpt" },
];

export default function EditorialReview({ suggestions, originals }: Props) {
  const instanceId = useId();
  const [values, setValues] = useState<Values>(() => ({
    seo_title: suggestions.seo_title.proposed,
    seo_description: suggestions.seo_description.proposed,
    excerpt: suggestions.excerpt.proposed,
  }));
  const [approved, setApproved] = useState<Record<Field, boolean>>({
    seo_title: false,
    seo_description: false,
    excerpt: false,
  });

  const approvedCount = Object.values(approved).filter(Boolean).length;

  function updateValue(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setApproved((current) => ({ ...current, [field]: false }));
  }

  return (
    <section aria-labelledby={`${instanceId}-heading`} className="space-y-5">
      <div>
        <h3 id={`${instanceId}-heading`} className="text-xl font-semibold">
          Review suggested edits
        </h3>
        <p className="mt-1 text-sm text-[#b8afc5]">
          Compare with the published version, edit the proposed text, and
          approve the changes you want to keep.
        </p>
      </div>

      {fields.map(({ key, label, limit }) => {
        const inputId = `${instanceId}-${key}`;
        const count = Array.from(values[key]).length;
        const empty = !values[key].trim();
        const tooLong = limit !== undefined && count > limit;
        const unchanged = values[key] === originals[key];
        const invalid = empty || tooLong;

        return (
          <fieldset key={key} className="rounded-xl border border-[#2f2c37] p-4">
            <legend className="px-2 font-semibold">{label}</legend>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-[#b8afc5]">Original</p>
                <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-[#111216] p-3 text-sm">
                  {originals[key] || "Not set"}
                </p>
              </div>

              <div>
                <label htmlFor={inputId} className="text-sm font-medium">
                  Proposed {label.toLowerCase()}
                </label>
                <textarea
                  id={inputId}
                  value={values[key]}
                  onChange={(event) => updateValue(key, event.target.value)}
                  rows={key === "seo_title" ? 2 : 4}
                  aria-invalid={invalid}
                  aria-describedby={`${inputId}-help`}
                  className="mt-2 w-full rounded-lg border border-[#48404f] p-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7b5ff]"
                />
                <div id={`${inputId}-help`} className="mt-1 text-sm">
                  <p className={invalid ? "text-[#ffb2bf]" : "text-[#aaa0b8]"}>
                    {count}{limit !== undefined ? ` / ${limit}` : ""} characters
                  </p>
                  {empty && <p className="text-[#ffb2bf]">Enter text before approving.</p>}
                  {tooLong && <p className="text-[#ffb2bf]">Shorten this text before approving.</p>}
                  {unchanged && !invalid && (
                    <p className="text-[#aaa0b8]">Matches the original; no change needed.</p>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-[#b8afc5]">
              <span className="font-medium">AI rationale: </span>
              {suggestions[key].reason}
            </p>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={approved[key]}
                disabled={invalid || unchanged}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setApproved((current) => ({ ...current, [key]: checked }));
                }}
                className="h-4 w-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7b5ff]"
              />
              Approve this change to {label.toLowerCase()}
            </label>
          </fieldset>
        );
      })}

      <p role="status" className="font-medium">
        {approvedCount} {approvedCount === 1 ? "change" : "changes"} approved
      </p>
      <p className="text-sm text-[#b8afc5]">
        Approvals are temporary. Draft saving will be added in a later stage.
      </p>
    </section>
  );
}