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
    t.true(res.data.includes('Sign in with your email and password'));
    t.is(res.status, 200);
  } finally {
    t.log(await cfntest.deleteStack(stackName));
    t.pass();
  }
});