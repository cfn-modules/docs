exports.handler = async function(event, context) {
  console.log(JSON.stringify(event));
  //TODO use DependencyModule1 (SQS queue), DependencyModule2 (DynamoDB table), and DependencyModule3
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      env: {
        Dependency1: process.env.DEPENDENCY1_ARN,
        Dependency2: process.env.DEPENDENCY2_ARN,
        Dependency3: process.env.DEPENDENCY3_ARN
      }
    })
  };
};
