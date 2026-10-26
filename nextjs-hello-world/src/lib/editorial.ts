import { headers } from "next/headers";
import { hasEditorialLogin } from "./editorial-auth";

export type EditorialPost = {
  document_id: string;
  source_id: string;
  source_revision: string;
  is_draft: boolean;
  title: string;
  excerpt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  body: string;
  categories: string[];
};

function isEditorialPost(value: unknown): value is EditorialPost {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const nullableString = (field: unknown) =>
    field === null || typeof field === "string";

  return (
    typeof item.document_id === "string" &&
    typeof item.source_id === "string" &&
    typeof item.source_revision === "string" &&
    typeof item.is_draft === "boolean" &&
    typeof item.title === "string" &&
    nullableString(item.excerpt) &&
    nullableString(item.seo_title) &&
    nullableString(item.seo_description) &&
    typeof item.body === "string" &&
    Array.isArray(item.categories) &&
    item.categories.every((category) => typeof category === "string")
  );
}

export async function getEditorialPost(documentId: string) {
  const requestHeaders = await headers();
  if (!hasEditorialLogin(requestHeaders.get("authorization"))) {
    throw new Error("Editorial login required.");
  }

  const baseUrl = process.env.EDITORIAL_API_URL;
  const key = process.env.EDITORIAL_API_KEY;
  if (!baseUrl || !key) {
    throw new Error("Editorial API settings are missing from .env.local.");
  }

  const response = await fetch(
    `${baseUrl.replace(/\/$/, "")}/editorial/posts/${encodeURIComponent(documentId)}`,
    {
      headers: { "X-Editorial-Key": key },
      cache: "no-store",
      signal: AbortSignal.timeout(35_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to load editorial content (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!isEditorialPost(data) || data.document_id !== documentId) {
    throw new Error("The editorial API returned an unexpected article response.");
  }
  return data;
}