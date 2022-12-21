
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

