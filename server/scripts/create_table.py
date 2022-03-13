import boto3

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

# Create the DynamoDB table.
table = dynamodb.create_table(
    TableName='test_contracts',
    KeySchema=[
        {
            'AttributeName': 'userid',
            'KeyType': 'HASH'
        },
        {
            'AttributeName': 'id',
            'KeyType': 'RANGE'
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'id',
            'AttributeType': 'S'
        },
        {
           'AttributeName': 'userid',
            'AttributeType': 'S' 
        }
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 20,
        'WriteCapacityUnits': 20
    }
)

# Wait until the table exists.
table.wait_until_exists()

# Print out some data about the table.
print(table.item_count)