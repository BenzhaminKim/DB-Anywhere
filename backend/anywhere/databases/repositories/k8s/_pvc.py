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


class DatabaseK8SPVC(KubernetesClient):
    def __init__(self, database: Database):
        super().__init__()
        self.database = database
        self.yaml = self._load_yaml()

    def _load_yaml(self):
        TEMPLATE_PATH = TEMPLATES_DIR / "pvc.yaml"

        with open(TEMPLATE_PATH) as f:
            template = Template(f.read())

        yaml_str = template.substitute(
            DATABASE_NAME=self.database.name_for_k8s,
            DATABASE_UUID=str(self.database.id),
            VOLUME=self.database.db_capacity,
            SIGNATURE=settings.SIGNATURE,
            NAMESPACE=settings.NAMESPACE,
        )

        yaml_dict = yaml.safe_load(yaml_str)
        return yaml_dict

    def create(self):
        body = self.yaml
        thread = self.v1_core.create_namespaced_persistent_volume_claim(
            namespace=settings.NAMESPACE,
            body=body,
            async_req=True,
        )
        result = thread.get()
        return result
