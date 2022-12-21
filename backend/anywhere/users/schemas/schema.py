
from __future__ import annotations

from datetime import datetime
from typing import List, Optional, Union

from fastapi import Query
from pydantic import BaseModel, EmailStr, Field, root_validator, validator


class BaseModelORMTrue(BaseModel):
    """Pydantic BaseModel with orm_mode=True"""

    class Config:
        """Pydantic BaseModel Config"""

        orm_mode = True


class UserRegisterIn(BaseModelORMTrue):
    """User Register Input DTO"""
    name: str
    email: EmailStr
    password: str # TODO: validate password format

class UserRegisterOut(BaseModelORMTrue):
    """User Register Output DTO"""
    name: str
    email: EmailStr
    
class UserLoginIn(BaseModelORMTrue):
    """User Login Input DTO"""
    email: EmailStr
    password: str

class UserLoginOut(BaseModelORMTrue):
    """User Login Output DTO"""
    token: str
