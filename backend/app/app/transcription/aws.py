from typing import Any
import logging
import time
import json

from fastapi import Depends
import boto3, botocore

from app import file_store

LOG = logging.getLogger(__name__)


def transcribe(
    filekey: str,
    aws_bucket_name: str,
    lang: str,
) -> Any:
    """
    transcribe a file with AWS transcribe
    """
    document_file = file_store.get_file_for_key(filekey)
    assert document_file.is_file()

    transcript_key = file_store.get_transcript_key(filekey, lang=lang, platform="aws")
    transcript_file = file_store.get_transcript_path(filekey, lang=lang, platform="aws")
    if transcript_file.is_file():
        return json.load(transcript_file.open())

    # make the folder to the transcripts
    transcript_file.parent.mkdir(parents=True, exist_ok=True)

    # the transcript does not exist, so do it with aws
    s3 = boto3.resource("s3")
    transcribe_client = boto3.client("transcribe")

    bucket = s3.Bucket(aws_bucket_name)
    file_obj = s3.Object(aws_bucket_name, filekey)
    transcript_obj = s3.Object(aws_bucket_name, transcript_key)

    # try to download the transcript. If this succeeds, we store it in
    # the file_store and and return the transcript

    try:
        transcript_obj.download_file(str(transcript_file))
        return json.load(transcript_file.open())
    except botocore.exceptions.ClientError as e:
        if not e.response["Error"]["Code"] == "404":
            # unknown error we want to print.
            LOG.error("Unknown error: %s", e)

    # check if the file is already uploaded
    try:
        file_obj.load()
        LOG.info("File is already uploaded as %s.", file_obj)
    except botocore.exceptions.ClientError as e:
        LOG.info("Uploading file %s to %s.", document_file, file_obj)
        file_obj.upload_file(str(document_file))

    media_file_uri = f"s3://{aws_bucket_name}/{filekey}"
    job_name = f"transcribe_{transcript_key.replace('/', '_')}"
    response = transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        OutputBucketName=aws_bucket_name,
        OutputKey=transcript_key,
        Media={"MediaFileUri": media_file_uri},
        LanguageCode=lang,
    )

    for i in range(100):
        job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)[
            "TranscriptionJob"
        ]
        status = job["TranscriptionJobStatus"]
        if status in [
            "COMPLETED",
            "FAILED",
        ]:
            if status == "FAILED":
                LOG.error("Transcription failed: %s", job["FailureReason"])
                return None
            break
        time.sleep(5)

    # download the file and store it in the transcript file
    transcript_obj.download_file(str(transcript_file))
    return json.load(transcript_file.open())
