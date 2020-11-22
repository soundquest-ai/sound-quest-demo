from typing import Any
from fastapi import Depends
import boto3

from sqlalchemy.orm import Session

from app import crud, models, schemas, file_store
from app.api import deps

from ..router import router


@router.post("/{document_id}/transcribe/aws")  # , response_model=schemas.Document
def transcribe_with_aws(
    document_id: int,
    bucket_name: str = "soundqesstt",
    aws_region: str = "eu-central-1",
    lang: str = "de-DE",
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific document by id.
    """
    document = crud.document.get(db, id=document_id)

    transcript_file = file_store.get_transcript(document, "aws")
    if transcript_file.is_file():
        return json.load(transcript_file)

    return
    # the transcipt does not exist, so do it with aws
    s3 = boto3.resource("s3")
    s3_client = boto3.client("s3")
    transcribe_client = boto3.client("transcribe")

    bucket = s3.Bucket(bucket_name)
    if not document.filename in [obj.key for obj in bucket.objects.all()]:
        document_file = file_store.get_file_for_doc(document)
        assert document_file.is_file()
        s3_client.upload_file(document_file, bucket_name, document.filename)
    media_file_uri = (
        f"https://s3.{aws_region}.amazonaws.com/{bucket_name}/{document.filename}"
    )
    output_key = transcript_file.name

    job_name = document.filename
    response = transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        OutputBucketName=bucket_name,
        OutputKey=output_key,
        Media={"MediaFileUri": media_file_uri},
        LanguageCode=lang,
    )

    for i in range(100):
        status = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
        if status["TranscriptionJob"]["TranscriptionJobStatus"] in [
            "COMPLETED",
            "FAILED",
        ]:
            break
        time.sleep(5)

    s3_client.download_file(bucket_name, output_key, transcript_file)

    return json.load(transcript_file)
