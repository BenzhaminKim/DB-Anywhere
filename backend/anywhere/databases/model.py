from datetime import datetime

from sqlalchemy import ForeignKey, Boolean, Column, DateTime, Integer, String

from anywhere.common.base_sql_model import Base
from anywhere.databases.schemas.enum import DatabaseStatus
from sqlalchemy.dialects.postgresql import UUID
import uuid

from sqlalchemy.orm import relationship


class Database(Base):
    """
    Define sqlalchemy model for databases Table.
    """

    __tablename__ = "databases"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    type = Column(String(255), nullable=False)
    status = Column(String(255), default="processing", nullable=False)
    db_name = Column(String(255), nullable=False)
    db_user = Column(String(255), nullable=False)
    db_password = Column(String(255), nullable=False)
    db_capacity = Column(Integer, nullable=False)
    db_host = Column(String(255))
    db_port = Column(Integer)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    user = relationship("User", backref="databases")

    @property
    def name_for_k8s(self) -> str:
        return f"{self.type}-{str(self.id)}"

    
