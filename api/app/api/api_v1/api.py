from fastapi import APIRouter

from app.api.api_v1.endpoints import login, users, conference, file, rabbitmq, conference_recognitions

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, tags=["users"], prefix="/users")
api_router.include_router(conference.router, tags=['conference'], prefix="/conference")
api_router.include_router(file.router, tags=['file'])
api_router.include_router(rabbitmq.router, tags=['rabbitmq'], prefix="/rq")
api_router.include_router(conference_recognitions.router, tags=['conference_recognitions'], prefix="/conference_recognitions")
