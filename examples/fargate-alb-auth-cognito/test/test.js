const test = require('ava');
const cfntest = require('@cfn-modules/test');

test.serial('example', async t => {
  const stackName = cfntest.stackName();
  try {
    t.log(await cfntest.createStack(`${__dirname}/../example.yml`, stackName, {
      "HostedZoneId": "Z08057981AMLWUWNFCQLS",
      "SubDomainNameWithDot": "fargate-alb-auth-cognito."
    }));
    const outputs = await cfntest.getStackOutputs(stackName);
    t.log(outputs);
    const res = await cfntest.probeHttpGet(outputs.Url);
    t.is(res.headers.server, 'Apache/2.4.23 (Unix)');
    t.true(res.data.includes('It works!'));
  } finally {
    t.log(await cfntest.deleteStack(stackName));
    t.pass();
  }
});