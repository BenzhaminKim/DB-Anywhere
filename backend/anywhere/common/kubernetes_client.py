from kubernetes import client, config
from kubernetes.config import ConfigException
import logging
from anywhere.common.singleton import singleton


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class KubernetesClient:
    def __init__(self) -> None:
        try:
            config.load_config()
        except ConfigException:
            logger.exception("Cluster config is not found.")

        self.api_client = client.ApiClient()
        self.v1_core = client.CoreV1Api()
        self.v1_rbac = client.RbacAuthorizationV1Api()
        self.v1_batch = client.BatchV1Api()
        self.custom_api = client.CustomObjectsApi()
        self.storage_api = client.StorageV1Api()
        self.pod_status = client.V1PodStatus()
        self.v1_apps = client.AppsV1Api()
