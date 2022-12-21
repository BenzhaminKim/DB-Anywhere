from enum import Enum,auto

class DatabaseStatus(Enum):
    """
    DatabaseStatus
    """

    processing = auto()
    ready = auto()