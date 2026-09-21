import type { PortableTextBlock } from "next-sanity";
import type { SanityImageObject } from "@sanity/image-url";

export type PostSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
};


export type Post = PostSummary & {
  featured?: boolean | null;
  image?: PostImage | null;
  body?: ArticleBodyItem[] | null;
  excerpt?: string | null;
  seo?: PostSeo | null;
  author?: { name?: string; bio?: string } | null;
  categories?: ({ title: string; slug: { current: string } | null } | null)[] | null;
};

export type PostImage = SanityImageObject & {
  alt?: string | null;
};

export type PostSeo = {
  title?: string | null;
  description?: string | null;
  noindex?: boolean | null;
  nofollow?: boolean | null;
};

export type BodyImage = PostImage & {
  _type: "image";
  _key: string;
  caption?: string | null;
};

export type ArticleBodyItem = PortableTextBlock | BodyImage | FaqBlock;

export type FaqItem = {
  _type: "faqItem";
  _key: string;
  question?: string | null;
  answer?: string | null;
};

export type FaqBlock = {
  _type: "faq";
  _key: string;
  heading?: string | null;
  items?: FaqItem[] | null;
};