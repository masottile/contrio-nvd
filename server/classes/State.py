from enum import Enum

class State(Enum):
    CREATED = 1
    FUNDED = 2
    IN_PROGRESS = 3
    IN_REVIEW = 4
    COMPLETED = 5
    ARCHIVED = 6
