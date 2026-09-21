import json
import os
import re

import requests
from fastapi import HTTPException

from app.services.sanity_service import (
    API_VERSION,
    DATASET,
    PROJECT_ID,
    portable_text_to_plain_text,
)


def get_editorial_post(document_id: str):
    if (
        not re.fullmatch(r"[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}", document_id)
        or document_id.startswith(("drafts.", "versions."))
    ):
        raise HTTPException(400, "Use the article's published document ID.")

    token = os.getenv("SANITY_API_TOKEN")
    if not token or not PROJECT_ID or not DATASET:
        raise HTTPException(503, "Sanity editorial access is not configured.")

    draft_id = f"drafts.{document_id}"
    query = """
    *[_type == "post" && _id in [$publishedId, $draftId]] {
      _id,
      _rev,
      title,
      excerpt,
      seo,
      body,
      "categoryTitles": categories[]->title
    }
    """

    try:
        response = requests.get(
            f"https://{PROJECT_ID}.api.sanity.io/"
            f"v{API_VERSION}/data/query/{DATASET}",
            headers={"Authorization": f"Bearer {token}"},
            params={
                "query": query,
                "perspective": "raw",
                "$publishedId": json.dumps(document_id),
                "$draftId": json.dumps(draft_id),
            },
            timeout=30,
        )
        response.raise_for_status()
    except requests.exceptions.Timeout as exc:
        raise HTTPException(504, "Sanity took too long to respond.") from exc
    except requests.exceptions.RequestException as exc:
        raise HTTPException(
            502, "Could not read Sanity content. Check backend access settings."
        ) from exc

    try:
        documents = response.json()["result"]
        if not isinstance(documents, list):
            raise ValueError("Expected a list of documents")
        by_id = {document["_id"]: document for document in documents}
    except (ValueError, KeyError, TypeError) as exc:
        raise HTTPException(502, "Sanity returned an unexpected response.") from exc

    source = by_id.get(draft_id) or by_id.get(document_id)
    if source is None:
        raise HTTPException(404, "Article not found.")

    seo = source.get("seo") or {}
    return {
        "document_id": document_id,
        "source_id": source["_id"],
        "source_revision": source["_rev"],
        "is_draft": source["_id"] == draft_id,
        "title": source.get("title") or "Untitled",
        "excerpt": source.get("excerpt"),
        "seo_title": seo.get("title"),
        "seo_description": seo.get("description"),
        "body": portable_text_to_plain_text(source.get("body") or []),
        "categories": [
            title
            for title in (source.get("categoryTitles") or [])
            if isinstance(title, str)
        ],
    }