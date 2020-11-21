from fastapi import UploadFile

from pathlib import Path
import hashlib

from pydantic import BaseSettings, Field

from app import models


class Settings(BaseSettings):
    file_store: Path = Field(..., env="FILE_STORE")


settings = Settings()


def get_file_for_doc(document: models.Document) -> Path:

    assert document
    assert document.filename

    target_path = settings.file_store / document.filename

    if not target_path.is_file():
        raise ValueError("The file does not exist in the file store")

    return target_path


def get_transcript(document: models.Document, platform: str) -> Path:

    assert document
    assert document.filename

    doc_path = settings.file_store / document.filename
    transcript_path = settings.file_store / f"{document.filename}.{platform}.json"

    return transcript_path


async def get_hash(upload: UploadFile) -> str:
    """computes the sha256 hash of an uploaded"""

    h = hashlib.md5()

    while True:
        # Reading is buffered, so we can read smaller chunks.
        chunk = await upload.read(h.block_size)
        if not chunk:
            break
        h.update(chunk)

    await upload.seek(0)
    return h.hexdigest()
