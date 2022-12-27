from kubernetes import client, config, watch
from kubernetes.client.models import V1Deployment
import logging
import asyncio
from anywhere.common.kubernetes_client import KubernetesClient
from anywhere.databases.repositories.k8s._deployment import DatabaseDeployment
from anywhere.databases.repositories.k8s._service import DatabaseService
from anywhere.databases.repositories.k8s._pvc import DatabasePVC
from anywhere.databases.model import Database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DatabaseK8S(KubernetesClient):
    def __init__(self, database: Database):
        super().__init__()
        self.database = database
        self._deployment = DatabaseDeployment(database=self.database)
        self._service = DatabaseService(database=self.database)
        self._pvc = DatabasePVC(database=self.database)

    async def create_database_k8s(self, namespace):

        try:
            await asyncio.gather(
                self._deployment.create(namespace=namespace),
                # self._service.create(namespace=namespace),
                # self._pvc.create(namespace=namespace),
            )
        except Exception as e:
            logger.exception(e)
            # TODO: exception raise
        