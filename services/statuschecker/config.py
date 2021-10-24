import os


class Config:
    PSQL_DB = os.environ.get("PSQL_DB")
    PSQL_USERNAME = os.environ.get("PSQL_USERNAME")
    PSQL_PASSWORD = os.environ.get("PSQL_PASSWORD")
    PSQL_HOST = os.environ.get("PSQL_HOST")

    CHUNK_DURATION = os.environ.get("CHUNK_DURATION") or 60 * 5


config = Config()