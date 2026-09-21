import os
import chromadb

from openai import OpenAI
from app.services.sanity_service import prepare_posts_for_rag

openai_client = OpenAI()

chroma_client = chromadb.PersistentClient(
    path="./chroma"
)

collection = chroma_client.get_or_create_collection(
    name="sanity_posts"
)


def embed_text(text: str):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )

    return response.data[0].embedding


def ingest_posts():
    documents = prepare_posts_for_rag()

    for doc in documents:
        embedding = embed_text(doc["content"])

        collection.upsert(
            ids=[doc["id"]],
            documents=[doc["content"]],
            metadatas=[doc["metadata"]],
            embeddings=[embedding]
        )

    return {
        "status": "success",
        "indexed": len(documents)
    }

#adding semantic search function
def search_posts(query: str, n_results: int = 3):
    query_embedding = embed_text(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
    )

    matches = []

    for i in range(len(results["ids"][0])):
        matches.append({
            "id": results["ids"][0][i],
            "document": results["documents"][0][i],
            "metadata": results["metadatas"][0][i],
            "distance": results["distances"][0][i],
        })

    return matches

def answer_question(question: str, n_results: int = 3):
    matches = search_posts(question, n_results)

    context_parts = []

    for match in matches:
        metadata = match.get("metadata", {})
        document = match.get("document", "")

        context_parts.append(
            f"""
Title: {metadata.get("title", "")}
Slug: {metadata.get("slug", "")}

Content:
{document}
""".strip()
        )

    context = "\n\n---\n\n".join(context_parts)

    prompt = f"""
You are an AI content assistant.

Answer the user's question using ONLY the provided content.

If the answer cannot be supported by the provided content,
say that there is not enough information in the content library.

QUESTION:
{question}

CONTENT LIBRARY CONTEXT:
{context}

Return a concise answer and mention which articles were most relevant.
"""

    response = openai_client.responses.create(
        model="gpt-5-mini",
        input=prompt
    )

    return {
        "answer": response.output_text,
        "sources": [
            {
                "title": match["metadata"].get("title"),
                "slug": match["metadata"].get("slug"),
                "distance": match["distance"],
            }
            for match in matches
        ],
    }