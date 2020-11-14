import logging
from typing import List, Any
from uuid import uuid4
from pathlib import Path

from pydantic import BaseSettings, Field

from sqlalchemy.orm import Session

from fastapi import File, UploadFile, Depends
from fastapi.responses import FileResponse

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

from .router import router


LOG = logging.getLogger(__name__)


class Settings(BaseSettings):
    file_store: Path = Field(..., env="FILE_STORE")


@router.post("/", response_model=schemas.Document)
async def upload_file(
    *,
    document_in: schemas.DocumentCreate,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
) -> schemas.Document:

    settings = Settings()

    # document = crud.document.get_by_email(db, email=document_in.email)
    # if document:
    #     raise HTTPException(
    #         status_code=400,
    #         detail="The document with this documentname already exists in the system.",
    #     )

    document = crud.document.create(db, obj_in=document_in)
    document.filename = target_file_name

    LOG.warning(
        "Processing uploaded file %s of content type %s.",
        file.filename,
        file.content_type,
    )
    target_file_name = str(uuid4())
    target_path = settings.file_store / target_file_name

    target_path.write_bytes(await file.read())

    return document


@router.get("/", response_model=List[schemas.Document])
def read_documents(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> List[schemas.Document]:
    """
    Retrieve documents.
    """
    documents = crud.document.get_multi(db, skip=skip, limit=limit)
    return documents


@router.get("/{document_id}", response_model=schemas.Document)
def read_document_by_id(
    document_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific document by id.
    """
    document = crud.document.get(db, id=document_id)
    return document


@router.put("/{document_id}", response_model=schemas.Document)
def update_document(
    *,
    db: Session = Depends(deps.get_db),
    document_id: int,
    document_in: schemas.DocumentUpdate,
) -> schemas.Document:
    """
    Update a document.
    """
    document = crud.document.get(db, id=document_id)
    if not document:
        raise HTTPException(
            status_code=404,
            detail="The document with this id does not exist in the system",
        )
    document = crud.document.update(db, db_obj=document, obj_in=document_in)
    return document


@router.get("/{document_id}/file")
async def download_file(
    document_id: int,
    db: Session = Depends(deps.get_db),
):
    settings = Settings()

    document = crud.document.get(db, id=document_id)
    if not document:
        raise HTTPException(
            status_code=404,
            detail="The document with this id does not exist in the system",
        )

    target_path = settings.file_store / document.filename

    return FileResponse(target_path)
