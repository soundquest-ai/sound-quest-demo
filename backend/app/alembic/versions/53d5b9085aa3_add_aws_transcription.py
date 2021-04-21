"""Add aws transcription

Revision ID: 53d5b9085aa3
Revises: 4cbbadd88af6
Create Date: 2020-11-22 14:44:58.476599

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "53d5b9085aa3"
down_revision = "4cbbadd88af6"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "aws_transcription",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("raw", postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column("full_text", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_aws_transcription_id"), "aws_transcription", ["id"], unique=False
    )
    op.add_column(
        "document", sa.Column("fk_aws_transcription", sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        None, "document", "aws_transcription", ["fk_aws_transcription"], ["id"]
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "document", type_="foreignkey")
    op.drop_column("document", "fk_aws_transcription")
    op.drop_index(op.f("ix_aws_transcription_id"), table_name="aws_transcription")
    op.drop_table("aws_transcription")
    # ### end Alembic commands ###
