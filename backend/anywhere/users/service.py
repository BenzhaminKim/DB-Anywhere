import asyncio
import datetime
from typing import List, Optional, Union

from fastapi_mail import MessageSchema
from jose import jwt
from passlib.context import CryptContext

from runway.common.auth import (
    ALGORITHM,
    RESET_PASSWORD_TOKEN_EXPIRE_DURATION_IN_MINUTES,
    SECRET_KEY,
    TOKEN_EXPIRE_DURATION_IN_DAYS,
    UserToken,
    decode_token_as_dict,
    validate_user_status,
)
from runway.common.logger import module_logger
from runway.common.mailer import RunwayMail
from runway.common.response_fail import (
    AuthenticationError,
    DuplicatedError,
    ForbiddenError,
    NotFoundError,
)
from runway.users.model import User
from runway.users.repository import UserDB, UserDBAsync
from runway.users.schemas.enums import SortOrderType, UserStatus
from runway.users.schemas.schema import (
    PasswordChangeIn,
    PasswordChangeOut,
    PasswordFindIn,
    PasswordResetIn,
    TokenValidateIn,
    TokenValidateOut,
    UserCreateIn,
    UserCreateInAdmin,
    UserData,
    UserDataDetailed,
    UserLoginIn,
    UserLoginOut,
    UserSearchIn,
    UserSearchOut,
)
from runway.users.templates.mail_contents import (
    add_to_project_content,
    delete_to_project_content,
    find_password_content,
    reset_password_content,
    signup_approved_content,
    signup_requested_content,
)

logger = module_logger(f"[User]{__name__}")


class UserService:
    """UserService"""

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def __init__(self) -> None:
        self._user_db = UserDB()
        self._user_db_async = UserDBAsync()
        self._mailer = RunwayMail()

    def create(
        self,
        user_create_in: Union[UserCreateIn, UserCreateInAdmin],
        created_by_admin: Optional[bool] = False,
    ) -> UserData:
        """
        user를 생성하기 위한 business 로직을 수행한다.
        해당 email로 이미 가입되어 있는 사용자가 있는지 검증한 뒤,
        주어진 비밀번호를 암호화하여 db에 저장한다.

        Parameters
        ----------
        user_create_in : UserCreateIn
        created_by_admin : bool, optional

        Returns
        -------
        UserOut

        Raises
        ------
        BadRequest
            해당 email로 이미 가입된 이력이 있으면 발생한다.
        """

        self._validate_unique_user(user_create_in.email)

        user_create_in.password = self._hash_password(user_create_in.password)

        user = User(
            **user_create_in.dict(),
            full_name=f"{user_create_in.first_name} {user_create_in.last_name}",
        )

        if created_by_admin:
            user.status = UserStatus.active
            user = self._user_db.add(user)
            self.schedule_to_send_signup_approved_mail(user=user)
        else:
            user.status = UserStatus.pending
            user = self._user_db.add(user)
            self.schedule_to_send_signup_requested_mail(user=user)

        return UserData.from_orm(user=user)

    def _validate_unique_user(self, email: str) -> None:
        """
        Verify passed email and
        raise exception if email is not found
        """
        user_exists = self._user_db.exists_by_email(email)

        if user_exists:
            raise DuplicatedError.DUPLICATED_EMAIL

    async def get(self, id: int) -> UserDataDetailed:
        """User의 정보를 가져옵니다."""

        user_detailed = await self._user_db_async.get_with_project_roles_by_user_id(
            user_id=id,
        )

        if user_detailed is None:
            raise NotFoundError.USER_NOT_FOUND

        return UserDataDetailed.from_orm(user=user_detailed)

    async def get_all(
        self,
        query_params=UserSearchIn,
    ) -> UserSearchOut:
        """It gets all users."""
        users, count = self._user_db.get_all_by_status(
            page=query_params.page,
            page_size=query_params.page_size,
            user_statuses=[UserStatus.active],
            search_column=query_params.search_column,
            search_keyword=query_params.search_keyword,
            order_by=query_params.sort_column,
            asc=(query_params.sort_order == SortOrderType.asc),
        )

        return UserSearchOut(
            page=query_params.page,
            page_size=query_params.page_size,
            total_item=count,
            users=users,
        )

    def login(self, user_login_in: UserLoginIn) -> UserLoginOut:
        """
        Verify passed email, password and
        generate access token if these are valid

        Returns:
            str: generated token
        """
        user = self._user_db.get(user_login_in.email)
        if not user:
            raise NotFoundError.USER_NOT_FOUND

        is_valid_user = self._verify_password(user_login_in.password, user.password)
        if not is_valid_user:
            raise AuthenticationError.INVALID_USERNAME_OR_PASSWORD

        validate_user_status(user.status)

        token = self._encode_token(user.id)
        return UserLoginOut(user_id=user.id, token=token)

    async def change_password(
        self,
        id: int,
        change_password_in: PasswordChangeIn,
    ) -> PasswordChangeOut:
        """
        Change the password of a user

        Parameters
        ----------
        user_id : int
        new_password : str
        """
        user = self._user_db.get_by_id(id)
        if not user:
            raise NotFoundError.USER_NOT_FOUND

        if not self._confirm_password(
            change_password_in.new_password,
            change_password_in.confirm_password,
        ):
            raise AuthenticationError.PASSWORD_MISMATCH

        hashed_password = self._hash_password(change_password_in.confirm_password)
        user = await self._user_db_async.update(
            user_id=user.id,
            password=hashed_password,
            is_new_password_required=False,
        )

        return PasswordChangeOut(first_name=user.first_name, last_name=user.last_name)

    async def validate_token(self, validate_token: TokenValidateIn) -> TokenValidateOut:
        """
        Verify if a token is valid or not

        Returns:
            bool: true/false
        """
        try:
            decoded_token = decode_token_as_dict(validate_token.token)
            if not decoded_token:
                raise AuthenticationError.INVALID_TOKEN

            user = await self._user_db_async.get(decoded_token["user_id"])
            if not user:
                raise AuthenticationError.USER_NOT_EXIST

            return TokenValidateOut(
                user_id=user.id,
                expires=decoded_token["expires"],
                workspace_role=user.workspace_role,
                status=user.status,
            )
        except Exception as e:
            logger.exception(e)
            raise AuthenticationError.INVALID_TOKEN from e

    async def find_password(self, find_password_in: PasswordFindIn) -> None:
        """
        비밀번호 초기화 요청을 기록합니다.
        """
        # step 1) email 로 user_id 를 확인한다. (존새성 확인 & token 생성용)
        user = await self._user_db_async.get_by_email(find_password_in.email)
        if not user:
            raise NotFoundError.USER_NOT_FOUND

        # step 2) user_id 와 expire_date 를 담아서 token 을 password_reset_token 을 생성한다.
        reset_token = self._encode_password_reset_token(user.id)

        # step 3) DB 에서 password_reset_token 필드를 update 한다.
        updated_user = await self._user_db_async.update(
            user_id=user.id,
            password_reset_token=reset_token,
        )

        self.schedule_to_send_find_password_mail(user=updated_user)

        return None

    async def reset_password(
        self,
        password_reset_token: str,
        reset_password_in: PasswordResetIn,
    ) -> None:
        """
        비밀번호 초기화를 진행해도 되는지 검증한 뒤, 유저가 요청한 새로운 비밀번호로 변경합니다.
        또한 비밀번호 초기화가 정상적으로 진행되었다는 메시지를 이메일로 보내기 위한 컨텐츠를 생성합니다.
        """
        # step 1) password_reset_token 가 유효한지 확인한다.
        # (DB 에서 user_id, email 을 확인한다.)
        user = await self._user_db_async.get_by_password_reset_token(
            password_reset_token,
        )
        if not user:
            # forgot-password 를 통해 reset 요청받지 않은 user 이므로
            # reset password 를 진행하지 못하도록 막는다.
            raise ForbiddenError.NOT_ALLOWED_TO_RESET_PASSWORD

        # validate token expiration with utc timezone
        current_time = datetime.datetime.utcnow()
        token_time = datetime.datetime.fromisoformat(
            decode_token_as_dict(password_reset_token).get("expires"),
        )
        if token_time < current_time:
            raise AuthenticationError.EXPIRED_TOKEN

        # validate new password is different from old password
        if self._verify_password(reset_password_in.new_password, user.password):
            raise ForbiddenError.NOT_ALLOWED_TO_RESET_PASSWORD_SAME_AS_OLD_PASSWORD

        # step 2) new password_reset_token 을 refresh 한다.
        # 잘못된 비밀번호 요청일 경우를 위해, reset token 을 재발급한다.
        reset_token = self._encode_password_reset_token(user.id)

        # step 3) new password 를 hash 한 이후 db 에 update 한다. (password 변경, password_reset_token refresh)
        updated_user = await self._user_db_async.update(
            user_id=user.id,
            password=self._hash_password(reset_password_in.new_password),
            password_reset_token=reset_token,
        )

        self.schedule_to_send_reset_password_mail(user=updated_user)

        return None

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
            days=TOKEN_EXPIRE_DURATION_IN_DAYS,
        )
        payload = cls._make_payload(user_id, str(date_time))
        encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return encoded_jwt

    @classmethod
    def _encode_password_reset_token(
        cls,
        user_id: int,
    ) -> str:
        """
        유저의 정보를 담고 있는 data 를 받아서 reset password token 을 반환한다.
        """
        date_time = datetime.datetime.utcnow() + datetime.timedelta(
            minutes=RESET_PASSWORD_TOKEN_EXPIRE_DURATION_IN_MINUTES,
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

    def schedule_to_send_signup_requested_mail(
        self,
        user: UserData,
    ) -> None:
        """
        User 정보를 받아, 회원가입이 요청되었다는 이메일 발송 task 를 스케줄링한다.
        """
        html = signup_requested_content()
        msg = MessageSchema(
            subject="Sign Up request completed",
            recipients=[user.email],
            html=html,
        )
        asyncio.create_task(self._mailer.send_message(msg))

    def schedule_to_send_signup_approved_mail(
        self,
        user: UserData,
    ) -> None:
        """
        User 정보를 받아, 회원가입이 승인되었다는 이메일 발송 task 를 스케줄링한다.
        """
        html = signup_approved_content()
        msg = MessageSchema(
            subject="Sign Up request confirmed",
            recipients=[user.email],
            html=html,
        )
        asyncio.create_task(self._mailer.send_message(msg))

    def schedule_to_send_find_password_mail(self, user: User) -> None:
        """
        User 정보를 받아, 비밀번호 초기화를 진행할 수 있는 이메일 발송 스키마를 반환합니다.
        """
        html = find_password_content(reset_token=user.password_reset_token)
        msg = MessageSchema(
            subject="Reset your password",
            recipients=[user.email],
            html=html,
        )
        asyncio.create_task(self._mailer.send_message(msg))

    def schedule_to_send_reset_password_mail(self, user: User) -> None:
        """
        User 정보를 받아, 비밀번호 초기화가 완료되었다는 이메일 발송 스키마를 반환합니다.
        """

        # step 3) email 용 message(html)을 만들어서 반환한다.
        html = reset_password_content()
        msg = MessageSchema(
            subject="Your password was reset",
            recipients=[user.email],
            html=html,
        )
        asyncio.create_task(self._mailer.send_message(msg))

    def schedule_to_send_add_to_project(
        self,
        user_emails: List[str],
        project_name: str,
    ) -> None:
        """
        user emails, project name 정보를 받아, 프로젝트에 추가되었다는 이메일 발송 task 를 스케줄링한다.
        """
        html = add_to_project_content(project_name=project_name)
        msg = MessageSchema(
            subject="You`ve been added to the project as a member",
            recipients=user_emails,
            html=html,
        )
        asyncio.create_task(self._mailer.send_message(msg))

    def schedule_to_send_delete_to_project(
        self,
        user_email: str,
        project_name: str,
    ) -> None:
        """
        user email, project name 정보를 받아, 프로젝트에서 삭제되었다는 이메일 발송 task 를 스케줄링한다.
        """
        html = delete_to_project_content(project_name=project_name)
        msg = MessageSchema(
            subject="You`ve been removed from the project member",
            recipients=[user_email],
            html=html,
        )
        asyncio.create_task(self._mailer.send_message(msg))
