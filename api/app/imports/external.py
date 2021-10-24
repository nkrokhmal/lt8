from datetime import datetime, timedelta
from typing import Union, Any, Optional, Generator, TypeVar, Type, List, Generic, Dict
from pydantic import *
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, Depends, HTTPException, Request, status, Body, UploadFile, File
from fastapi.responses import FileResponse, ORJSONResponse, StreamingResponse, PlainTextResponse
from fastapi.security import OAuth2PasswordRequestForm
from loguru import logger
import pika
import threading
import json
import os