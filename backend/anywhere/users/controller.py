from typing import Any

from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/",)
def create_user(
) -> Any:
    """
    Create new user.
    """
   
    return 