from pathlib import Path

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
