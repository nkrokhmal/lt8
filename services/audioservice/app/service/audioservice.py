import os.path

from app.utils.psql_client import PostgresClient
from app.utils.sftp_client import SftpClient
from app.imports.external import *
from config import config


class AudioService:
    """
    Split audio into several short audios and send them to sttservice
    """
    def __init__(self):
        self.sftp_client = SftpClient()
        self.psql_client = PostgresClient()

    def get_chunks(self, conference_id):
        return [
            os.path.join(config.CHUNK_PATH, f) for f in os.listdir(config.CHUNK_PATH)
            if os.path.isfile(os.path.join(config.CHUNK_PATH, f)) and f.startswith(conference_id)
        ]

    def get_filename(self, path):
        return path.split('/')[-1]

    def process(self, audio_path):
        try:
            local_path = os.path.join(self.sftp_client.download_path, audio_path.split('/')[-1])
            conference_id = self.get_filename(audio_path).split('.')[0]

            self.sftp_client.download_file_local(local_path, audio_path)

            local_audio_path = os.path.join(self.sftp_client.download_path, f'{conference_id}_16000.wav')

            command_to_16000 = f'ffmpeg -i {local_path} -y -af -ac 1 "aformat=sample_fmts=s16:sample_rates=16000" {local_audio_path}'
            subprocess.call(command_to_16000, shell=True)

            command_split_audios = f'ffmpeg -i {local_audio_path} -y -f segment -segment_time {config.CHUNK_TIME} -c copy data/chunks/{conference_id}_%03d.wav'
            subprocess.call(command_split_audios, shell=True)

            audio_chunks = self.get_chunks(conference_id)

            rabbitmq_messages = []

            for audio_chunk in audio_chunks:
                self.sftp_client.upload_file_local(
                    audio_chunk,
                    os.path.join(
                        self.sftp_client.upload_path,
                        "chunks",
                        f"{self.get_filename(audio_chunk)}"
                    )
                )
                if self.psql_client.client.closed == 0:
                    self.psql_client.connect()
                self.psql_client.create_conference_recognition(
                    conference_id=conference_id,
                    audio_url=f"https://{config.SFTP_HOST}/chunks/{self.get_filename(audio_chunk)}"
                )
                rabbitmq_messages.append(
                    json.dumps(
                        {
                            "path": os.path.join("chunks", f"{self.get_filename(audio_chunk)}")
                        }
                    )
                )
            return rabbitmq_messages

        except Exception as e:
            print(f"Exception occurred {e}")
        finally:
            if local_path:
                os.remove(local_path)
            if local_audio_path:
                os.remove(local_audio_path)




