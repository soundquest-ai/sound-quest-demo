import logging
from uuid import uuid4
from pathlib import Path

from pydantic import BaseSettings, Field

from fastapi import File, UploadFile
from fastapi.responses import FileResponse

from .router import router

LOG = logging.getLogger(__name__)


class Settings(BaseSettings):
    file_store: Path = Field(..., env="FILE_STORE")


@router.post("/")
async def upload_file(file: UploadFile = File(...)):

    settings = Settings()

    LOG.warning(
        "Processing uploaded file %s of content type %s.",
        file.filename,
        file.content_type,
    )
    target_file_name = str(uuid4())
    target_path = settings.file_store / target_file_name

    target_path.write_bytes(await file.read())

    return {"filename": file.filename}


@router.get("/file")
async def download_file(name: str):

    settings = Settings()

    target_path = settings.file_store / name

    return FileResponse(target_path)
