from app.imports.external import *

from app.api import deps
from app.db.models.models import User
from app import schemas, crud

router = APIRouter()


@router.get('/conference/{id}', response_model=List[schemas.ConferenceRecognitions])
def get_conference_by_id(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
):
    return crud.conference_recognition.get_by_conference_id(db=db, conference_id=id)


@router.get('/conference_all/{id}', response_model=List[schemas.ConferenceRecognitions])
def get_conference_by_id(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
):
    return crud.conference_recognition.get_by_id(db=db, conference_id=id)


@router.get('/conference_filename/{filename}', response_model=List[schemas.ConferenceRecognitions])
def get_conference_by_id(
        filename: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
):
    return crud.conference_recognition.get_by_filename(db=db, filename=filename)
