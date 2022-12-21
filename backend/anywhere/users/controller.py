from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from backend.anywhere.users.schemas.schema import UserLoginIn, UserLoginOut, UserRegisterIn, UserRegisterOut

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/register", response_model=UserRegisterOut)
async def create_user(
    user_register_in: UserRegisterIn,
    # user_service: UserService = Depends(),
) -> UserRegisterOut:
    """
    Create a new user.
    """

    return UserRegisterOut()

@router.post("/login", response_model=UserLoginOut)
async def login(
    user_login_in: UserLoginIn,
) -> UserLoginOut:
    """
    Login a user.
    """
   
    return UserLoginOut()

@router.post("/logout",)
async def logout(
) -> None:
    """
    Logout a user.
    """
   
    return None