from app.imports.external import *


class ConferenceRecognitionBase(BaseModel):
    filename: Optional[str]
    status: Optional[str]

    class Config:
        orm_mode = True


class ConferenceRecognitionCreate(ConferenceRecognitionBase):
    pass


class ConferenceRecognitionUpdate(ConferenceRecognitionBase):
    pass


class ConferenceRecognitions(ConferenceRecognitionBase):
    audio_url: Optional[str]
    recognition: Optional[str]
    conference_id: Optional[str]