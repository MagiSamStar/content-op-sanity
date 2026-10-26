import { createHash, timingSafeEqual } from "node:crypto";

export function editorialLoginConfigured() {
  return Boolean(
    process.env.EDITORIAL_USERNAME && process.env.EDITORIAL_PASSWORD,
  );
}

export function hasEditorialLogin(authorization: string | null) {
  const username = process.env.EDITORIAL_USERNAME;
  const password = process.env.EDITORIAL_PASSWORD;
  if (!username || !password || !authorization) return false;

  const match = /^Basic\s+(\S+)$/i.exec(authorization);
  if (!match) return false;

  const supplied = Buffer.from(match[1], "base64");
  const expected = Buffer.from(`${username}:${password}`, "utf8");
  const digest = (value: Buffer) =>
    createHash("sha256").update(value).digest();

  return timingSafeEqual(digest(supplied), digest(expected));
}