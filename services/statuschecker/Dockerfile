FROM python:3.7

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/
EXPOSE 55558

ENTRYPOINT ["python", "-u", "main.py"]