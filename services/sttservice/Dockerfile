FROM python:3.7

WORKDIR /app

RUN wget https://alphacephei.com/kaldi/models/vosk-model-ru-0.10.zip \
    && unzip vosk-model-ru-0.10.zip \
    && mv vosk-model-ru-0.10 model \
    && rm vosk-model-ru-0.10.zip

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/
EXPOSE 55557

ENTRYPOINT ["python", "-u", "main.py"]