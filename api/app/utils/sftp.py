import pysftp
from io import BytesIO
from app.core.config import settings
import os


class SftpClient:
    def __init__(self):
        self.init_app()

    def init_app(self):
        cnopts = pysftp.CnOpts()
        cnopts.hostkeys = None

        self.host = settings.SFTP_HOST
        self.sftp_client = pysftp.Connection(
            host=settings.SFTP_HOST,
            username=settings.SFTP_USERNAME,
            password=settings.SFTP_PASSWORD,
            cnopts=cnopts)

        self.upload_path = settings.SFTP_BASE_PATH
        self.download_path = settings.SFTP_DOWNLOAD_PATH

    def upload_file(self, file, path):
        self.sftp_client.putfo(file, os.path.join(self.upload_path, path))

    def download_file(self, remote_path):
        file = BytesIO()
        self.sftp_client.getfo(self.upload_path + remote_path, file)
        file.seek(0)
        return file

    def download_file_local(self, local_path, remote_path):
        self.sftp_client.get(self.upload_path + remote_path, localpath=local_path)