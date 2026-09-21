import os
import requests
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
DATASET = os.getenv("SANITY_DATASET")
API_VERSION = os.getenv("SANITY_API_VERSION", "2026-01-01")


def get_posts():
    query = """
    *[_type == "post"] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,

      seo {
        title,
        description
      },

      author->{
        name
      },

      categories[]->{
        title
      },

      body
    }
    """

    url = (
        f"https://{PROJECT_ID}.api.sanity.io/"
        f"v{API_VERSION}/data/query/{DATASET}"
    )

    response = requests.get(
        url,
        params={"query": query},
        timeout=30,
    )

    response.raise_for_status()

    return response.json()["result"]

def portable_text_to_plain_text(blocks):
    parts = []

    for block in blocks or []:
        if not isinstance(block, dict):
            continue

        if block.get("_type") == "block":
            text = "".join(
                child.get("text") or ""
                for child in (block.get("children") or [])
                if isinstance(child, dict)
            )
            if text:
                parts.append(text)

        elif block.get("_type") == "faq":
            parts.append(
                block.get("heading") or "Frequently Asked Questions"
            )
            for item in block.get("items") or []:
                if not isinstance(item, dict):
                    continue
                if item.get("question"):
                    parts.append(item["question"])
                if item.get("answer"):
                    parts.append(item["answer"])

    return "\n\n".join(parts)

def prepare_posts_for_rag():
    posts = get_posts()

    documents = []

    for post in posts:
        body_text = portable_text_to_plain_text(
            post.get("body", [])
        )

        categories = [
            category.get("title", "")
            for category in (post.get("categories") or [])
        ]

        content = f"""
Title: {post.get("title", "")}

Excerpt:
{post.get("excerpt", "")}

Categories:
{", ".join(categories)}

Content:
{body_text}
""".strip()

        documents.append({
            "id": post["_id"],
            "content": content,
            "metadata": {
                "title": post.get("title", ""),
                "slug": post.get("slug", {}).get("current", ""),
                "author": (
                    post.get("author", {}) or {}
                ).get("name", ""),
                "publishedAt": post.get("publishedAt", ""),
            },
        })

    return documents