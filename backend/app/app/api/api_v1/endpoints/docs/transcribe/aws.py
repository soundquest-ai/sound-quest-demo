from typing import Any
from fastapi import Depends
import boto3

from sqlalchemy.orm import Session
from sqlalchemy import func

from app import crud
from app.api import deps
from app.transcription import aws

from ..router import router


@router.post("/{document_id}/transcribe/aws")  # , response_model=schemas.Document
def transcribe_with_aws(
    document_id: int,
    aws_bucket_name: str = "soundqesstt",
    lang: str = "de-DE",
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific document by id.
    """

    document = crud.document.get(db, id=document_id)

    aws.transcribe_document(document, aws_bucket_name=aws_bucket_name, lang=lang)

    assert document.transcription

    document.fulltext = document.transcription.full_text
    document.fulltext_search_vector = func.to_tsvector(document.transcription.full_text)

    db.commit()
    db.refresh(document)

    return document
