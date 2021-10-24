import psycopg2
from tenacity import retry, wait_exponential, stop_after_attempt, wait_fixed
from typing import Callable
import pika
import threading
import json
import pysftp
from io import BytesIO
import subprocess
import os
from vosk import Model, KaldiRecognizer, SetLogLevel
import wave
from datetime import datetime
