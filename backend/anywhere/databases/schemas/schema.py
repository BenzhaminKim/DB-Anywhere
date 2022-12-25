from __future__ import annotations

from datetime import datetime
from typing import List, Optional, Union

from fastapi import Query
from pydantic import BaseModel, EmailStr, Field, root_validator, validator

from anywhere.databases.model import Database


class BaseModelORMTrue(BaseModel):
    """Pydantic BaseModel with orm_mode=True"""

    class Config:
        """Pydantic BaseModel Config"""

        orm_mode = True


class DatabaseCreateIn(BaseModelORMTrue):
    """Database Create Input DTO"""

    name: str
    type: str
    db_name: str
    db_user: str
    db_password: str
    db_capacity: int  # TODO: 특정 타입으로만 capacity 할 수 있도록 변경.


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
    type: str
    db_name: str
    db_user: str
    db_password: str
    db_capacity: int
    db_port: Optional[int]  # TODO: 생성 후 만들어야함
    db_address: Optional[str]  # TODO: 생성 후 만들어야함
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


class DatabaseGetAllBase(DatabaseCreateOut):
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
