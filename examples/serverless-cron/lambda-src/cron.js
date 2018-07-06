exports.handler = async function(event, context) {
  console.log(JSON.stringify(event));
  return true;
};
