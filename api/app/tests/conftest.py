from fastapi.testclient import TestClient
import pytest

from main import app

from app.imports.external import *
from app.db.session import SessionLocal
from app.core.config import settings
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import get_user_token_headers


@pytest.fixture(scope="session")
def db() -> Generator:
    yield SessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as client:
        yield client


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient) -> Dict[str, str]:
    return get_user_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )