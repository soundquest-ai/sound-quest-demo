from typing import Optional

from pydantic import BaseModel


class AWSTranscription(BaseModel):

    id: int

    full_text: Optional[str]

    class Config:
        orm_mode = True


# Shared properties
class DocumentBase(BaseModel):
    title: Optional[str] = None


# Properties to receive via API on creation
class DocumentCreate(DocumentBase):
    pass


# Properties to receive via API on update
class DocumentUpdate(DocumentBase):
    pass


class DocumentInDBBase(DocumentBase):
    id: Optional[int] = None
    filename: Optional[str]
    transcription: Optional[AWSTranscription]

    class Config:
        orm_mode = True


# Additional properties to return via API
class Document(DocumentInDBBase):
    pass


# Additional properties stored in DB
class DocumentInDB(DocumentInDBBase):
    pass
