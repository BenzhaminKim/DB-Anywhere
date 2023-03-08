import os
import sys
import types
from logging import config, getLogger
from pathlib import Path
from fastapi import FastAPI
from anywhere.common.config import settings
from anywhere.users.controller import router as users_router
from anywhere.databases.controller import router as databases_router
from anywhere.common.base_sql_model import DatabaseConnection
from fastapi.middleware.cors import CORSMiddleware
import logging
import sys

main_path = Path(os.path.abspath(__file__))
os.chdir(main_path.parent)
print(main_path.parent)
log_file_path = main_path.parent / "logging.conf"
config.fileConfig(log_file_path, disable_existing_loggers=False)

logger = getLogger(__name__)

logger.debug("start")


db = DatabaseConnection()
try:
    db.create_database()
except Exception as e:  # pylint: disable=broad-except
    logger.exception("db.create_database failed", exc_info=e)
    sys.exit(1)


app = FastAPI(title="DB-Anywhere", openapi_url=f"{settings.API_V1_STR}/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix=settings.API_V1_STR)
app.include_router(databases_router, prefix=settings.API_V1_STR)
