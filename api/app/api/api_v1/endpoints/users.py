from app.imports.external import *
from app import schemas, crud
from app.db import models
from app.api import deps
from app.imports.external import *
from app.core.config import settings
from app.utils.email import send_new_account_email

router = APIRouter()


@router.get("/", response_model=List[schemas.User])
def get_users(
        db: Session = Depends(deps.get_db),
        skip: int = 0,
        limit: int = 100,
        current_user: models.User = Depends(deps.get_current_user)
) -> Any:

    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.User)
def create_user(
        db: Session = Depends(deps.get_db),
        user_in: schemas.UserCreate = None,
        current_user: models.User = Depends(deps.get_current_user)
) -> Any:
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with such email already exists in the system"
        )
    user = crud.user.create(db, obj_in=user_in)
    if settings.EMAILS_ENABLED and user_in.email:
        token = user.confirmation_token
        send_new_account_email(email_to=user_in.email, token=token)
    return user


@router.delete("/", response_model=schemas.UserDelete)
def delete_user(
        db: Session = Depends(deps.get_db),
        user_delete: schemas.UserDelete = None,
        current_user: models.User = Depends(deps.get_current_user)
):
    if current_user.email == user_delete.email:
        crud.user.remove_by_email(db, email=user_delete.email)
    return user_delete


@router.get("confirm_token/{token}", response_model=schemas.User)
def approve_token(
        token: str = "",
        db: Session = Depends(deps.get_db),
):
    email = models.User.confirm_token(token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found",
        )
    user = crud.user.get_by_email(db, email=email)
    user.is_active = True
    return user


@router.get("/", response_model=List[schemas.User])
def get_users(
        db: Session = Depends(deps.get_db),
        skip: int = 0,
        limit: int = 100,
        current_user: models.User = Depends(deps.get_current_user)
) -> Any:
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.get("/me/", response_model=schemas.User)
def get_user_me(
        db: Session = Depends(deps.get_db),
        current_user: models.User = Depends(deps.get_current_user),
) -> models.User:
    user = crud.user.get(db, id=current_user.id)
    return user


@router.post("/me/", response_model=schemas.User)
def update_user_me(
        db: Session = Depends(deps.get_db),
        user_in: schemas.UserUpdate = None,
        current_user: models.User = Depends(deps.get_current_user)
):
    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return user


