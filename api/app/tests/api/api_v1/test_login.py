from app.imports.external import *
from fastapi.testclient import TestClient
from app.core.config import settings


def test_get_access_token(client: TestClient) -> None:
    login_data = {
        'username': settings.ADMIN_EMAIL,
        'password': settings.ADMIN_PASSWORD,
    }
    r = client.post('/login/access_token', data=login_data)
    tokens = r.json()
    assert r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]
