from __future__ import annotations

from enum import Enum, auto
from pydantic import BaseModel
from typing import Optional
from kubernetes.client import V1Deployment

class StrEnum(str, Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class BaseModelORMTrue(BaseModel):
    """Pydantic BaseModel with orm_mode=True"""

    class Config:
        """Pydantic BaseModel Config"""

        orm_mode = True


class DatabaseStatus(StrEnum):
    """
    DatabaseStatus
    """

    processing = auto()
    ready = auto()
    error = auto()

    @classmethod
    def get_database_deployment_status(cls, deployment: V1Deployment) -> DatabaseStatus:
        if deployment is None:
            return DatabaseStatus.error

        if deployment.status.ready_replicas and deployment.status.ready_replicas == 1:
            return DatabaseStatus.ready

        return DatabaseStatus.processing


class DatabaseDeployment(BaseModelORMTrue):
    """DTO for the pod message."""

    type: str
    deployment_name: str
    database_uuid: str
    status: DatabaseStatus



class DatabaseService(BaseModelORMTrue):

    type: str
    deployment_name: str
    database_uuid: str
    node_port: Optional[int]
