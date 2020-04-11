# Data4BERT APIs

Data4BERT backend API developed using AWS Lambda, API Gateway and Serverless Framework. This code was heavily influenced by [Serverless Stack].(https://serverless-stack.com/)

### Test Functions

To test each API using the following commands in the root directory;
- create 
  -`serverless invoke local --function create --path mocks/create-event.json`

- get
  -`serverless invoke local --function get --path mocks/get-event.json`

- list
  -`serverless invoke local --function list --path mocks/list-event.json`