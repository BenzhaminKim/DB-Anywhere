import asyncio
import datetime
from typing import List, Optional, Union
from fastapi import HTTPException

from jose import jwt
from passlib.context import CryptContext
from anywhere.users.model import User
from anywhere.users.schemas.schema import UserRegisterIn
from anywhere.users.repository import UserDB
from anywhere.users.schemas.schema import UserLoginIn, UserLoginOut
from anywhere.users.services.auth_service import ALGORITHM, SECRET_KEY, UserToken


class UserService:
    """UserService"""

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def __init__(self) -> None:
        self._user_db = UserDB()

    async def create(
        self,
        user_register_in: UserRegisterIn,
    ) -> User:
        """
        Create a user

        Parameters
        ----------
        user_register_in : UserRegisterIn

        Returns
        -------
        UserRegisterOut

        Raises
        ------
        """

        await self._validate_unique_user(user_register_in.email)

        hash_password = self._hash_password(user_register_in.password)

        user = User(
            name=user_register_in.name,
            email=user_register_in.email,
            password=hash_password,
        )

        user = await self._user_db.add(user)

        return user

    async def _validate_unique_user(self, email: str) -> None:
        """
        Verify passed email and
        raise exception if email is not found
        """
        user_exists = await self._user_db.exists_by_email(email)

        if user_exists:
            raise HTTPException(status_code=404, detail="Item not found")

    async def login(self, user_login_in: UserLoginIn) -> UserLoginOut:
        """
        Verify passed email, password and
        generate access token if these are valid

        Returns:
            str: generated token
        """
        user = await self._user_db.get_by_email(user_login_in.email)
        if not user:
            raise HTTPException(status_code=404, detail="Email is not found")

        is_valid_user = self._verify_password(user_login_in.password, user.password)
        if not is_valid_user:
            raise HTTPException(status_code=400, detail="INVALID_USERNAME_OR_PASSWORD")

        token = self._encode_token(user.id)
        return UserLoginOut(user_id=user.id, token=token)

    async def get(self, id: int) -> User:
        """User의 정보를 가져옵니다."""

        user = await self._user_db.get(id=id)

        if user is None:
            raise HTTPException(status_code=404, detail="USER_NOT_FOUND")

        return user

    @staticmethod
    def _confirm_password(new_password: str, confirm_password: str) -> bool:
        """
        Validate if confirm password is validate
        """
        return new_password == confirm_password

    @classmethod
    def _hash_password(cls, password: str) -> str:
        """
        user create 할 때, 필요하다. (db 에 hashed 값을 저장하기 위함)
        """
        return cls.pwd_context.hash(password)

    @classmethod
    def _verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        """verify secret against an existing hash.

        사용자가 전달한 plain_password의 hash 결과가 hashed_password와 일치하는지
        확인하는 함수

        Parameters
        ----------
        plain_password : str
        hashed_password : str

        Returns
        -------
        bool
            return hash(plain_password) == hashed_password
        """
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def _encode_token(
        cls,
        user_id: int,
    ) -> str:
        """
        유저의 정보를 담고 있는 data 를 받아서 access token 을 반환한다.
        """
        date_time = datetime.datetime.utcnow() + datetime.timedelta(
            days=1,
        )
        payload = cls._make_payload(user_id, str(date_time))
        encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return encoded_jwt

    @classmethod
    def _make_payload(
        cls,
        user_id: int,
        date_time: str,
    ) -> dict:
        """
        유저의 정보를 담아 jwt token 의 payload를 생성합니다.
        """
        user_token = UserToken(
            user_id=user_id,
            expires=date_time,
        )
        return user_token.dict()
