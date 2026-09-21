from fastapi import FastAPI

import requests
from app.editorial_auth import require_editorial_key
from app.models import EditorialPostResponse
from app.services.editorial_service import get_editorial_post
from fastapi import Depends, FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from app.models import AnalyzeRequest, AnalyzeResponse
from app.services.content_analyzer import analyze_content
from app.services.sanity_service import prepare_posts_for_rag
from app.models import RagSearchRequest
from app.services.rag_service import search_posts
from app.models import RagAskRequest
from app.services.rag_service import answer_question


app = FastAPI(
    title="AI Agent Dashboard API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://content-op-sanity.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AI Agent Dashboard API is running"}

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    result = analyze_content(request)
    return result


@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/rag/test-content")
def test_rag_content():
      try:
          return prepare_posts_for_rag()
      except requests.exceptions.SSLError as exc:
          raise HTTPException(
              status_code=502,
              detail="Could not verify Sanity's SSL certificate.",
          ) from exc
      except requests.exceptions.Timeout as exc:
          raise HTTPException(
              status_code=504,
              detail="Sanity took too long to respond.",
          ) from exc
      except requests.exceptions.RequestException as exc:
          raise HTTPException(
              status_code=502,
              detail="Failed to fetch content from Sanity.",
          ) from exc


@app.post("/rag/search")
def search_rag(request: RagSearchRequest):
    return search_posts(
        request.query,
        request.n_results
    )

@app.post("/rag/ask")
def ask_rag(request: RagAskRequest):
    return answer_question(
        request.question,
        request.n_results
    )

@app.get(
    "/editorial/posts/{document_id}",
    response_model=EditorialPostResponse,
    dependencies=[Depends(require_editorial_key)],
)
def read_editorial_post(document_id: str, response: Response):
    response.headers["Cache-Control"] = "no-store"
    return get_editorial_post(document_id)
