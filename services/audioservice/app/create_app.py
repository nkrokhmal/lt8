from app.service import AudioService
from app.utils.rabbitmq_client import RabbitMQClient
import os
from config import config


def create_app():
    if not os.path.exists(config.CHUNK_PATH):
        os.makedirs(
            os.path.join(os.getcwd(), config.CHUNK_PATH)
        )

    audio_service = AudioService()
    rabbitmq_client = RabbitMQClient(audio_service.process)

    return rabbitmq_client





