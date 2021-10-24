import os


class Config:
    # Postgresql connection params
    PSQL_DB = os.environ.get("PSQL_DB")
    PSQL_USERNAME = os.environ.get("PSQL_USERNAME")
    PSQL_PASSWORD = os.environ.get("PSQL_PASSWORD")
    PSQL_HOST = os.environ.get("PSQL_HOST")

    # Rabbitmq connection params
    RABBITMQ_HOST = os.environ.get("RABBITMQ_HOST")
    RABBITMQ_VHOST = os.environ.get("RABBITMQ_VHOST")
    RABBITMQ_USERNAME = os.environ.get("RABBITMQ_USERNAME")
    RABBITMQ_PASSWORD = os.environ.get("RABBITMQ_PASSWORD")
    RABBITMQ_PORT = os.environ.get("RABBITMQ_PORT")
    RABBITMQ_QUEUE_VIDEO_NAME = os.environ.get("RABBITMQ_QUEUE_VIDEO_NAME")
    RABBITMQ_QUEUE_AUDIO_NAME = os.environ.get("RABBITMQ_QUEUE_AUDIO_NAME")
    RABBITMQ_QUEUE_STT_NAME = os.environ.get("RABBITMQ_QUEUE_STT_NAME")

    # Sftp connection params
    SFTP_HOST = os.environ.get("SFTP_HOST")
    SFTP_USERNAME = os.environ.get("SFTP_USERNAME")
    SFTP_PASSWORD = os.environ.get("SFTP_PASSWORD")
    SFTP_BASE_PATH = os.environ.get("SFTP_BASE_PATH")
    SFTP_DOWNLOAD_PATH = os.environ.get("SFTP_DOWNLOAD_PATH")
    SFTP_AUDIOS = os.environ.get("SFTP_AUDIOS")
    SFTP_VIDEOS = os.environ.get("SFTP_VIDEOS")

    CHUNK_TIME = os.environ.get("CHUNK_TIME") or 5 * 60
    CHUNK_PATH = os.environ.get("CHUNK_PATH") or os.path.join(SFTP_DOWNLOAD_PATH, "chunks")


config = Config()