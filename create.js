import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  // gets the start position of the answer in the context
  const paragraph = data.context;
  const answer = data.text;
  const answerStart = paragraph.indexOf(answer);

  const params = {
    TableName: process.env.tableName,

    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      titleId: data.title,
      context: data.context,
      question: data.question,
      text: data.text,
      answerStart: answerStart,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});