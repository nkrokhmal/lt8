from fastapi import FastAPI
import uvicorn
from app.api.api_v1.api import api_router
from app.db import base, session
from fastapi.middleware.cors import CORSMiddleware


class RAPI(FastAPI):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.rabbitmq_client = RabbitMQClient()
        # print("Creating sftp client")
        # self.sftp_client = SftpClient()
        # print("Created")


app = RAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

base.Base.metadata.create_all(session.engine)

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


