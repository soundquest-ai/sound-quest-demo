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

    return get_file_for_key(document.filename)


def get_file_for_key(filekey: str) -> Path:

    target_path = settings.file_store / filekey

    if not target_path.is_file():
        raise ValueError("The file does not exist in the file store")

    return target_path


def get_transcript_key(filekey: str, lang: str, platform: str) -> str:
    return f"transcript/default_project/{filekey}.{lang}.{platform}.json"


def get_transcript_path(filekey: str, lang: str, platform: str) -> Path:

    transcript_key = get_transcript_key(filekey, lang=lang, platform=platform)
    transcript_path = settings.file_store / transcript_key

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
