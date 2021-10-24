from app.imports.external import *
from app.crud.base import CRUDBase
from app.db.models.models import *
from app.schemas import conference
from fastapi import Request
from app.core.config import settings
from .user import user
from app.utils.rabbitmq import RabbitMQClient
from app.utils.sftp import SftpClient


# todo: add upload
class CRUDConference(CRUDBase[Conference, conference.ConferenceCreate, conference.ConferenceUpdate]):
    def create_with_owner(self, db: Session, *, obj_in: conference.ConferenceCreate, owner_id: int) -> Conference:

        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db_obj.participants.append(user.get(db, owner_id))
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj

    def get_multi_by_owner(self, db: Session, *, owner_id: int, skip: int=0, limit: int = 100) -> List[Conference]:
        return db.query(User)\
            .filter(User.id == owner_id)\
            .first()\
            .conferences\
            .offset(skip)\
            .limit(limit)\
            .all()

    def update_stt(self,  db: Session, *, obj_in: conference.ConferenceSTT, id: str) -> Conference:
        conference = db.query(Conference).filter(Conference.id == id).first()
        conference.stt_recognition = obj_in.text
        db.commit()

        return conference

    def create_audio(self, request: Request, db: Session, *, obj_in: conference.ConferenceCreate, user: User,
                     file: UploadFile = File(...)) -> Conference:

        filename_ext = file.filename.split('.')[-1]
        db_obj = Conference(
            name=".".join(file.filename.split('.')[:-1]) if not obj_in.name else obj_in.name,
            date=obj_in.date,
            status="in_progress",
        )
        db_obj.audio_url = f"https://{settings.SFTP_HOST}/audios/{db_obj.id}.{filename_ext}"

        sftp_client = SftpClient()
        sftp_client.upload_file(file=file.file, path=f"audios/{db_obj.id}.{filename_ext}")

        db_obj.participants.append(user)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        rq_client = RabbitMQClient()
        rq_client.create_queue(settings.RABBITMQ_AUDIO_QUEUE)
        rq_client.publish(
            queue=settings.RABBITMQ_AUDIO_QUEUE,
            msg=json.dumps(
                {
                    "path": f"audios/{db_obj.id}.{filename_ext}",
                }
            )
        )

        return db_obj

    def create_video(self, request: Request, db: Session, *, obj_in: conference.ConferenceCreate, user: User,
                     file: UploadFile = File(...)) -> Conference:
        filename_ext = file.filename.split('.')[-1]
        db_obj = Conference(
            name=".".join(file.filename.split('.')[:-1]) if not obj_in.name else obj_in.name,
            date=obj_in.date,
            status="in_progress",
        )
        db_obj.video_url = f"https://{settings.SFTP_HOST}/videos/{db_obj.id}.{filename_ext}"

        sftp_client = SftpClient()
        sftp_client.upload_file(file=file.file, path=f"videos/{db_obj.id}.{filename_ext}")

        db_obj.participants.append(user)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        rq_client = RabbitMQClient()
        rq_client.create_queue(settings.RABBITMQ_VIDEO_QUEUE)
        rq_client.publish(
            queue=settings.RABBITMQ_VIDEO_QUEUE,
            msg=json.dumps(
                {
                    "path": f"videos/{db_obj.id}.{filename_ext}",
                }
            )
        )

        return db_obj


conference = CRUDConference(Conference)


