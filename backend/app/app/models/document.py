from sqlalchemy import Column, Integer, String

# from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Document(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    filename = Column(String, nullable=True)
