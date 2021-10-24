from app.imports.external import *
from datetime import datetime
from fastapi import UploadFile, File


class ConferenceBase(BaseModel):
    id: Optional[str]
    name: Optional[str]
    date: datetime = datetime.now()

    class Config:
        orm_mode = True


class ConferenceCreate(ConferenceBase):
    pass


class ConferenceUpdate(ConferenceBase):
    pass


class ConferenceSTT(BaseModel):
    text: Optional[str]


class ConferenceList(ConferenceBase):
    status: Optional[str]
    video_url: Optional[str]
    audio_url: Optional[str]


class Conference(ConferenceBase):
    status: Optional[str]
    stt_recognition: Optional[str]
    recognition: Optional[str]
    video_url: Optional[str]
    audio_url: Optional[str]


