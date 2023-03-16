from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Response

from anywhere.users.schemas.schema import (
    UserLoginIn,
    UserLoginOut,
    UserRegisterIn,
    UserRegisterOut,
)
from anywhere.users.services.user_service import UserService
from anywhere.users.services.auth_service import jwtBearer, UserToken
from anywhere.users.schemas.schema import UserGetOut, RefreshTokenOut
from anywhere.users.const import REFRESH_TOKEN_KEY, TOKEN_TYPE
from logging import config, getLogger
from anywhere.common._logging import logging_dependency

logger = getLogger(__name__)

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(logging_dependency)],
)


@router.post("/register", response_model=UserRegisterOut)
async def create_user(
    user_register_in: UserRegisterIn,
    user_service: UserService = Depends(),
) -> UserRegisterOut:
    """
    Create a new user.
    """
    user = await user_service.create(user_register_in=user_register_in)

    return UserRegisterOut.from_orm(user)


@router.get("/refresh", response_model=RefreshTokenOut)
async def refresh(
    user_token: UserToken = Depends(jwtBearer.validate_refresh_token_request),
    user_service: UserService = Depends(),
):
    access_token = user_service.create_access_token(user_token.user_id)
    return RefreshTokenOut(token=access_token)


@router.post("/login", response_model=UserLoginOut)
async def login(
    user_login_in: UserLoginIn,
    response: Response,
    user_service: UserService = Depends(),
) -> UserLoginOut:
    """
    Login a user.
    """
    access_token, refresh_token = await user_service.login(user_login_in=user_login_in)

    response.set_cookie(
        key=REFRESH_TOKEN_KEY,
        value=f"{TOKEN_TYPE} {refresh_token}",
        httponly=True,
        samesite="none",
    )
    return UserLoginOut(token=access_token)


@router.post(
    "/logout",
)
async def logout(
    response: Response,
) -> None:
    """
    Logout a user.
    """

    response.delete_cookie(key=REFRESH_TOKEN_KEY)
    return None


@router.get("/profile", response_model=UserGetOut)
async def get_user(
    user_token: UserToken = Depends(jwtBearer),
    user_service: UserService = Depends(),
) -> UserGetOut:
    """
    Logout a user.
    """
    user = await user_service.get(id=user_token.user_id)
    return UserGetOut.from_orm(user)
