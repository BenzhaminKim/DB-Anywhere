from contextlib import (
    AbstractContextManager,
    contextmanager,
)
from time import time
from typing import Callable
import logging

from sqlalchemy import create_engine, orm

from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from anywhere.common.config import settings


logger = logging.getLogger(__name__)

Base = declarative_base()


class DatabaseConnection:
    """Database"""

    def __init__(self, db_url: str = str(settings.SQLALCHEMY_DATABASE_URI)) -> None:

        self._bind = create_engine(db_url)

        logger.info("db_url: %s", db_url)
        self._session_factory = orm.sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=self._bind,
            )

    def create_database(self) -> None:
        """
        create all tables
        """
        logger.info("crate database")
        Base.metadata.create_all(self._bind)

    @contextmanager
    def session(self) -> Callable[..., AbstractContextManager[Session]]:
        """
        create database session with contextmanager to do some CRUD things
        """
        session: Session = self._session_factory()

        yield session
