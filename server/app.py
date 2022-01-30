from flask import Flask, request
from flask_cors import CORS
from classes.Contract import Contract
from classes.State import State
import uuid
import boto3
from enum import Enum

dynamodb = boto3.resource('dynamodb')

app = Flask(__name__)
CORS(app)

BASE_ROUTE = "/api/contracts"
table = dynamodb.Table("contracts")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route(BASE_ROUTE + "/retrieve/<contract_id>", methods=["GET"])
def retrieve_active_contracts(contract_id):
    try:
        response = table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key('id').eq(contract_id)
        )
        return response
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
        # for dev purposes, can delete this line
        print(contract.get_id()) 
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
        UpdateExpression="set contract_state=:contract_state",
        ExpressionAttributeValues={
            ':contract_state' : str(State.COMPLETED)    
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
        response = table.update_item(Key={
            'id': str(contract_id)
        },
        UpdateExpression="set contract_state=:s",
        ExpressionAttributeValues={
            ':s' : str(State.IN_REVIEW)        
            },
            ReturnValues="UPDATED_NEW"
        )
        return response
    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/fund/<client_id>/<contract_id>",  methods=["GET", "PUT"])
def fund_contract(client_id, contract_id):
    try:
        response = table.update_item(Key={
            'id': str(contract_id)
        },
        UpdateExpression="set contract_state=:s, client_id=:cid",
        ExpressionAttributeValues={
            ':s' : str(State.IN_PROGRESS),
            ':cid': str(client_id)       
            },
            ReturnValues="UPDATED_NEW"
        )
        return response
    except Exception as e:
        print(e)
        return "Error"
