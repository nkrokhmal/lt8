FROM python:3.7

WORKDIR /app

RUN apt-get update && apt-get install ffmpeg -y

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/
EXPOSE 55555

ENTRYPOINT ["python", "-u", "main.py"]