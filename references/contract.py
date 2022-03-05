import enum

# define constants
class state(enum.Enum):
    # project proposed and contract created
    initiated = 0
    # contracted accepted and signed by both parties
    accepted = 1
    # deliverable completed, in review
    completed = 2

    # project complete: work and payment have been delivered
    closed = 3

class contract:
    def __init__(self, metadata):
        # could change metadata to kwargs instead

        self._state = state.initiated
        self._client = metadata["client_id"]
        self._freelancer = metadata["freelancer_id"]
        self._payment_amount = metadata["payment"]
        self._signatures = {"client": False, "freelancer": False}
        self._deliverable = None

    def get_state(self):
        return self._state

    def sign(self, user_id):
        if user_id == self._client:
            self._signatures["client"] = True
        
        elif user_id == self._freelancer:
            self._signatures["freelancer"] = True

        if self._signatures["client"] and self._signatures["freelancer"]:
            self._state = state.accepted

    def upload_deliverable(self, user_id, text):
        if user_id == self._freelancer and self._state == state.accepted:
            self._deliverable = text
            self._state = state.completed

    def accept_deliverable(self, user_id):
        if user_id == self._client and self._state == state.completed:
            self._state = state.closed
            return self._deliverable


if __name__ == "__main__":
    example = {"client_id" : 0,
               "freelancer_id" : 1,
               "payment" : 10}
    
    # create contract
    ex_contract = contract(example)

    # client sign
    ex_contract.sign(example["client_id"])
    assert ex_contract.get_state() != state.accepted

    # freelancer sign
    ex_contract.sign(example["freelancer_id"])
    assert ex_contract.get_state() == state.accepted

    # freelancer finishes
    ex_contract.upload_deliverable(example["freelancer_id"], "this is the deliverable")
    assert ex_contract.get_state() == state.completed

    # client accepts project
    ex_contract.accept_deliverable(example["client_id"])
    assert ex_contract.get_state() == state.closed




