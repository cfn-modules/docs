const test = require('ava');
const cfntest = require('@cfn-modules/test');
const axios = require('axios');

test('example', async t => {
  const stackName = cfntest.stackName();
  try {
    t.log(await cfntest.createStack(`${__dirname}/../example.yml`, stackName, {}));
    const outputs = await cfntest.getStackOutputs(stackName);
    t.log(outputs);
    const res = await axios.get(outputs.Url);
    t.is(res.headers.server, 'Apache/2.4.23 (Unix)');
    t.true('x-varnish' in res.headers);
    t.true(res.data.includes('It works!'));
  } finally {
    t.log(await cfntest.deleteStack(stackName));
    t.pass();
  }
});