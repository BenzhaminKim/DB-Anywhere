from datetime import datetime
from typing import Final

from fastapi import Request, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.security.utils import get_authorization_scheme_param
from jose import jwt
from pydantic import BaseModel
from fastapi import HTTPException
from anywhere.users.repository import UserDB
from anywhere.common.config import settings

# to get a string like this run:
# openssl rand -hex 32
# secret key 는 서버만 알고 있는 값이다.
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
TOKEN_EXPIRE_DURATION_IN_DAYS = 1
RESET_PASSWORD_TOKEN_EXPIRE_DURATION_IN_MINUTES = 60

security = HTTPBearer()


class UserToken(BaseModel):
    """UserToken"""

    user_id: int
    expires: str


def decode_token(auth: HTTPAuthorizationCredentials = Security(security)) -> UserToken:
    """Header에서 Authorization Bearer를 체크하여 유효한지 확인합니다."""
    decoded_token = decode_token_as_dict(auth.credentials)
    return UserToken.parse_obj(decoded_token)


def decode_token_as_dict(token: str) -> UserToken:
    """JWT Token을 decode 합니다."""
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return decoded_token
    except jwt.ExpiredSignatureError as e:
        raise HTTPException(status_code=400, detail="EXPIRED_TOKEN")
    except (jwt.JWTClaimsError, jwt.JWTError, jwt.JWSError) as e:
        raise HTTPException(status_code=400, detail="INVALID_TOKEN")


class JwtBearer(HTTPBearer):
    """
    It checks Authorization Bearer if token is valid from Header or Cookie
    """

    def __init__(self, auto_error: bool = True):
        super(__class__, self).__init__(auto_error=auto_error)
        self._user_db = UserDB()

    async def __call__(self, request: Request):
        return await self._validate_token_request(request=request)

    async def _validate_token_request(self, request: Request) -> UserToken:
        header_authorization: str = request.headers.get("Authorization")
        cookie_authorization: str = request.cookies.get("Authorization")
        header_scheme, header_param = get_authorization_scheme_param(
            header_authorization,
        )
        cookie_scheme, cookie_param = get_authorization_scheme_param(
            cookie_authorization,
        )
        scheme = header_scheme or cookie_scheme

        if scheme.lower() != "bearer":
            raise HTTPException(status_code=400, detail="INVALID_AUTHENTICATION")
        if not header_param and not cookie_param:
            raise HTTPException(status_code=400, detail="INVALID_AUTHENTICATION")

        token = header_param or cookie_param

        decoded_token = decode_token_as_dict(token)

        # validate user if exists
        user = await self._user_db.get(id=decoded_token["user_id"])
        if not user:
            raise HTTPException(status_code=404, detail="USER_NOT_EXIST")

        # validate token expiration
        current_time = datetime.utcnow()
        token_time = datetime.fromisoformat(decoded_token["expires"])

        if token_time < current_time:
            raise HTTPException(status_code=400, detail="EXPIRED_TOKEN")

        return UserToken(
            user_id=user.id,
            expires=decoded_token["expires"],
        )


jwtBearer = JwtBearer()
