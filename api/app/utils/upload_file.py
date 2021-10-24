from pathlib import Path
import shutil
import os


def upload_file(file, suffix, filename=None):
    try:
        filename = file.filename if not filename else filename
        if not os.path.exists(os.path.join("data", suffix)):
            os.makedirs(os.path.join("data", suffix))
        file_path = os.path.join("data", suffix, filename)
        with Path(file_path).open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    finally:
        file.file.close()