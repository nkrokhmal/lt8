from app.utils.psql_client import PostgresClient
from app.imports.external import *
from config import config


class StatusScheduler:
    def __init__(self, interval=10):
        self.interval = interval
        self.psql_client = PostgresClient()

    def parse_conference_recognition(self, conference_recognitions):
        print(f"Total length of recognitions is {len(conference_recognitions)}, finished f{len([x for x in conference_recognitions if x[3].lower() == 'finished'])}")
        if (len(conference_recognitions) == 0) or \
                (len(conference_recognitions) != len([x for x in conference_recognitions if x[3].lower() == "finished"])):
            return 'in_progress', ''
        else:
            cur_duration = 0
            full_text = ''
            result = []

            conference_recognitions = sorted(conference_recognitions, key=lambda x: int(x[1].split('_')[-1].split('.')[0]))

            for conference_recognition in conference_recognitions:
                recognition = json.loads(conference_recognition[4])
                for r in recognition:
                    r['Time'] += cur_duration

                result += recognition
                full_text += " ".join([x["Word"] for x in recognition]) + " "
                cur_duration += int(config.CHUNK_DURATION)

            print(full_text)
            return 'finished', json.dumps(result, ensure_ascii=False)

    def job(self):
        conferences = self.psql_client.conferences_in_progress()

        for conference in conferences:
            print(f'Processing {conference[0]}')
            conference_recognition = self.psql_client.conference_recognition(conference[0])
            new_status, stt_result = self.parse_conference_recognition(conference_recognition)

            if new_status == 'finished':
                self.psql_client.update_conference_status(
                    conference_id=conference[0],
                    stt_result=stt_result,
                    status=new_status,
                )

    def start_scheduling(self):
        schedule.every(self.interval).seconds.do(self.job)
        while True:
            schedule.run_pending()

