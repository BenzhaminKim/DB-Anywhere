from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from anywhere.common.base_sql_model import Base


class User(Base):
    """
    Define sqlalchemy model for users Table.
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False) 
    confirmed = Column(Boolean, default=False, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
