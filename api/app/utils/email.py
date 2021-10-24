from app.imports.external import *
from app.core.config import settings
import emails
from emails.template import JinjaTemplate
import logging
import os
from jose import jwt


def send_email(
        email_to: str,
        subject_template: str = "",
        html_template: str = "",
        environment: Dict[str, Any] = {}
) -> None:
    assert settings.EMAILS_ENABLED, "no email settings"
    message = emails.Message(
        subject=JinjaTemplate(subject_template),
        html=JinjaTemplate(html_template),
        mail_from=(settings.MAIL_FROM_NAME, settings.MAIL_FROM),
    )
    smtp_options = {
        "host": settings.MAIL_SERVER,
        "port": settings.MAIL_PORT,
        "tls": True,
        "user": settings.MAIL_USERNAME,
        "password": settings.MAIL_PASSWORD,
    }
    response = message.send(to=email_to, render=environment, smtp=smtp_options)
    logging.info(f"Message result {response}")


def send_test_email(email_to: str, token: str) -> None:
    project_name = "Test"
    subject = "Test email"

    with open(os.path.join("app", "email-templates", "test_email.html")) as f:
        template_str = f.read()

    send_email(
        email_to=email_to,
        subject_template=subject,
        html_template=template_str,
        environment={
            "project_name": project_name,
            "email": email_to,
            "confirmation_token": token,
        },
    )


def send_new_account_email(email_to: str, token: str) -> None:
    project_name = "Hobber"
    subject = "New account"

    with open(os.path.join("app", "email-templates", "new_account.html")) as f:
        template_str = f.read()

    send_email(
        email_to=email_to,
        subject_template=subject,
        html_template=template_str,
        environment={
            "project_name": project_name,
            "email": email_to,
            "confirmation_token": token,
        },
    )


def send_reset_password_email(email_to: str, email: str, token: str) -> None:
    project_name = "Hobber"
    subject = "Password recovery"

    with open(os.path.join("app", "email-templates", "reset_password.html")) as f:
        template_str = f.read()

    server_host = settings.SETTINGS_HOST
    link = f"{server_host}/reset-password?token={token}"
    send_email(
        email_to=email_to,
        subject_template=subject,
        html_template=template_str,
        environment={
            "project_name": project_name,
            "email": email,
            "link": link,
        },
    )


def generate_password_reset_token(email: str) -> str:
    delta = timedelta(hours=settings.MAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.utcnow()
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email}, settings.SECRET_KEY, algorithm="HS256",
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> Optional[str]:
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decoded_token["sub"]
    except jwt.JWTError:
        return None
