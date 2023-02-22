from kubernetes import client, config, watch
from kubernetes.client.models import V1Deployment
import logging
from string import Template
import yaml
from pathlib import Path
from anywhere.common.kubernetes_client import KubernetesClient
from anywhere.databases.model import Database
from anywhere.common.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


TEMPLATES_DIR = Path(__file__).parent / "templates"


class DatabaseK8SDeployment(KubernetesClient):
    def __init__(self, database: Database):
        self.database = database
        self.yaml = self._load_yaml()
        super().__init__()

    def _load_yaml(self):
        TEMPLATE_PATH = TEMPLATES_DIR / "deployment.yaml"

        with open(TEMPLATE_PATH) as f:
            template = Template(f.read())

        yaml_str = template.substitute(
            DATABASE_NAME=self.database.name_for_k8s,
            DATABASE_UUID=str(self.database.id),
            SIGNATURE=settings.SIGNATURE,
            NAMESPACE=settings.NAMESPACE,
            DB_USER=self.database.db_user,
            DB_PASSWORD=self.database.db_password,
            DB_NAME=self.database.db_name,
        )

        yaml_dict = yaml.safe_load(yaml_str)
        return yaml_dict

    def create(self):
        body = self.yaml
        result = self.v1_apps.create_namespaced_deployment(
            namespace=settings.NAMESPACE,
            body=body,
        )
        return result

    def get(self) -> V1Deployment:
        result = self.v1_apps.read_namespaced_deployment(
            name=self.database.name_for_k8s,
            namespace=settings.NAMESPACE,
        )

        return result
