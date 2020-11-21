from typing import Any
from fastapi import Depends
import boto3

from sqlalchemy.orm import Session

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

    filekey = document.filename

    transcript = aws.transcribe(
        filekey=filekey,
        aws_bucket_name=aws_bucket_name,
        lang=lang,
    )
    return transcript
