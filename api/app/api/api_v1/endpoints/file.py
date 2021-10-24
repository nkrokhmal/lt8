from app.imports.external import *

router = APIRouter()


@router.get('/audio/')
async def get_audio(
        filename: str = ""
) -> Any:
    if os.path.exists(os.path.join("data", "audios", filename)):
        return FileResponse(os.path.join("data", "audios", filename))
    return HTTPException(status_code=404, detail="No such audio")


@router.get('/video/')
async def get_video(
        filename: str = ""
) -> Any:
    if os.path.exists(os.path.join("data", "videos", filename)):
        return FileResponse(os.path.join("data", "videos", filename))
    return HTTPException(status_code=404, detail="No such video")


