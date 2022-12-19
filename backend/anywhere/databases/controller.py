from typing import Any

from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix="/databases",
    tags=["databases"],
)

@router.post("/",)
def create_database(
) -> Any:
    """
    Create new database.
    """
   
    return 