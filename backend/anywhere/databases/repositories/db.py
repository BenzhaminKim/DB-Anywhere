from contextlib import AbstractAsyncContextManager, AbstractContextManager
from typing import Any, Callable, List, Optional, Tuple, Union

from sqlalchemy import and_, asc, delete, desc, or_, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.sql.selectable import Select
import logging
from anywhere.common.base_sql_model import DatabaseConnection
from anywhere.databases.model import Database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DatabaseDB:
    """
    DatabaseDB
    """

    def __init__(
        self,
        session_factory: Callable[
            ...,
            AbstractContextManager[Session],
        ] = DatabaseConnection().session,  # pylint: disable=unsubscriptable-object
    ) -> None:
        self.session_factory = session_factory

    def add(self, database: Database) -> Database:
        """
        create a database
        """
        with self.session_factory() as session:
            session.add(database)
            session.commit()
            session.refresh(database)

        return database

    def get(self, user_id: str, database_id: Database) -> Database:
        """
        get a database
        """
        with self.session_factory() as session:
            stmt = select(Database).where(
                and_(
                    Database.id == database_id,
                    Database.user_id == user_id,
                )
            )

            result = session.execute(stmt)

        return result.scalars().one_or_none()

    def get_all_by_user_id(self, user_id: str) -> List[Database]:
        """
        get all databases for a user
        """
        with self.session_factory() as session:
            stmt = (
                select(Database)
                .where(
                    Database.user_id == user_id,
                )
                .order_by(Database.created_at.desc())
            )

            result = session.execute(stmt)

        return result.scalars().unique().all()

    def delete(self, database_id: str) -> None:
        """
        delete a database
        """

        with self.session_factory() as session:
            stmt = delete(Database).where(Database.id == database_id)
            session.execute(stmt)
            session.commit()

    def update(
        self,
        database_id: int,
        **kwargs,
    ) -> None:
        """update project form db."""

        with self.session_factory() as session:
            stmt = update(Database).where(Database.id == database_id).values(**kwargs)

            session.execute(stmt)
