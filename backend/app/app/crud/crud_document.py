from typing import Any, Dict, Optional, List

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentUpdate


class CRUDDocument(CRUDBase[Document, DocumentCreate, DocumentUpdate]):
    def filter_document(
        self, db: Session, *, filter_str: str, skip: int = 0, limit: int = 100
    ) -> List[Document]:
        return (
            db.query(Document)
            .filter(Document.fulltext_search_vector.match(filter_str))
            .offset(skip)
            .limit(limit)
            .all()
        )


document = CRUDDocument(Document)
