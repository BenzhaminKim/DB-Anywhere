from fastapi import FastAPI
from anywhere.common.config import settings
from anywhere.users.controller import router as users_router
from anywhere.databases.controller import router as databases_router
from anywhere.common.base_sql_model import DatabaseConnection
from fastapi.middleware.cors import CORSMiddleware
import logging
import sys


logger = logging.getLogger(__name__)


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
