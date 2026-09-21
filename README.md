# ContentOps AI

A portfolio project combining a Next.js content website, Sanity Studio, and a Python API for AI-assisted editorial review.

## Current features

- Published articles, authors, categories, SEO metadata, and FAQ content managed in Sanity.
- An admin dashboard with content audits and suggested SEO titles, descriptions, and excerpts.
- Side-by-side suggestion editing and temporary field-level approvals.
- Content-library questions using embeddings and a local Chroma index.
- A protected backend endpoint that reads the latest draft and its revision.

Draft-aware frontend integration is the next tutorial stage. Approved suggestions are not yet saved to Sanity. The current public-facing demo is not ready to expose paid AI endpoints without authentication and usage limits.

## Project structure

| Directory             | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `nextjs-hello-world/` | Next.js frontend                                    |
| `studio-hello-world/` | Sanity Studio and schemas                           |
| `backend/`            | FastAPI analysis, retrieval, and editorial services |

## Local setup

Use a current Node.js version supported by the installed packages and a compatible Python installation. The backend was developed using Python 3.14; the frontend and Studio dependency versions are pinned by their lockfiles.
