from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Boolean, Column, DateTime, Integer, String

from anywhere.common.base_sql_model import Base


class User(Base):
    """
    Define sqlalchemy model for users Table.
    """

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False) 
    validated = Column(Boolean, default=False, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
