import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      validation: (rule) => rule.max(60),
    }),

    defineField({
      name: "noindex",
      title: "Exclude from Search Engines",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "nofollow",
      title: "Ask crawlers not to follow links",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "description",
      title: "Meta Description",
      description: "Optional. Overrides the normal excerpt for SEO.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
  ],
});