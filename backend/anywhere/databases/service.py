import asyncio
import datetime
from typing import List, Optional, Union
from fastapi import HTTPException

from anywhere.databases.repositories.db import DatabaseDB
from anywhere.databases.schemas.schema import DatabaseCreateIn
from anywhere.databases.model import Database
from anywhere.databases.schemas.schema import (
    DatabaseGetAllBase,
    DatabaseUpdateOut,
    DatabaseCapacityGetOut,
)
from anywhere.databases.repositories.k8s.database_kubernetes import DatabaseK8S
from anywhere.common.config import settings
from logging import getLogger

logger = getLogger(__name__)


class DatabaseService:
    """DatabaseService"""

    def __init__(self) -> None:
        self._database_db = DatabaseDB()

    def create(
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
        current_total_capacity = self._database_db.get_total_capacity_by_user_id(
            user_id=user_id
        )

        if (
            current_total_capacity + database_create_in.db_capacity
            > settings.DB_TOTAL_CAPACITY
        ):
            raise HTTPException(
                status_code=400,
                detail=f"You are not allowed to create total capacity more than {settings.DB_TOTAL_CAPACITY}GB",
            )

        logger.info("user_id: %s, database_create_in: %s", user_id, database_create_in)
        database = Database(
            user_id=user_id,
            name=database_create_in.name,
            type=database_create_in.type,
            db_name=database_create_in.db_name,
            db_user=database_create_in.db_user,
            db_password=database_create_in.db_password,
            db_capacity=database_create_in.db_capacity,
            db_host=settings.SERVER_ADDRESS,
        )

        database = self._database_db.add(database)

        database_k8s = DatabaseK8S(database=database)
        database_k8s.create_database_k8s()

        return database

    def get(self, user_id: str, database_id: str) -> Database:

        database = self._database_db.get(
            user_id=user_id,
            database_id=database_id,
        )

        if not database:
            raise HTTPException(status_code=404, detail="Database is not found")
        self._update_status(database)
        return database

    def get_current_capacity(self, user_id: str) -> DatabaseCapacityGetOut:

        current_total_capacity = self._database_db.get_total_capacity_by_user_id(
            user_id=user_id
        )
        return DatabaseCapacityGetOut(
            current_database_capacity=current_total_capacity,
            maximum_database_capacity=settings.DB_TOTAL_CAPACITY,
        )

    def get_all(self, user_id: str) -> List[DatabaseGetAllBase]:

        databases = self._database_db.get_all_by_user_id(
            user_id=user_id,
        )

        return databases

    def _update_status(self, database: Database) -> None:

        database_k8s = DatabaseK8S(database=database)
        database_status = database_k8s.get_database_deployment_status()
        database_port = database_k8s.get_database_deployment_port()
        self._database_db.update(
            database_id=database.id,
            status=database_status,
            db_port=database_port,
            db_host=settings.SERVER_ADDRESS,
        )

    def delete(self, user_id: str, database_id: str) -> str:

        database = self._database_db.get(
            user_id=user_id,
            database_id=database_id,
        )

        if not database:
            raise HTTPException(status_code=404, detail="Database is not found")

        if str(database.user_id) != user_id:
            raise HTTPException(
                status_code=400, detail="Not allowed to delete the database."
            )

        self._database_db.delete(database_id=database_id)

        database_k8s = DatabaseK8S(database=database)
        database_k8s.delete_database_k8s()

        return database_id

    def update(
        self,
        user_id: str,
        database_id: str,
        database_update_in: DatabaseUpdateOut,
    ) -> Database:
        database = self._database_db.get(user_id=user_id, database_id=database_id)

        if not database:
            raise HTTPException(status_code=404, detail="Database is not found")

        if str(database.user_id) != user_id:
            raise HTTPException(
                status_code=400, detail="Not allowed to delete the database."
            )

        self._database_db.update(
            database_id=database_id,
            name=database_update_in.name,
        )

        updated_database = self._database_db.get(
            user_id=user_id, database_id=database_id
        )
        return updated_database
