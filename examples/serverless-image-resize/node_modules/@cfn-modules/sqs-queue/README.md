# cfn-modules: AWS SQS queue

AWS SQS queue with a dead letter queue, encryption, and [alerting](https://www.npmjs.com/package/@cfn-modules/alerting).

## Install

> Install [Node.js and npm](https://nodejs.org/) first!

```
npm i @cfn-modules/sqs-queue
```

## Usage

```
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'cfn-modules example'
Resources:
  Queue:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        AlertingModule: !GetAtt 'Alerting.Outputs.StackName' # optional
        KmsKeyModule: !GetAtt 'Key.Outputs.StackName' # optional
        DelaySeconds: 0 # optional
        KmsDataKeyReusePeriodSeconds: 300 # optional
        MaximumMessageSize: 262144 # optional
        MessageRetentionPeriod: 345600 # optional
        ReceiveMessageWaitTimeSeconds: 0 # optional
        VisibilityTimeout: 0 # optional
      TemplateURL: './node_modules/@cfn-modules/sqs-queue/module.yml'
```

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
      <td>DelaySeconds</td>
      <td>The time in seconds that the delivery of all messages in the queue is delayed</td>
      <td>0</td>
      <td>no</td>
      <td>[0-900]</td>
    </tr>
    <tr>
      <td>KmsDataKeyReusePeriodSeconds</td>
      <td>The length of time in seconds that Amazon SQS can reuse a data key to encrypt or decrypt messages before calling AWS KMS again</td>
      <td>300</td>
      <td>no</td>
      <td>[60-86400]</td>
    </tr>
    <tr>
      <td>MaximumMessageSize</td>
      <td>The limit of how many bytes that a message can contain before Amazon SQS rejects it</td>
      <td>262144</td>
      <td>no</td>
      <td>[1024-262144]</td>
    </tr>
    <tr>
      <td>MessageRetentionPeriod</td>
      <td>The number of seconds that Amazon SQS retains a message</td>
      <td>345600</td>
      <td>no</td>
      <td>[60-1209600]</td>
    </tr>
    <tr>
      <td>ReceiveMessageWaitTimeSeconds</td>
      <td>Specifies the duration, in seconds, that the ReceiveMessage action call waits until a message is in the queue in order to include it in the response, as opposed to returning an empty response if a message isn't yet available</td>
      <td>0</td>
      <td>no</td>
      <td>[0-20]</td>
    </tr>
    <tr>
      <td>VisibilityTimeout</td>
      <td>The length of time during which a message will be unavailable after a message is delivered from the queue</td>
      <td>30</td>
      <td>no</td>
      <td>[0-43200]</td>
    </tr>
  </tbody>
</table>
