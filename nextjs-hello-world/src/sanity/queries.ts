import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
  ] | order(publishedAt desc)[0...12] {
    _id,
    title,
    slug,
    publishedAt,
    featured,
    excerpt,

    image {
      asset,
      alt,
      crop,
      hotspot
    },

    seo {
      title,
      description,
      noindex,
      nofollow
    },

    author->{
      name,
      bio,
      image {
        asset,
        alt
      }
    },

    categories[]->{
      title,
      slug
    }
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    excerpt,
    featured,

    image {
      asset,
      alt,
      crop,
      hotspot
    },

    seo {
      title,
      description,
      noindex,
      nofollow
    },

    author->{
      name,
      bio,
      image {
        asset,
        alt
      }
    },

    categories[]->{
      title,
      slug
    }
  }
`);

export const ADMIN_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt
  }
`);

export const CATEGORY_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    title,

    "posts": *[
      _type == "post"
      && references(^._id)
      && defined(slug.current)
    ] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt
    }
  }
`);