import os

from app.imports.external import *

from app.api import deps
from app.db.models.models import User
from app import schemas, crud

from io import StringIO

router = APIRouter()


@router.get('/', response_model=List[schemas.ConferenceList])
def get_conferences(
        db: Session = Depends(deps.get_db),
        skip: int = 0,
        limit: int = 100,
        current_user: User = Depends(deps.get_current_user),
):
    conferences = crud.conference.get_multi(db, skip=skip, limit=limit)
    return conferences


@router.post('/upload_audios/', response_model=schemas.Conference)
def create_conference(
        request: Request,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
        conference_in: schemas.ConferenceCreate = None,
        file: UploadFile = File(...),
) -> Any:
    conference = crud.conference.create_audio(
        request=request,
        db=db,
        obj_in=conference_in,
        user=current_user,
        file=file,
    )
    return conference


@router.post('/upload_videos/', response_model=schemas.Conference)
def create_conference(
        request: Request,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
        conference_in: schemas.ConferenceCreate = None,
        file: UploadFile = File(...),
) -> Any:
    conference = crud.conference.create_video(
        request=request,
        db=db,
        obj_in=conference_in,
        user=current_user,
        file=file,
    )
    return conference


@router.get('/{id}', response_model=schemas.Conference)
def get_conference_by_id(
        id: str,
        db: Session = Depends(deps.get_db),
        # current_user: User = Depends(deps.get_current_user),
):
    conference = crud.conference.get(db=db, id=id)
    if not conference:
        raise HTTPException(status_code=404, detail='Conference not found')
    # if current_user.id not in conference.participants:
    #     raise HTTPException(status_code=403, detail='Not enough permissions')
    return conference


@router.delete('/{id}', response_model=schemas.Conference)
def delete_conference_by_id(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user)
):
    conference = crud.conference.remove(db=db, id=id)
    if not conference:
        raise HTTPException(status_code=404, detail='Conference not found')
    return conference


@router.get('/recognitions/{id}', response_model=List[schemas.ConferenceRecognitions])
def get_conference_recognitions_by_id(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
):
    recognitions = crud.conference.get_conference_recognitions(db=db, id=id)
    # if not conference:
    #     raise HTTPException(status_code=404, detail='Conference not found')
    # if current_user.id not in conference.participants:
    #     raise HTTPException(status_code=403, detail='Not enough permissions')
    return recognitions


@router.get('/ai_stt/{id}')
def ai_stt(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
):
    conference = crud.conference.get(db=db, id=id)
    if os.path.exists(f"data/{id}_ai.txt"):
        os.remove(f"data/{id}_ai.txt")

    with open(f"data/{id}_ai.txt", "x") as f:
        f.write(conference.ai_recognition)

    return FileResponse(os.path.join(os.getcwd(), "data", f"{id}_ai.txt"), filename=f"{id}_ai.txt", media_type='application/octet-stream')


@router.get('/edited_stt/{id}')
def edited_stt(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
):
    conference = crud.conference.get(db=db, id=id)
    if os.path.exists(f"data/{id}.txt"):
        os.remove(f"data/{id}.txt")

    with open(f"data/{id}.txt", "x") as f:
        if not conference.stt_recognition:
            f.write(conference.ai_recognition)
        else:
            f.write(conference.stt_recognition)

    return FileResponse(os.path.join(os.getcwd(), "data", f"{id}.txt"), filename=f"{id}.txt",
                        media_type='application/octet-stream')


@router.post('/update_stt/{id}', response_model=schemas.ConferenceList)
def edited_stt(
        id: str,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_user),
        text: schemas.ConferenceSTT = None,
):
    conference = crud.conference.update_stt(db=db, id=id, obj_in=text)
    return conference
