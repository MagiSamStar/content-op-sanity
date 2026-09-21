import { defineArrayMember, defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ accordion",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      initialValue: "Frequently Asked Questions",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Questions and answers",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "Question and answer",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
