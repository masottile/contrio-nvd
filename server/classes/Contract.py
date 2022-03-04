import uuid
from classes.State import State

class Contract:
    def __init__(self, contract_json):
        self.id = uuid.uuid4()
        self.userid = contract_json['userid']
        self.contract = contract_json['contract']
        self.state = State.CREATED

    def get_json(self):
        return {'id' : str(self.id),
                'userid': str(self.userid),
                'contract' : self.contract,
                'state': str(self.state)}

    def get_id(self):
        return self.id
    
    def get_state(self):
        return self.state
    
    def set_state(self, state):
        if isinstance(state, State):
            self.state = state