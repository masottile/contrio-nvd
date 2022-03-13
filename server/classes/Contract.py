import uuid
from classes import State

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
                'state': self.state}

    def get_id(self):
        return self.id
    
    def get_state(self):
        return self.state
    
    def set_state(self, state):
        if isinstance(state, State):
            self.state = state

def create_contract(user_id, contract_json):
    return {'id' : str(uuid.uuid4()),
            'userid': str(user_id),
            'signed' : False,
            'contract' : contract_json,
            'state': State.CREATED}

def edit_contract(user_id, contract_id, contract_json):
    return {'id' : str(contract_id),
            'userid': str(user_id),
            'signed' : False,
            'contract' : contract_json,
            'state': State.CREATED}