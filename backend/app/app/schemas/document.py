from typing import Optional

from pydantic import BaseModel


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

    class Config:
        orm_mode = True


# Additional properties to return via API
class Document(DocumentInDBBase):
    pass


# Additional properties stored in DB
class DocumentInDB(DocumentInDBBase):
    filename: str
