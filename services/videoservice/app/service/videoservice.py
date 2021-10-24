import json
from config import config
from app.utils.psql_client import PostgresClient
from app.utils.sftp_client import SftpClient
from app.imports.external import *


class VideoService:
    """
    Convert video to wav audio using ffmpeg
    """
    def __init__(self):
        self.sftp_client = SftpClient()
        self.psql_client = PostgresClient()

    def process_video(self, video_path):
        try:
            local_path = os.path.join(self.sftp_client.download_path, video_path.split('/')[-1])
            conference_id = video_path.split('/')[-1].split('.')[0]

            self.sftp_client.download_file_local(local_path, video_path)

            local_audio_path = os.path.join(self.sftp_client.download_path, f'{conference_id}.wav')

            command = f'ffmpeg -i {local_path} -ab 160k -ac 2 -ar 16000 -vn {local_audio_path}'
            subprocess.call(command, shell=True)

            self.sftp_client.upload_file_local(
                local_audio_path,
                os.path.join(
                    self.sftp_client.upload_path,
                    config.SFTP_AUDIOS,
                    f"{conference_id}.wav",
                )
            )

            self.psql_client.update_conference(conference_id)

            return json.dumps(
                {
                    "path": os.path.join(
                        config.SFTP_AUDIOS,
                        f"{conference_id}.wav",
                    )
                }
            )
        except Exception as e:
            print(f"Exception occurred {e}")
            exit(1)
        finally:
            if local_path:
                os.remove(local_path)
            if local_audio_path and local_audio_path != local_path:
                os.remove(local_audio_path)




