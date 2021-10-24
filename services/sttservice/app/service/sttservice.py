from app.imports.external import *
from app.utils.psql_client import PostgresClient
from app.utils.sftp_client import SftpClient
from config import config


class SpeechToTextClient:
    def __init__(self):
        SetLogLevel(0)
        model_path = config.MODEL_PATH
        self.rate = int(config.SAMPLE_RATE)

        if not os.path.exists(model_path):
            print("Error in model path. Such directory does not exist!")
            exit(1)
        self.model = Model(model_path)

        self.sftp_client = SftpClient()

    def get_filename(self, path):
        return path.split('/')[-1]

    def get_conference_id(self, path):
        return self.get_filename(path).split('_')[0]

    def recognize(self, remote_file_path):
        try:
            print(f"Processing {remote_file_path}")
            recognition_result = []

            conference_id = self.get_conference_id(remote_file_path)
            local_file_path = os.path.join(
                self.sftp_client.download_path,
                self.get_filename(remote_file_path))

            self.sftp_client.download_file_local(local_file_path, remote_file_path)

            stt_recognizer = KaldiRecognizer(self.model, self.rate)
            wf = wave.open(local_file_path, "rb")

            while True:
                data = wf.readframes(int(config.READ_FRAMES))
                if len(data) == 0:
                    break
                if stt_recognizer.AcceptWaveform(data):
                    recognition_chunk = json.loads(stt_recognizer.Result())
                    if 'result' in recognition_chunk.keys():
                        recognition_result.append(recognition_chunk['result'])
                else:
                    recognition_chunk = json.loads(stt_recognizer.PartialResult())
                    if 'result' in recognition_chunk.keys():
                        recognition_result.append(recognition_chunk['result'])

            for phrase in recognition_result:
                for word in phrase:
                    word['word'] = word['word'].replace("'", ' ')

            recognition_result = self.process_sttresult(recognition_result)
            recognition_text = " ".join([x["Word"] for x in recognition_result])

            print(f"Recognition text is {recognition_text}")

            psql_client = PostgresClient()
            psql_client.update_conference_recognition(
                filename=self.get_filename(remote_file_path),
                recognition=json.dumps(
                    recognition_result, ensure_ascii=False
                ),
            )
        except Exception as e:
            print(f"Exception occured {e}")
        finally:
            if os.path.exists(local_file_path):
                os.remove(local_file_path)

    def process_sttresult(self, stt_result):
        result = []
        for phrase in stt_result:
            for word in phrase:
                word_format = {'Word': word['word'], 'Time': word['start'], 'Duration': word['end'] - word['start']}
                result.append(word_format)
        return result

