from kubernetes import client, config, watch
from kubernetes.client.models import V1Deployment
import logging
import asyncio
from anywhere.common.kubernetes_client import KubernetesClient

from anywhere.databases.repositories.k8s._deployment import DatabaseK8SDeployment
from anywhere.databases.repositories.k8s._service import DatabaseK8SService
from anywhere.databases.repositories.k8s._pvc import DatabaseK8SPVC
from anywhere.databases.model import Database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DatabaseK8S:
    def __init__(self, database: Database):
        self.database = database
        self._pvc = DatabaseK8SPVC(database=self.database)
        self._service = DatabaseK8SService(database=self.database)
        self._deployment = DatabaseK8SDeployment(database=self.database)

    def create_database_k8s(self) -> None:
        try:
            self._deployment.create()
            self._pvc.create()
            self._service.create()
        except Exception as e:
            logger.exception(e)
            # TODO: exception raise
