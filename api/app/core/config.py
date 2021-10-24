from pydantic import BaseSettings
import secrets
import os


class Settings(BaseSettings):
    SECRET_KEY = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES") or 60 * 24 * 8

    SQLALCHAMY_DATABASE_URL = os.environ.get("SQLALCHAMY_DATABASE_URL")

    USER_EMAIL = os.environ.get("USER_EMAIL") or 'admin@mail.ru'
    USER_PASSWORD = os.environ.get("USER_PASSWORD") or '1'

    EMAILS_ENABLED = True
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    MAIL_FROM = os.environ.get("MAIL_FROM")
    MAIL_PORT = os.environ.get("MAIL_PORT")
    MAIL_SERVER = os.environ.get("MAIL_SERVER")
    MAIL_FROM_NAME = os.environ.get("MAIL_FROM_NAME")
    MAIL_RESET_TOKEN_EXPIRE_HOURS = os.environ.get("MAIL_RESET_TOKEN_EXPIRE_HOURS")

    TOKEN_SECRET_KEY = 'token-secret-key'
    TOKEN_SECURITY_PASSWORD_SALT = 'token-security-password-salt'

    RABBITMQ_HOST = os.environ.get("RABBITMQ_HOST")
    RABBITMQ_VHOST = os.environ.get("RABBITMQ_VHOST")
    RABBITMQ_USERNAME = os.environ.get("RABBITMQ_USERNAME")
    RABBITMQ_PASSWORD = os.environ.get("RABBITMQ_PASSWORD")

    RABBITMQ_PORT = os.environ.get("RABBITMQ_PORT")
    RABBITMQ_VIDEO_QUEUE = os.environ.get("RABBITMQ_VIDEO_QUEUE") or "video"
    RABBITMQ_AUDIO_QUEUE = os.environ.get("RABBITMQ_AUDIO_QUEUE") or "audio"
    RABBITMQ_STT_QUEUE = os.environ.get("RABBITMQ_STT_QUEUE") or "stt"

    SFTP_HOST = os.environ.get("SFTP_HOST")
    SFTP_USERNAME = os.environ.get("SFTP_USERNAME")
    SFTP_PASSWORD = os.environ.get("SFTP_PASSWORD")
    SFTP_BASE_PATH = os.environ.get("SFTP_BASE_PATH")
    SFTP_DOWNLOAD_PATH = os.environ.get("SFTP_DOWNLOAD_PATH") or "data"


settings = Settings()
