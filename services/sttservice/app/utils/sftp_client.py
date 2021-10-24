from app.imports.external import *
from config import config


class SftpClient(object):
    def __init__(self):
        cnopts = pysftp.CnOpts()
        cnopts.hostkeys = None

        self.host = config.SFTP_HOST
        self.sftp_client = pysftp.Connection(
            host=config.SFTP_HOST,
            username=config.SFTP_USERNAME,
            password=config.SFTP_PASSWORD,
            cnopts=cnopts)
        self.upload_path = config.SFTP_BASE_PATH
        self.download_path = config.SFTP_DOWNLOAD_PATH

    def download_file(self, remote_path):
        file = BytesIO()
        self.sftp_client.getfo(self.upload_path + remote_path, file)
        file.seek(0)
        return file

    def download_file_local(self, local_path, remote_path):
        print('Downloading from {}'.format(os.path.join(self.upload_path, remote_path)))
        self.sftp_client.get(os.path.join(self.upload_path, remote_path), localpath=local_path)

    def upload_file(self, file, path):
        self.sftp_client.putfo(file, os.path.join(self.upload_path, path))

    def upload_file_local(self, local_path, path):
        print(local_path)
        print(os.path.exists(local_path))
        self.sftp_client.put(local_path, path)