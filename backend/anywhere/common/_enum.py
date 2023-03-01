from enum import Enum, auto

auto = auto


class StrEnum(str, Enum):
    """
    Mixin class for using auto()
    """

    @staticmethod
    def _generate_next_value_(name, start, count, last_values):
        _ = start, count, last_values

        return name

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    @classmethod
    def has_value(cls, value: str) -> bool:
        return value in cls._value2member_map_  # pylint: disable=maybe-no-member
