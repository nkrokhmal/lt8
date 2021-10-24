from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from app.db.base import Base
from app.core.config import settings
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
import json


class UserConference(Base):
    __tablename__ = 'user_conference'

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    conference_id = Column(String, ForeignKey('conferences.id'), primary_key=True)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    details = Column(String)
    is_active = Column(Boolean, default=True)

    conferences = relationship("Conference", secondary=UserConference.__tablename__, back_populates="participants")

    @property
    def confirmation_token(self):
        serializer = URLSafeTimedSerializer(settings.TOKEN_SECRET_KEY)
        return serializer.dumps(self.email, salt=settings.TOKEN_SECURITY_PASSWORD_SALT)

    @staticmethod
    def confirm_token(token, expiration=3600):
        serializer = URLSafeTimedSerializer(settings.TOKEN_SECRET_KEY)
        try:
            email = serializer.loads(
                token,
                salt=settings.TOKEN_SECURITY_PASSWORD_SALT,
                max_age=expiration
            )
            return email
        except:
            return False


def generate_uuid():
    return str(uuid.uuid4())


class Conference(Base):
    __tablename__ = 'conferences'

    id = Column(String, primary_key=True)
    name = Column(String)
    date = Column(DateTime)
    creation_date = Column(DateTime)

    stt_recognition = Column(String, nullable=True)
    recognition = Column(String, nullable=True)

    video_url = Column(String, nullable=True)
    audio_url = Column(String, nullable=True)

    status = Column(String)

    participants = relationship("User", secondary=UserConference.__tablename__, back_populates="conferences")
    conference_recognitions = relationship("ConferenceRecognition", back_populates="conference")

    def __init__(self, **kwargs):
        super(Conference, self).__init__(**kwargs)
        self.id = generate_uuid()
        self.creation_date = datetime.now()

    @property
    def ai_recognition(self):
        if not self.recognition:
            return " "
        try:
            return " ".join([x["Word"] for x in json.loads(self.recognition)]) + " "
        except Exception as e:
            print(e)
            return " "


class ConferenceRecognition(Base):
    __tablename__ = 'conference_recognitions'

    id = Column(Integer, primary_key=True)
    filename = Column(String)
    audio_url = Column(String)
    status = Column(String)
    recognition = Column(String)

    conference_id = Column(String, ForeignKey('conferences.id'))
    conference = relationship("Conference", back_populates="conference_recognitions")


