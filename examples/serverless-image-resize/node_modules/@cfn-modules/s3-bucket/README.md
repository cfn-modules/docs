# cfn-modules: AWS S3 bucket

AWS S3 bucket with encryption and backups.


## Install

> Install [Node.js and npm](https://nodejs.org/) first!

```
npm i @cfn-modules/s3-bucket
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
        KmsKeyModule: !GetAtt 'Key.Outputs.StackName' # optional
        BucketName: '' # optional
        Access: Private # optional
        Versioning: 'true' # optional
        NoncurrentVersionExpirationInDays: 0 # optional
      TemplateURL: './node_modules/@cfn-modules/s3-bucket/module.yml'
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
      <td>KmsKeyModule</td>
      <td>Stack name of <a href="https://www.npmjs.com/package/@cfn-modules/kms-key">kms-key module</a></td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>BucketName</td>
      <td>name of the bucket</td>
      <td>auto generated value</td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>Access</td>
      <td>Access policy of the bucket</td>
      <td>Private</td>
      <td>no</td>
      <td>[Private, PublicRead, CloudFrontRead]</td>
    </tr>
    <tr>
      <td>Versioning</td>
      <td>Enable versioning to keep a backup if objects change</td>
      <td>true</td>
      <td>no</td>
      <td>[true, false, 'false-but-was-true']</td>
    </tr>
    <tr>
      <td>NoncurrentVersionExpirationInDays</td>
      <td>Remove noncurrent object versions after days (set to 0 to disable)</td>
      <td>0</td>
      <td>no</td>
      <td>[0-N]</td>
    </tr>
    <tr>
      <td>LambdaEventTargetLambdaModule1</td>
      <td>Stack name of lambda-function module to receive events from this S3 bucket (Only works if lambda-function S3BucketAccess is set to true). Also grants the Lambda function access to this bucket.</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>LambdaEventType1</td>
      <td>S3 bucket events you want to receive (can not be the same as QueueEventType1)</td>
      <td>s3:ObjectCreated:*</td>
      <td>no</td>
      <td><a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#notification-how-to-event-types-and-destinations">Supported event types</a></td>
    </tr>
  </tbody>
</table>
