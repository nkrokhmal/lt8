from app.imports.external import *

from app.utils.security import get_password_hash, verify_password

from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.db.models import User, Conference
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        user = User(
            full_name=obj_in.full_name,
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def create_user(self, db: Session, *, obj_in: UserCreate) -> User:
        user = User(
            full_name=obj_in.email,
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def update(self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        if update_data["password"]:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password

        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[str]:
        user = self.get_by_email(db, email=email)
        if not User:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: User) -> bool:
        return user.is_active

    def add_user_to_conference(self, db: Session, *, id: int, conference: Conference) -> User:
        user = self.get(db, id)
        user.conferences.append(conference)
        return user

    def remove_by_email(self, db: Session, *, email: str) -> None:
        user = db.query(User).filter(User.email == email).first()
        self.remove(db, id=user.id)


user = CRUDUser(User)
