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
            host=config.PSQL_HOST
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
    def update_conference_recognition(self, filename, recognition):
        try:
            cur = self.client.cursor()
            req = 'UPDATE "{}" SET  "status" = \'{}\', "recognition" = \'{}\' WHERE "filename" = \'{}\''.format(
                'conference_recognitions',
                "finished",
                recognition,
                filename
            )
            cur.execute(req)
            self.client.commit()
            cur.close()
        except Exception as e:
            print(e)