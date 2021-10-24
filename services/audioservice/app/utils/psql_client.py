from app.imports.external import *
from config import config


def reconnect(f: Callable):
    def wrapper(client, *args, **kwargs):
        if not client.connected():
            client.connect()
        try:
            return f(client, *args, **kwargs)
        except psycopg2.Error as e:
            client.close()
            raise
    return wrapper


class PostgresClient:
    def __init__(self, ):
        self.config = config
        self.client = psycopg2.connect(
            dbname=config.PSQL_DB,
            user=config.PSQL_USERNAME,
            password=config.PSQL_PASSWORD,
            host=config.PSQL_HOST,
            connect_timeout=3,
        )

    def connected(self) -> bool:
        return self.client and self.client.closed == 0

    def close(self):
        if self.connected():
            try:
                self.client.close()
            except Exception as e:
                print('Exception occured while closing connection {}'.format(e))
                pass
        self.client = None

    def connect(self):
        self.close()
        self.client = psycopg2.connect(
            dbname=self.config.PSQL_DB,
            user=self.config.PSQL_USERNAME,
            password=self.config.PSQL_PASSWORD,
            host=self.config.PSQL_HOST
        )

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(1))
    @reconnect
    def create_conference_recognition(self, conference_id, audio_url):
        try:
            cur = self.client.cursor()

            req = 'INSERT INTO "{}" ("audio_url", "filename", "status", "conference_id") VALUES (\'{}\', \'{}\', \'{}\', \'{}\')'.format(
                "conference_recognitions",
                audio_url,
                audio_url.split('/')[-1],
                "in_progress",
                conference_id,
            )
            cur.execute(req)
            self.client.commit()
            cur.close()
        except Exception as e:
            print(f"Exception occurred {e}")
