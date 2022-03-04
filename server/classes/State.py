from enum import Enum

class State(Enum):
    CREATED = 1
    SIGNED = 2
    IN_PROGRESS = 3
    COMPLETED = 4