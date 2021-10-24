from app.service import VideoService
from app.utils.rabbitmq_client import RabbitMQClient
import os
from config import config


video_service = VideoService()
rabbitmq_client = RabbitMQClient(video_service.process_video)


# Creating application
def create_app():
    if not os.path.exists(config.SFTP_DOWNLOAD_PATH):
        os.makedirs(
            os.path.join(os.getcwd(), config.SFTP_DOWNLOAD_PATH)
        )
    return rabbitmq_client





