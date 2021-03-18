const test = require('ava');
const cfntest = require('@cfn-modules/test');

test.serial('example', async t => {
  const stackName = cfntest.stackName();
  try {
    t.log(await cfntest.createStack(`${__dirname}/../example.yml`, stackName, {
      'HostedZoneId': 'Z08057981AMLWUWNFCQLS',
      'SubDomainNameWithDot': 'fargate-alb-auth-cognito.'
    }));
    const outputs = await cfntest.getStackOutputs(stackName);
    t.log(outputs);
    const res = await cfntest.probeHttpGet(outputs.Url);
    t.log(res);
    t.is(res.status, 302);
  } finally {
    t.log(await cfntest.deleteStack(stackName));
    t.pass();
  }
});