from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.SQLALCHAMY_DATABASE_URL,
    pool_pre_ping=True,
    pool_size=20,
    max_overflow=0,
    pool_recycle=3600,
    connect_args={
        'connect_timeout': 5,
        "keepalives": 1,
        "keepalives_idle": 30,
        "keepalives_interval": 5,
        "keepalives_count": 5,
    },

)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)