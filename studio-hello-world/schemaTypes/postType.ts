import {defineField, defineType} from 'sanity'
export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
  name: 'excerpt',
  title: 'Excerpt',
  type: 'text',
  rows: 3,
}),
defineField({
  name: "categories",
  title: "Categories",
  type: "array",
  of: [
    {
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
}),
defineField({
  name: 'featured',
  title: 'Featured Post',
  type: 'boolean',
  initialValue: false,
}),

defineField({
  name: 'seo',
  title: 'Seo',
  type: 'seo',
}),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
  name: "image",
  title: "Featured Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description:
        "Describe the image for accessibility and search engines.",
      validation: (rule) => rule.required(),
    }),
  ],
}),
defineField({
  name: "body",
  title: "Article content",
  type: "array",
  of: [
    { type: "block" },
    {type:"faq"},

    {
      type: "image",
      title: "Article image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe what the image communicates to a reader.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional text displayed underneath the image.",
        }),
      ],
    },
  ],
}),
    defineField({
  name: 'author',
  title: 'Author',
  type: 'reference',
  to: [{type: 'author'}],
}),

  ],
})