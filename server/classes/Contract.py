import uuid
from classes.State import State

class Contract:
    def __init__(self, contract_json):
        self.id = uuid.uuid4()
        self.client_id = contract_json['c_name']
        self.freelancer_id = contract_json['f_name']
        self.contract_val = contract_json['pay_amount']
        self.state = State.CREATED

    def get_json(self):
        return {'id' : str(self.id),
                'client_id': str(self.client_id),
                'freelancer_id': str(self.freelancer_id),
                'contract_val': str(self.contract_val),
                'contract_state': str(self.state)}

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