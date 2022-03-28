from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from classes import Contract
from classes import State
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
    ''' Get all contracts associated with a given user id
    '''
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
        return make_response("Encountered Error", 500)

@app.route(BASE_ROUTE + "/create/<user_id>", methods=["POST"])
def create_contract(user_id):
    ''' given a json representation of a contract, create a new contract and add it to our database
    '''
    if request.is_json:
        print(request.json)
    try:
        # contract = Contract(user_id, request.json)
        contract = Contract.create_contract(user_id, request.json)

        # DB response is a dict object and we can create our api response based on it
        db_response = table.put_item(Item=contract)
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(contract), 200)
        else:
            http_response = make_response(jsonify({}), db_response['ResponseMetadata']['HTTPStatusCode'])

        return http_response
    except Exception as e:
        print(e)
        return make_response("Encountered Error", 500)

@app.route(BASE_ROUTE + "/edit/<user_id>/<contract_id>", methods=["PUT"])
def edit_contract(user_id, contract_id):
    ''' given a user_id and contract_id and a json contract representation,
        edit this DB contract to reflect the new json representation
        BUT only edit if the contract has not yet been signed
    '''
    # print(request)
    if request.is_json:
        print(request.json)
    try:
        check_response = table.get_item(
            Key={'userid': str(user_id), 'id': str(contract_id)}
        )
        # print(check_response)
        signed = check_response['Item']['signed']

        if signed:
            return make_response("Could not edit signed contract", 405)
        
        else:
            # DB response is a dict object and we can create our api response based on it
            db_response = table.update_item(
                Key={'userid': str(user_id), 'id': str(contract_id)},
                UpdateExpression="set contract=:contract",
                ExpressionAttributeValues={
                    ':contract' : request.json   
                    },
                    ReturnValues="UPDATED_NEW"
            )
            if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
                http_response = make_response(jsonify(request.json), 200)
            else:
                http_response = make_response(jsonify({}), db_response['ResponseMetadata']['HTTPStatusCode'])

            return http_response
    except Exception as e:
        print(e)
        return make_response("Encountered Error", 500)

@app.route(BASE_ROUTE + "/delete/<user_id>/<contract_id>", methods=["DELETE"])
def delete_contract(user_id, contract_id):
    ''' given a user_id and contract_id, delete this contract from the database
    '''
    try:
        db_response = table.delete_item(
            Key={'userid': str(user_id), 'id': str(contract_id)}
        )

        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response("Contract Deleted", 200)
        else:
            http_response = make_response("Database Error Encountered", db_response['ResponseMetadata']['HTTPStatusCode'])

        return http_response
    except Exception as e:
        print(e)
        return make_response("Encountered Error", 500)

@app.route(BASE_ROUTE + "/sign/<user_id>/<contract_id>", methods=["PUT"])
def sign_contract(user_id, contract_id):
    ''' "sign" the given contract. Contract will be signed by the user 
        and assumed signed by the second party for demo purposes
    '''
    try:
        # Find Contract using contract_id
        db_response = table.update_item(
            Key={'userid': str(user_id), 'id': str(contract_id)},
            UpdateExpression="set signed=:signed, contract_state=:contract_state",
            ExpressionAttributeValues={
                ':signed' : True,
                ':contract_state': State.FUNDED,
                },
                ReturnValues="UPDATED_NEW"
        )
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(db_response), 200)
        else:
            http_response = make_response("Database Error Encountered", db_response['ResponseMetadata']['HTTPStatusCode'])

        return http_response
    except Exception as e:
        print(e)
        return make_response("Encountered Error", 500)

@app.route(BASE_ROUTE + "/start/<user_id>/<contract_id>", methods=["PUT"])
def start_contract(user_id, contract_id):
    ''' "start" the given contract. Indicate that the freelancer has started work on the project
    '''
    try:
        # Find Contract using contract_id
        db_response = table.update_item(
            Key={'userid': str(user_id), 'id': str(contract_id)},
            UpdateExpression="set contract_state=:contract_state",
            ExpressionAttributeValues={
                ':contract_state': State.IN_PROGRESS,
                },
                ReturnValues="UPDATED_NEW"
        )
        print(db_response)
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(db_response), 200)
        else:
            http_response = make_response("Database Error Encountered", db_response['ResponseMetadata']['HTTPStatusCode'])

        return http_response
    except Exception as e:
        print(e)
        return make_response("Encountered Error", 500)

@app.route(BASE_ROUTE + "/submit/<freelancer_id>/<contract_id>", methods=["PUT"])
def submit_deliverable(freelancer_id, contract_id):
    """ Submit a deliverable to the the project for review by the client
    """
    try:
        db_response = table.update_item(
            Key={'userid': str(freelancer_id), 'id':str(contract_id)
        },
        UpdateExpression="set contract_state=:contract_state",
        ExpressionAttributeValues={
            ':contract_state' : State.IN_REVIEW        
            },
            ReturnValues="UPDATED_NEW"
        )
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(db_response), 200)
        return http_response;
    except Exception as e:
        print(e)
        return "Error"

@app.route(BASE_ROUTE + "/approve/<freelancer_id>/<contract_id>", methods=["PUT"])
def approve_deliverable(freelancer_id, contract_id):
    """ Have the client approve the deliverable and indicate the project is complete
    """
    try:
        db_response = table.update_item(
            Key={'userid': str(freelancer_id), 'id':str(contract_id)
        },
        UpdateExpression="set contract_state=:contract_state",
        ExpressionAttributeValues={
            ':contract_state' : State.COMPLETED        
            },
            ReturnValues="UPDATED_NEW"
        )
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(db_response), 200)
        return http_response;
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

@app.route(BASE_ROUTE + "/demo_reset/<user_id>/<contract_id>", methods=["PUT"])
def demo_reset(user_id, contract_id):
    ''' RESET the Contract to be unsigned and in state CREATED
        This is for demo purposes only and will make showing the demo multiple time easier
    '''
    try:
        # Find Contract using contract_id
        db_response = table.update_item(
            Key={'userid': str(user_id), 'id': str(contract_id)},
            UpdateExpression="set signed=:signed, contract_state=:contract_state",
            ExpressionAttributeValues={
                ':signed' : False,
                ':contract_state': State.CREATED,
                },
                ReturnValues="UPDATED_NEW"
        )
        print(db_response)
        if db_response['ResponseMetadata']['HTTPStatusCode'] == 200:
            http_response = make_response(jsonify(db_response), 200)
        else:
            http_response = make_response("Database Error Encountered", db_response['ResponseMetadata']['HTTPStatusCode'])

        return http_response
    except Exception as e:
        print(e)
        return make_response("Encountered Error", 500)
