from logging import getLogger
from typing import Any

from fastapi import APIRouter, Depends

from anywhere.databases.schemas.schema import DatabaseCreateIn
from anywhere.databases.service import DatabaseService
from anywhere.users.services.auth_service import jwtBearer, UserToken
from anywhere.databases.schemas.schema import (
    DatabaseCreateOut,
    DatabaseDeleteOut,
    DatabaseUpdateOut,
    DatabaseGetAllOut,
    DatabaseGetDetailOut,
    DatabaseUpdateIn,
    DatabaseCapacityGetOut,
)
from anywhere.common._logging import logging_dependency

logger = getLogger(__name__)

router = APIRouter(
    prefix="/databases",
    tags=["databases"],
    dependencies=[Depends(logging_dependency)],
)


@router.post("", response_model=DatabaseCreateOut)
def create_database(
    database_create_in: DatabaseCreateIn,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseCreateOut:
    """
    Create new database.
    """
    database = database_service.create(
        user_id=user_token.user_id,
        database_create_in=database_create_in,
    )

    return DatabaseCreateOut.from_orm(database)


@router.get("/{database_id}", response_model=DatabaseGetDetailOut)
def get_database(
    database_id: str,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseGetDetailOut:
    """
    Get a database detail
    """

    database = database_service.get(
        user_id=user_token.user_id,
        database_id=database_id,
    )

    return DatabaseGetDetailOut.from_orm(database)


@router.get("/capacity", response_model=DatabaseCapacityGetOut)
def get_current_capacity(
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseCapacityGetOut:
    """
    Get a database detail
    """

    database_capacity_get_out = database_service.get_current_capacity(
        user_id=user_token.user_id,
    )

    return database_capacity_get_out


@router.get("", response_model=DatabaseGetAllOut)
def get_all_databases(
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseGetDetailOut:
    """
    Get all databases
    """

    databases = database_service.get_all(
        user_id=user_token.user_id,
    )

    return DatabaseGetAllOut(databases=databases)


@router.delete("/{database_id}", response_model=DatabaseDeleteOut)
def delete_database(
    database_id: str,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseDeleteOut:
    """
    Delete a database
    """

    database_id = database_service.delete(
        user_id=user_token.user_id,
        database_id=database_id,
    )

    return DatabaseDeleteOut(id=database_id)


@router.patch("/{database_id}", response_model=DatabaseUpdateOut)
def update_database(
    database_id: str,
    database_update_in: DatabaseUpdateIn,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseUpdateOut:
    """
    Update a database
    """

    database = database_service.update(
        user_id=user_token.user_id,
        database_id=database_id,
        database_update_in=database_update_in,
    )

    return DatabaseUpdateOut.from_orm(database)
