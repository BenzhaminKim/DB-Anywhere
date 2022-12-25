from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from anywhere.databases.schemas.schema import DatabaseCreateIn
from anywhere.databases.service import DatabaseService
from anywhere.users.services.auth_service import jwtBearer, UserToken
from anywhere.databases.schemas.schema import DatabaseCreateOut
from anywhere.databases.schemas.schema import DatabaseGetDetailOut
from anywhere.databases.schemas.schema import DatabaseGetAllOut
from anywhere.databases.schemas.schema import DatabaseDeleteOut

router = APIRouter(
    prefix="/databases",
    tags=["databases"],
)


@router.post("/", response_model=DatabaseCreateOut)
async def create_database(
    database_create_in: DatabaseCreateIn,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseCreateOut:
    """
    Create new database.
    """
    database = await database_service.create(
        user_id=user_token.user_id,
        database_create_in=database_create_in,
    )

    return DatabaseCreateOut.from_orm(database)


@router.get("/{database_id}", response_model=DatabaseGetDetailOut)
async def get_database(
    database_id: str,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseGetDetailOut:
    """
    Get a database detail
    """

    database = await database_service.get(
        user_id=user_token.user_id,
        database_id=database_id,
    )

    return DatabaseGetDetailOut.from_orm(database)


@router.get("", response_model=DatabaseGetAllOut)
async def get_all_databases(
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseGetDetailOut:
    """
    Get all databases
    """

    databases = await database_service.get_all(
        user_id=user_token.user_id,
    )

    return DatabaseGetAllOut(databases=databases)


@router.delete("/{database_id}", response_model=DatabaseDeleteOut)
async def delete_database(
    database_id: str,
    user_token: UserToken = Depends(jwtBearer),
    database_service: DatabaseService = Depends(),
) -> DatabaseDeleteOut:
    """
    Delete a database
    """

    database_id = await database_service.delete(
        user_id=user_token.user_id,
        database_id=database_id,
    )

    return DatabaseDeleteOut(id=database_id)
