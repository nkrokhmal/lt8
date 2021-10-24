from app.imports.external import *
from app.crud.base import CRUDBase
from app.db.models.models import *
from app.schemas import conference_recognition


class CRUDConferenceRecognitions(
    CRUDBase[
        ConferenceRecognition,
        conference_recognition.ConferenceRecognitionCreate,
        conference_recognition.ConferenceRecognitionUpdate
    ]
):
    def get_by_conference_id(self, db: Session, *, conference_id: str) -> List[ConferenceRecognition]:
        return db.query(Conference).filter(Conference.id == conference_id).first().conference_recognitions

    def get_by_id(self, db: Session, *, conference_id: str) -> List[ConferenceRecognition]:
        return db.query(ConferenceRecognition)\
            .filter(ConferenceRecognition.conference_id == conference_id)\
            .all()

    def get_by_filename(self, db: Session, *, filename: str) -> List[ConferenceRecognition]:
        return db.query(ConferenceRecognition)\
            .filter(ConferenceRecognition.filename == filename)\
            .all()


conference_recognition = CRUDConferenceRecognitions(ConferenceRecognition)


