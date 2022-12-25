from contextlib import AbstractAsyncContextManager, AbstractContextManager
from typing import Any, Callable, List, Optional, Tuple, Union

from sqlalchemy import and_, asc, delete, desc, or_, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.sql.selectable import Select

from anywhere.common.base_sql_model import DatabaseConnection
from anywhere.databases.model import Database


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

    async def add(self, database: Database) -> Database:
        """
        create a database
        """
        with self.session_factory() as session:
            session.add(database)
            session.commit()
            session.refresh(database)

        return database

    async def get(self, user_id: str, database_id: Database) -> Database:
        """
        get a database
        """
        with self.session_factory() as session:
            stmt = select(Database).where(
                Database.id == database_id,
                Database.user_id == user_id,
            )

            result = session.execute(stmt)

        return result.scalars().one_or_none()

    async def get_all_by_user_id(self, user_id: str) -> List[Database]:
        """
        get all databases for a user
        """
        with self.session_factory() as session:
            stmt = select(Database).where(
                Database.user_id == user_id,
            )

            result = session.execute(stmt)

        return result.scalars().unique().all()

    async def delete(self, database_id: str) -> None:
        """
        delete a database
        """

        with self.session_factory() as session:
            stmt = delete(Database).where(Database.id == database_id)
            session.execute(stmt)
            session.commit()
