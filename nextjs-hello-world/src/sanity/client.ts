import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "t7g5taer",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});