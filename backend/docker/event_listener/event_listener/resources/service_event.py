import logging
from kubernetes import watch, client
from event_listener.resources.listener import EventListener
from event_listener.resources.schema import DatabaseService
from event_listener.settings import settings

logger = logging.getLogger(__name__)


class ServiceListener(EventListener):
    def __init__(self):
        super().__init__()

        self.core_v1 = client.CoreV1Api()

    def watch(self, label_selector: str):
        logger.info(
            "Start to watch services resources label_selector: %s",
            label_selector,
        )
        w = watch.Watch()
        for event in w.stream(
            func=self.core_v1.list_namespaced_service,
            namespace=settings.NAMESPACE,
            label_selector=label_selector,
        ):
            logger.info(
                "Event: %s %s %s %s"
                % (
                    event["type"],
                    event["object"].kind,
                    event["object"].metadata.name,
                    event["object"].metadata.labels["database-uuid"],
                ),
            )
            database_service = DatabaseService(
                type=event["type"],
                deployment_name=event["object"].metadata.name,
                database_uuid=event["object"].metadata.labels["database-uuid"],
                node_port=event["object"].spec.ports[0].node_port,
            )

            logger.info(database_service)

            if event["type"] != 'DELETED':
                self.update(database_service=database_service)

    
    def update(self, database_service: DatabaseService):
        stmt = (f"UPDATE databases SET db_port='{database_service.node_port}' "
                f"WHERE id='{database_service.database_uuid}'")

        self.db_client.update(stmt)
        logger.info(stmt)
