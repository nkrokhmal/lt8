from pydantic import BaseModel


class RQVideoMsg(BaseModel):
    path: str


class RQAudioMsg(BaseModel):
    path: str