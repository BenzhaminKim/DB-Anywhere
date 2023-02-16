from anywhere.common._enum import auto, StrEnum


class DatabaseStatus(StrEnum):
    """
    DatabaseStatus
    """

    processing = auto()
    ready = auto()


class DatabaseType(StrEnum):
    """
    DatabaseType
    """

    postgres = auto()
    mysql = auto()
    mongodb = auto()
