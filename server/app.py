from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from classes.Contract import Contract
from classes.State import State
import boto3

dynamodb = boto3.resource('dynamodb')

app = Flask(__name__)
CORS(app)

BASE_ROUTE = "/api/contracts"
table = dynamodb.Table("test_contracts")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route(BASE_ROUTE + "/retrieve/<user_id>", methods=["GET"])
def retrieve_active_contracts(user_id):
    try:
        db_response = table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key('userid').eq(user_id)
        )
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            response_data = db_response['Items']
            http_response = make_response(jsonify({'items': response_data}), 200)
        else:
            http_response = make_response(jsonify({}), db_response['ResponseMetadata']['HTTPStatusCode'])

        print(http_response)
        return http_response

    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/create", methods=["POST"])
def create_contract():
    if request.is_json:
        print(request.json)
    try:
        contract = Contract(request.json)

        # DB response is a dict object and we can create our api response based on it
        db_response = table.put_item(Item=contract.get_json())
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(contract.get_json()), 200)
        else:
            http_response = make_response(jsonify({}), db_response['ResponseMetadata']['HTTPStatusCode'])

        # # for dev purposes, can delete this line
        # response = make_response(db_response)
        print(contract.get_id()) 
        return http_response
    except Exception as e:
        print(e)
        return "Error"
        # here we should actually return an appropriate status code

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
