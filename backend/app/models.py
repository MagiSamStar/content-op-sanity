from pydantic import BaseModel
from typing import List

class TextSuggestion(BaseModel):
    proposed: str
    reason: str


class SuggestedEdits(BaseModel):
    seo_title: TextSuggestion
    seo_description: TextSuggestion
    excerpt: TextSuggestion

class AnalyzeRequest(BaseModel):
    title: str
    excerpt: str | None = None
    body: str
    seo_title: str | None = None
    seo_description: str | None = None
    categories: List[str] = []


class AuditSection(BaseModel):
    status: str
    issues: List[str]


class AnalyzeResponse(BaseModel):
    score: int
    seo: AuditSection
    content: AuditSection
    readability: AuditSection
    recommendations: List[str]
    suggested_edits: SuggestedEdits


class RagSearchRequest(BaseModel):
    query: str
    n_results: int = 3

class RagAskRequest(BaseModel):
    question: str
    n_results: int = 3

class EditorialPostResponse(BaseModel):
    document_id: str
    source_id: str
    source_revision: str
    is_draft: bool
    title: str
    excerpt: str | None = None
    seo_title: str | None = None
    seo_description: str | None = None
    body: str
    categories: List[str]