import logging
from kubernetes import watch, client
from event_listener.resources.listener import EventListener
from event_listener.resources.schema import DatabaseDeployment, DatabaseStatus
from event_listener.settings import settings

logger = logging.getLogger(__name__)


class DeploymentListener(EventListener):
    def __init__(self):
        super().__init__()

        self.apps_v1 = client.AppsV1Api()

    def watch(self, label_selector: str):
        logger.info(
            "Start to watch deployments resources label_selector: %s",
            label_selector,
        )
        w = watch.Watch()
        for event in w.stream(
            func=self.apps_v1.list_namespaced_deployment,
            namespace=settings.NAMESPACE,
            label_selector=label_selector,
        ):
            # print("events", event)
            logger.info(
                "Event: %s %s %s %s"
                % (
                    event["type"],
                    event["object"].kind,
                    event["object"].metadata.name,
                    event["object"].metadata.labels["database-uuid"],
                ),
            )

            database_deployment = DatabaseDeployment(
                type=event["type"],
                deployment_name=event["object"].metadata.name,
                database_uuid=event["object"].metadata.labels["database-uuid"],
                status=DatabaseStatus.get_database_deployment_status(event["object"]),
            )

            logger.info(database_deployment)
            if event["type"] != 'DELETED':
                self.update(database_deployment=database_deployment)

    def update(self, database_deployment: DatabaseDeployment):

        stmt = (f"UPDATE databases SET status='{database_deployment.status}' "
                f"WHERE id='{database_deployment.database_uuid}'")
        logger.info(stmt)
        try:
            self.db_client.update(stmt)
        except Exception as e:
            logger.exception(e)
