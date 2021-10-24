import logging

from app.db.init_db import init_db
from app.db import base, session

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    db = session.SessionLocal()
    result = db.execute("SELECT 1")
    logger.info(result)
    init_db(db)


def main() -> None:
    logger.info("Creating initial data")
    init()
    logger.info("Initial data created")


if __name__ == "__main__":
    main()