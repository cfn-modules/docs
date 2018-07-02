# cfn-modules: AWS Lambda function

AWS Lambda function with automated IAM policy generation, encryption, log group and [alerting](https://www.npmjs.com/package/@cfn-modules/alerting).

## Install

> Install [Node.js and npm](https://nodejs.org/) first!

```
npm i @cfn-modules/lambda-function
```

## Usage

> The lambda source code must be in the folder `lambdas`.

> If you pass in a module dependency (e.g. `DependencyModule1`), the environment variable `DEPENDENCY1_ARN` inside the Lambda function will contain the ARN of the dependency.

```
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'cfn-modules example'
Resources:
  Function:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        AlertingModule: !GetAtt 'Alerting.Outputs.StackName' # optional
        KmsKeyModule: !GetAtt 'Key.Outputs.StackName' # optional
        VpcModule: !GetAtt 'Vpc.Outputs.StackName' # optional
        DeadLetterQueueModule: !GetAtt 'Queue.Outputs.StackName' # optional
        Description: '' # optional
        Handler: 'example.handler' # required (file must be in the lambdas folder)
        MemorySize: 128 # optional
        ReservedConcurrentExecutions: -1 # optional
        Runtime: 'nodejs8.10' # required
        Timeout: 3 # optional
        TracingConfigMode: PassThrough # optional
        LogGroupRetentionInDays: 14 # optional
        DependencyModule1: !GetAtt 'Queue.Outputs.StackName' # optional
        DependencyModule2: !GetAtt 'Table.Outputs.StackName' # optional
        DependencyModule3: '' # optional
        ApiGatewayAccess: true # optional
        S3BucketAccess: true # optional
      TemplateURL: './node_modules/@cfn-modules/lambda-function/module.yml'
```

### Event sources

* [Cron](https://www.npmjs.com/package/@cfn-modules/lambda-event-source-cron)
* [SQS queue](https://www.npmjs.com/package/@cfn-modules/lambda-event-source-sqs-queue)
* [S3 bucket](https://www.npmjs.com/package/@cfn-modules/s3-bucket)

## Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
      <th>Required?</th>
      <th>Allowed values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AlertingModule</td>
      <td>Stack name of <a href="https://www.npmjs.com/package/@cfn-modules/alerting">alerting module</a></td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>KmsKeyModule</td>
      <td>Stack name of <a href="https://www.npmjs.com/package/@cfn-modules/kms-key">kms-key module</a></td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>VpcModule</td>
      <td>Stack name of <a href="https://www.npmjs.com/package/@cfn-modules/vpc">vpc module</a></td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>DeadLetterQueueModule</td>
      <td>Stack name of <a href="https://www.npmjs.com/package/@cfn-modules/sqs-queue">sqs-queue module</a> where Lambda sends events to after the maximum number of retries was reached</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>Description</td>
      <td>description of the function</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>Handler</td>
      <td>The name of the function (within your source code) that Lambda calls to start running your code</td>
      <td></td>
      <td>yes</td>
      <td></td>
    </tr>
    <tr>
      <td>MemorySize</td>
      <td>The amount of memory, in MB, that is allocated to your Lambda function</td>
      <td></td>
      <td>no</td>
      <td>[128-3008] and a multiple of 64</td>
    </tr>
    <tr>
      <td>ReservedConcurrentExecutions</td>
      <td>The maximum of concurrent executions you want reserved for the function (-1 means no maximum)</td>
      <td>-1</td>
      <td>no</td>
      <td>[-1, 0-N]</td>
    </tr>
    <tr>
      <td>Runtime</td>
      <td>The runtime environment for the Lambda function that you are uploading</td>
      <td></td>
      <td>no</td>
      <td>['nodejs6.10', 'nodejs8.10', java8, 'python2.7', 'python3.6', 'dotnetcore1.0', 'dotnetcore2.0', 'go1.x']</td>
    </tr>
    <tr>
      <td>Timeout</td>
      <td>The function execution time at which Lambda should terminate the function</td>
      <td>3</td>
      <td>no</td>
      <td>[1-300]</td>
    </tr>
    <tr>
      <td>TracingConfigMode</td>
      <td>If PassThrough, Lambda will only trace the request from an upstream service if it contains a tracing header with "sampled=1". If Active, Lambda will respect any tracing header it receives from an upstream service. If no tracing header is received, Lambda will call X-Ray for a tracing decision.</td>
      <td>PassThrough</td>
      <td>no</td>
      <td>[Active, PassThrough]</td>
    </tr>
    <tr>
      <td>LogGroupRetentionInDays</td>
      <td>The number of days log events are kept in CloudWatch Logs</td>
      <td>14</td>
      <td>no</td>
      <td>[1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653]</td>
    </tr>
    <tr>
      <td>DependencyModule1</td>
      <td>Stack name of module implementing LambdaDependency to generate IAM Policy</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>DependencyModule2</td>
      <td>Stack name of module implementing LambdaDependency to generate IAM Policy</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>DependencyModule3</td>
      <td>Stack name of module implementing LambdaDependency to generate IAM Policy</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>ApiGatewayAccess</td>
      <td>Allow invoke access from API gateways from the same AWS account and region?</td>
      <td>true</td>
      <td>no</td>
      <td>[true, false]</td>
    </tr>
    <tr>
      <td>S3BucketAccessy</td>
      <td>Allow invoke access from S3 buckets from the same AWS account?</td>
      <td>true</td>
      <td>no></td>
      <td>[true, false]</td>
    </tr>
  </tbody>
</table>
