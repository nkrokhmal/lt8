from app.service import SpeechToTextClient
from app.utils.rabbitmq_client import RabbitMQClient
import os
from config import config

stt_service = SpeechToTextClient()
rabbitmq_client = RabbitMQClient(stt_service.recognize)


def create_app():
    if not os.path.exists(config.SFTP_DOWNLOAD_PATH):
        os.makedirs(
            os.path.join(os.getcwd(), config.SFTP_DOWNLOAD_PATH)
        )
    return rabbitmq_client





