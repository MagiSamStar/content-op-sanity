import {
  PortableText,
  type PortableTextComponents,
  type PortableTextTypeComponentProps,
} from "next-sanity";
import { urlFor } from "@/sanity/image";
import type { ArticleBodyItem, BodyImage, FaqBlock } from "@/sanity/types";
import FaqAccordion from "./FaqAccordion";


function ArticleImage({
  value,
}: PortableTextTypeComponentProps<BodyImage>) {
  if (!value.asset) return null;

  const src = urlFor(value)
    ?.width(1200)
    .fit("max")
    .auto("format")
    .url();

  if (!src) return null;

  return (
    <figure className="my-10">
      {/* Sanity supplies the resized image through the existing URL builder. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={value.alt || ""}
        loading="lazy"
        decoding="async"
        className="m-0 h-auto w-full rounded-xl"
      />
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ArticleImage,
    faq: ({ value }: PortableTextTypeComponentProps<FaqBlock>) => (
      <FaqAccordion value={value} />
    ),
  },
};

export default function ArticleBody({
  value,
}: {
  value: ArticleBodyItem[];
}) {
  return <PortableText value={value} components={components} />;
}