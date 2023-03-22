import abc
import logging
from kubernetes import config
from event_listener.resources.db_client import DatabaseClient

logger = logging.getLogger(__name__)


class EventListener(metaclass=abc.ABCMeta):
    def __init__(self):
        config.load_config()
        self.db_client = DatabaseClient()

    @abc.abstractmethod
    def watch(self, label_selector: str):
        pass
    