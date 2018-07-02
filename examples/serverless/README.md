# cfn-modules: Serverless example project

This example project demonstrates how IAM policies for Lambda functions are automatically created when `cfn-modules` are combined.

## Prerequisites

1. [Install Node.js 8.x](https://nodejs.org/)
2. Create an S3 bucket where [aws cloudformation package](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/package.html) uploads the artifacts.
    1. Choose a unique bucket name, e.g. `BucketName=cfn-modules-$Name-$Region`
    2. Replace `$Name` with a unique name (e.g. your initials or company name)
    3. Replace `$Region` with your AWS default region (e.g. `us-east-1`)
    4. Create the bucket `aws s3 mb s3://$BucketName`

## Usage

```
npm i
aws cloudformation package --template-file example.yml --s3-bucket $BucketName --output-template-file packaged_example.yml
aws cloudformation deploy --template-file packaged_example.yml --stack-name serverless-example --capabilities CAPABILITY_IAM
```

## Modules

Find all modules here: https://www.npmjs.com/org/cfn-modules
