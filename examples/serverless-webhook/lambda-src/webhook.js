exports.handler = async function(event, context) {
  console.log(JSON.stringify(event));
  return {statusCode: 200, headers: {'Content-Type': 'text/plain'}, body: 'cfn-modules'};
};
