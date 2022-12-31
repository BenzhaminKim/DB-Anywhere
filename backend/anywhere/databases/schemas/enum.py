from enum import Enum, auto


class DatabaseStatus(Enum):
    """
    DatabaseStatus
    """

    processing = "processing"
    ready = "ready"


class DatabaseType(Enum):
    """
    DatabaseType
    """

    postgres = "postgres"
    mysql = "mysql"
    mongodb = "mongodb"
