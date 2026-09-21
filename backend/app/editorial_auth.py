import os
import secrets

from dotenv import load_dotenv
from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader

load_dotenv()

editorial_key_header = APIKeyHeader(
    name="X-Editorial-Key",
    auto_error=False,
)


def require_editorial_key(key: str | None = Security(editorial_key_header)):
    expected = os.getenv("EDITORIAL_API_KEY")
    if not expected:
        raise HTTPException(503, "Editorial access is not configured.")
    if not key or not secrets.compare_digest(
        key.encode("utf-8"), expected.encode("utf-8")
    ):
        raise HTTPException(401, "Editorial access required.")