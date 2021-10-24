from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.db import base


def init_db(db: Session) -> None:
    user = crud.user.get_by_email(db, email=settings.USER_EMAIL)
    if not user:
        admin_in = schemas.UserCreate(
            email=settings.USER_EMAIL,
            password=settings.USER_PASSWORD,
        )
        _ = crud.user.create_user(db=db, obj_in=admin_in)