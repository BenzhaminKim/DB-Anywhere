from contextlib import AbstractAsyncContextManager, AbstractContextManager
from typing import Any, Callable, List, Optional, Tuple, Union

from sqlalchemy import and_, asc, delete, desc, or_, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.sql.selectable import Select

from anywhere.users.model import User
from backend.anywhere.common.base_sql_model import Database


class UserDB:
    """
    UserDB
    """

    def __init__(
        self,
        session_factory: Callable[
            ...,
            AbstractContextManager[Session],
        ] = Database().session,  # pylint: disable=unsubscriptable-object
    ) -> None:
        self.session_factory = session_factory

    async def add(self, user: User) -> User:
        """
        add a data snapshot
        """
        with self.session_factory() as session:
            session.add(user)
            session.commit()
            session.refresh(user)

        return user

    async def exists_by_email(self, email: str) -> bool:
        """
        check if the email exists
        """

        with self.session_factory() as session:
            stmt = select(User).where(User.email == email)

            result = session.execute(stmt)

        return bool(result.scalars().one_or_none())

    async def get(self, id: int) -> Optional[User]:
        """
        get a user by id
        """

        with self.session_factory() as session:
            stmt = select(User).where(User.id == id)

            result = session.execute(stmt)

        return result.scalars().one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        """
        get a user by email
        """

        with self.session_factory() as session:
            stmt = select(User).where(User.email == email)

            result = session.execute(stmt)

        return result.scalars().one_or_none()
