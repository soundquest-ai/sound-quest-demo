"""ORM model for a document in the system"""

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

# from sqlalchemy.orm import relationship

from app.db.base_class import Base

from .transcript.aws import AWSTranscription
from .word import Word


class Document(Base):
    """ORM model for a document"""

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    filename = Column(String, nullable=True)

    fk_aws_transcription = Column(Integer, ForeignKey("aws_transcription.id"))
    transcription = relationship(AWSTranscription)

    words = relationship(Word, cascade="all, delete-orphan", order_by=Word.order)


Word.document = relationship(Document, back_populates="words")
