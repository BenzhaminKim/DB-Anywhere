import asyncio
import datetime
from typing import List, Optional, Union
from fastapi import HTTPException

from anywhere.databases.repository import DatabaseDB
from anywhere.databases.schemas.schema import DatabaseCreateIn
from anywhere.databases.model import Database
from anywhere.databases.schemas.schema import DatabaseGetAllBase


class DatabaseService:
    """DatabaseService"""

    def __init__(self) -> None:
        self._database_db = DatabaseDB()

    async def create(
        self,
        user_id: str,
        database_create_in: DatabaseCreateIn,
    ) -> Database:
        """
        Create a user

        Parameters
        ----------
        database_create_in : DatabaseCreateIn

        Returns
        -------
        Database

        Raises
        ------
        """

        database = Database(
            user_id=user_id,
            name=database_create_in.name,
            type=database_create_in.type,
            db_name=database_create_in.db_name,
            db_user=database_create_in.db_user,
            db_password=database_create_in.db_password,
            db_capacity=database_create_in.db_capacity,
        )

        database = await self._database_db.add(database)

        return database

    async def get(self, user_id: str, database_id: str) -> Database:

        database = await self._database_db.get(
            user_id=user_id,
            database_id=database_id,
        )

        if not database:
            raise HTTPException(status_code=404, detail="Database is not found")

        return database

    async def get_all(self, user_id: str) -> List[DatabaseGetAllBase]:

        databases = await self._database_db.get_all_by_user_id(
            user_id=user_id,
        )

        return databases

    async def delete(self, user_id: str, database_id: str) -> str:

        database = await self._database_db.get(
            user_id=user_id,
            database_id=database_id,
        )

        if not database:
            raise HTTPException(status_code=404, detail="Database is not found")

        if str(database.user_id) != user_id:
            raise HTTPException(
                status_code=400, detail="Not allowed to delete the database."
            )

        await self._database_db.delete(database_id=database_id)

        return database_id
