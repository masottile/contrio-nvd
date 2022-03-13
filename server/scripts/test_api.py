import requests
import json

user_id = '71f6270b-ddf1-4259-b648-68214e23d265'

get_response = requests.get('http://127.0.0.1:5000/api/contracts/retrieve/' + user_id)
print("GET")
print(get_response)
print(get_response.json())

contract = get_response.json()['items'][0]
contract_id = contract['id']
# contract_data = contract['contract']
# contract_data['client'] = 'Edit Client Name'
contract_data = {'title': 'Edit Title', 'client': 'Edit Client', 'freelancer': 'Edit Freelancer'}
headers = {"Content-Type": "application/json"}

edit_response = requests.put('http://127.0.0.1:5000/api/contracts/edit/' + user_id + '/' + contract_id, data=json.dumps(contract_data), headers=headers)
print("EDIT")
print(edit_response)
# print(edit_response.json())

get_response = requests.get('http://127.0.0.1:5000/api/contracts/retrieve/' + user_id)
print("GET")
print(get_response)
print(get_response.json())

sign_response = requests.put('http://127.0.0.1:5000/api/contracts/sign/' + user_id + '/' + contract_id)
print("SIGN")
print(sign_response)

get_response = requests.get('http://127.0.0.1:5000/api/contracts/retrieve/' + user_id)
print("GET")
print(get_response)
print(get_response.json())

delete_response = requests.delete('http://127.0.0.1:5000/api/contracts/delete/' + user_id + '/' + contract_id)
print("DELETE")
print(delete_response)

get_response = requests.get('http://127.0.0.1:5000/api/contracts/retrieve/' + user_id)
print("GET")
print(get_response)
print(get_response.json())
