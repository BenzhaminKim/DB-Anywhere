import logging
import concurrent.futures

from event_listener.resources.deployment_event import DeploymentListener
from event_listener.resources.service_event import ServiceListener
from event_listener.settings import settings

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

if __name__ == "__main__":
    try:
        logger.info("start event listener")

        logger.info(
            f"{settings.POSTGRES_SERVER=} {settings.SQLALCHEMY_DATABASE_URI=}",
        )

        deployment_listener = DeploymentListener()
        service_listener = ServiceListener()

        with concurrent.futures.ThreadPoolExecutor() as executor:
            executor.submit(
                deployment_listener.watch,
                label_selector=f"database-uuid",
            )
            executor.submit(
                service_listener.watch,
                label_selector=f"database-uuid",
            )

    except Exception as e:
        logger.exception(e)
