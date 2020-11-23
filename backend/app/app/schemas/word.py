from datetime import timedelta

from pydantic import BaseModel


class Word(BaseModel):

    id: int
    word: str
    start_time: timedelta
    end_time: timedelta
    confidence: float

    class Config:
        orm_mode = True
