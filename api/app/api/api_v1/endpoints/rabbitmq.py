from app.imports.external import *
from app.core.config import settings
from app.schemas.rq_messages import RQVideoMsg, RQAudioMsg
from app.utils.rabbitmq import RabbitMQClient

router = APIRouter()


@router.post('/video/')
async def send_video_msg(msg: RQVideoMsg, request: Request):
    rq_client = RabbitMQClient()
    rq_client.create_queue(settings.RABBITMQ_VIDEO_QUEUE)
    rq_client.publish(
        queue=settings.RABBITMQ_VIDEO_QUEUE,
        msg=json.dumps(
            {
                "path": msg.path,
            }
        )
    )


@router.post('/audio/')
async def send_audio_msg(msg: RQAudioMsg, request: Request):
    rq_client = RabbitMQClient()
    rq_client.create_queue(settings.RABBITMQ_AUDIO_QUEUE)
    rq_client.publish(
        queue=settings.RABBITMQ_AUDIO_QUEUE,
        msg=json.dumps(
            {
                "path": msg.path,
            }
        )
    )


@router.post('/stt/')
async def send_stt_msg(msg: RQAudioMsg, request: Request):
    rq_client = RabbitMQClient()
    rq_client.create_queue(settings.RABBITMQ_STT_QUEUE)
    rq_client.publish(
        queue=settings.RABBITMQ_STT_QUEUE,
        msg=json.dumps(
            {
                "path": msg.path,
            }
        )
    )