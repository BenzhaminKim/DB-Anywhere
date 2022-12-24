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
from anywhere.users.schemas.schema import UserGetOut

router = APIRouter(
    prefix="/users",
    tags=["users"],
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


@router.post("/login", response_model=UserLoginOut)
async def login(
    user_login_in: UserLoginIn,
    response: Response,
    user_service: UserService = Depends(),
) -> UserLoginOut:
    """
    Login a user.
    """

    login_out = await user_service.login(user_login_in=user_login_in)

    response.set_cookie(
        key="Authorization",
        value=f"Bearer {login_out.token}",
        httponly=True,
    )
    return login_out


@router.post(
    "/logout",
)
async def logout(
    user_token: UserToken = Depends(jwtBearer),
) -> None:
    """
    Logout a user.
    """

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
