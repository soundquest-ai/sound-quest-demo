"""add document

Revision ID: 3712b66b0ca3
Revises: 1971408adac3
Create Date: 2020-11-13 08:35:53.785639

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "3712b66b0ca3"
down_revision = "1971408adac3"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "document",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("filename", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_document_id"), "document", ["id"], unique=False)
    op.create_index(op.f("ix_document_title"), "document", ["title"], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_document_title"), table_name="document")
    op.drop_index(op.f("ix_document_id"), table_name="document")
    op.drop_table("document")
    # ### end Alembic commands ###