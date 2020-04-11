import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

// gets the start position of the answer in the context
const paragraph = data.context;
const answer = data.answer;
const answerStart = paragraph.indexOf(answer);

  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'itemId': QA path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      itemId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET titleId = :titleId, context = :context, question = :question, answer = :answer, answerStart = :answerStart",
    ExpressionAttributeValues: {
      ":titleId": data.title || null,
      ":context": data.context || null,
      ":question": data.question || null,
      ":answer": data.answer || null,
      ":answerStart": answerStart || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});