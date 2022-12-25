from enum import Enum, auto


class DatabaseStatus(Enum):
    """
    DatabaseStatus
    """

    processing = "processing"
    ready = "ready"
