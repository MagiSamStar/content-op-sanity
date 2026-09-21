import type { FaqBlock } from "@/sanity/types";

export default function FaqAccordion({ value }: { value: FaqBlock }) {
  const items = (value.items ?? []).filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  );

  if (items.length === 0) return null;

  const headingId = `faq-heading-${value._key}`;

  return (
    <section
      aria-labelledby={headingId}
      className="not-prose my-12"
    >
      <h2
        id={headingId}
        className="mb-6 text-2xl font-semibold tracking-tight
          text-neutral-900 dark:text-neutral-100"
      >
        {value.heading || "Frequently Asked Questions"}
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item._key}
            name={`faq-${value._key}`}
            className="group rounded-xl border border-neutral-200
              bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <summary
              className="flex cursor-pointer list-none items-center
                justify-between gap-4 rounded-xl px-5 py-4 text-base
                font-medium text-neutral-900 dark:text-neutral-100
                hover:bg-neutral-100 dark:hover:bg-neutral-800
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-violet-500
                [&::-webkit-details-marker]:hidden"
            >
              <span className="min-w-0 [overflow-wrap:anywhere]">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-xl text-violet-600
                  dark:text-violet-300 group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden shrink-0 text-xl text-violet-600
                  dark:text-violet-300 group-open:inline"
              >
                −
              </span>
            </summary>

            <div
              className="px-5 pb-5 text-base leading-7
                text-neutral-600 dark:text-neutral-300"
            >
              <p className="whitespace-pre-line [overflow-wrap:anywhere]">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}