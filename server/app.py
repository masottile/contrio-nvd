from flask import Flask, request
# from Contract import Contract
# from State import State
import uuid
import boto3
from enum import Enum

dynamodb = boto3.resource('dynamodb')

class State(Enum):
    CREATED = 1
    FUNDED = 2
    IN_PROGRESS = 3
    IN_REVIEW = 4
    COMPLETED = 5
    ARCHIVED = 6

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
        if isInstace(state, State):
            self.state = state

def update_contract_state(contract_id, state):
    try:
        # Find Contract using contract_id
        response = table.update_item(Key={
            'id': str(contract_id)
        },
        UpdateExpression="set contract_state=:s",
        ExpressionAttributeValues={
            ':s' : str(state)        
            },
            ReturnValues="UPDATED_NEW"
        )
        return response
    except Exception as e:
        raise e

app = Flask(__name__)

BASE_ROUTE = "/api/contracts"
table = dynamodb.Table("contracts")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route(BASE_ROUTE + "/retrieve/<freelancer_id>", methods=["GET"])
def retrieve_active_contracts(freelancer_id):
    try:
        return "<p>Hello, World!</p>"
    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/create/<freelancer_id>/<contract_val>", methods=["GET","POST"])
def create_contract(freelancer_id, contract_val):
    try:
        contract = Contract(freelancer_id, contract_val)
        response = table.put_item(Item={
            'id' : str(contract.get_id()),
            'client_id': str(contract.get_client_id()),
            'freelancer_id': str(contract.get_freelancer_id()),
            'contract_val': contract.get_contract_val(),
            'contract_state': str(contract.get_state())
        })
        return response
    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/approve/<client_id>/<contract_id>", methods=["GET","PUT"])
def approve_contract(client_id, contract_id):
    try:
        # Find Contract using contract_id
        response = table.update_item(Key={
            'id': str(contract_id)
        },
        UpdateExpression="set contract_state=:contract_state, client_id=:client_id",
        ExpressionAttributeValues={
            ':contract_state' : str(state)  ,
            ':client_id' : str(client_id)      
            },
            ReturnValues="UPDATED_NEW"
        )
        return response
    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/submit/<freelancer_id>/<contract_id>", methods=["GET", "PUT"])
def submit_deliverable(freelancer_id, contract_id):
    try:
        return update_contract_state(contract_id, State.IN_REVIEW)
    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/fund/<client_id>/<contract_id>",  methods=["GET", "PUT"])
def fund_contract(client_id, contract_id):
    try:
        return update_contract_state(contract_id, State.IN_PROGRESS)
    except Exception as e:
        print(e)
        return "Error"
