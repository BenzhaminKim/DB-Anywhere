import logging
from string import Template
import yaml
from pathlib import Path
from anywhere.common.kubernetes_client import KubernetesClient
from kubernetes.client import ApiException
from anywhere.databases.model import Database
from anywhere.common.config import settings
from kubernetes.client.models import V1Service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


TEMPLATES_DIR = Path(__file__).parent / "templates"


class DatabaseK8SService(KubernetesClient):
    def __init__(self, database: Database):
        self.database = database
        self.yaml = self._load_yaml()
        super().__init__()

    def _load_yaml(self):
        TEMPLATE_PATH = TEMPLATES_DIR / "service.yaml"

        with open(TEMPLATE_PATH) as f:
            template = Template(f.read())

        yaml_str = template.substitute(
            DATABASE_NAME=self.database.name_for_k8s,
            DATABASE_UUID=str(self.database.id),
            SIGNATURE=settings.SIGNATURE,
            NAMESPACE=settings.NAMESPACE,
        )

        yaml_dict = yaml.safe_load(yaml_str)
        return yaml_dict

    def create(self) -> int:
        body = self.yaml
        result = self.v1_core.create_namespaced_service(
            namespace=settings.NAMESPACE,
            body=body,
        )

        return result.spec.ports[0].node_port

    def get(self) -> V1Service:
        try:
            result = self.v1_core.read_namespaced_service(
                namespace=settings.NAMESPACE,
                name=self.database.name_for_k8s,
            )

            return result
        except ApiException as e:
            return None

    def delete(self) -> None:
        try:
            self.v1_core.delete_namespaced_service(
                name=self.database.name_for_k8s,
                namespace=settings.NAMESPACE,
            )
        except ApiException as e:
            logger.exception(e)
            return None
