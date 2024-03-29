from __future__ import annotations

from datetime import datetime
from typing import List, Optional, Union

from fastapi import Query
from pydantic import BaseModel, EmailStr, Field, root_validator, validator

from anywhere.databases.model import Database
from anywhere.databases.schemas.enum import DatabaseType


class BaseModelORMTrue(BaseModel):
    """Pydantic BaseModel with orm_mode=True"""

    class Config:
        """Pydantic BaseModel Config"""

        orm_mode = True


class DatabaseCreateIn(BaseModelORMTrue):
    """Database Create Input DTO"""

    name: str
    type: DatabaseType
    db_name: str
    db_user: str
    db_password: str
    db_capacity: int = Query(default=50, gt=1, lt=50)


class DatabaseCreateOut(BaseModelORMTrue):
    """Database Create Output DTO"""

    id: str
    name: str
    type: str
    db_name: str
    db_user: str
    db_capacity: int
    status: str
    created_at: datetime

    @classmethod
    def from_orm(cls, database: Database) -> DatabaseCreateOut:
        """
        Convert Database ORM to DatabaseCreateOut

        Parameters
        ----------
        database : Database
            Database ORM object

        Returns
        -------
        DatabaseCreateOut
        """
        database.id = str(database.id)
        return super().from_orm(database)


class DatabaseGetDetailOut(BaseModelORMTrue):
    """DatabaseGetOut"""

    id: str
    name: str
    type: DatabaseType
    db_name: str
    db_user: str
    db_password: str
    db_capacity: int
    db_port: Optional[int]  # TODO: 생성 후 만들어야함
    db_host: Optional[str]  # TODO: 생성 후 만들어야함
    status: str
    created_at: datetime

    @classmethod
    def from_orm(cls, database: Database) -> DatabaseCreateOut:
        """
        Convert Database ORM to DatabaseCreateOut

        Parameters
        ----------
        database : Database
            Database ORM object

        Returns
        -------
        DatabaseCreateOut
        """
        database.id = str(database.id)
        return super().from_orm(database)


class DatabaseGetAllBase(DatabaseGetDetailOut):
    """DatabaseGetAllBase"""

    ...


class DatabaseGetAllOut(BaseModelORMTrue):
    """DatabaseGetAllOut"""

    databases: List[DatabaseGetAllBase]


class DatabaseDeleteOut(BaseModelORMTrue):
    id: str

    @classmethod
    def from_orm(cls, database: Database) -> DatabaseDeleteOut:
        """
        Convert Database ORM to DatabaseDeleteOut

        Parameters
        ----------
        database : Database
            Database ORM object

        Returns
        -------
        DatabaseDeleteOut
        """
        database.id = str(database.id)
        return super().from_orm(database)


class DatabaseUpdateIn(BaseModelORMTrue):
    name: str


class DatabaseUpdateOut(DatabaseCreateOut):
    ...


class DatabaseCapacityGetOut(BaseModelORMTrue):
    current_capacity: int
    maximum_capacity: int
    unit: str = "MB"
