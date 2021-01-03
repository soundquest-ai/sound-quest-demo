from typing import Any, Dict, Optional, List

from sqlalchemy import func, text
from sqlalchemy.orm import Session


from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentUpdate


class CRUDDocument(CRUDBase[Document, DocumentCreate, DocumentUpdate]):
    def filter_document(
        self, db: Session, *, filter_str: str, skip: int = 0, limit: int = 100
    ) -> List[Document]:

        # construct the query operand for the full test search. Use
        # the regconfig of the table column. We need to cast it to
        # regconfig, which seems to not be possible in sqlalchemy, so
        # construct the term as text.
        ts_query = func.websearch_to_tsquery(
            text("fulltext_regconfig::regconfig"), filter_str
        )

        # func.ts_headline(Document.fulltext_regconfig,
        # ts_query,
        # Document.fulltext)
        res = (
            db.query(Document)
            .filter(Document.fulltext_search_vector.op("@@")(ts_query))
            .offset(skip)
            .limit(limit)
            .all()
        )

        return res


document = CRUDDocument(Document)
