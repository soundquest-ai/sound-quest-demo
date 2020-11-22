"""ORM model for a document in the system"""

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

# from sqlalchemy.orm import relationship

from app.db.base_class import Base

from .transcript.aws import AWSTranscription


class Document(Base):
    """ORM model for a document"""

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    filename = Column(String, nullable=True)

    fk_aws_transcription = Column(Integer, ForeignKey("aws_transcription.id"))
    transcription = relationship(AWSTranscription)
