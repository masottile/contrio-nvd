import uuid
from classes.State import State

class Contract:
    def __init__(self, fid, contract_val):
        self.id = uuid.uuid4()
        self.client_id = None
        self.freelancer_id = fid
        self.contract_val = contract_val
        self.state = State.CREATED

    def get_id(self):
        return self.id
    
    def get_freelancer_id(self):
        return self.freelancer_id
    
    def get_client_id(self):
        return self.client_id

    def set_client_id(self):
        return self.client_id    
    
    def get_contract_val(self):
        return self.contract_val

    def set_contract_val(self, value):
        self.contract_val = value
    
    def get_state(self):
        return self.state
    
    def set_state(self, state):
        if isinstance(state, State):
            self.state = state