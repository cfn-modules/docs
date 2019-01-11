# cfn-modules: Serverless webhook example project

This example project demonstrates how a Lambda function can be triggered periodically.

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
aws cloudformation package --template-file example.yml --s3-bucket $BucketName --output-template-file packaged.yml
aws cloudformation deploy --template-file packaged.yml --stack-name serverless-webhook-example --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name serverless-webhook-example --query "Stacks[0].Outputs[?OutputKey=='Url'].OutputValue" --output text
```

Open the URL in your web browser and you will see the string cfn-modules.

Don't forget to delete the stack once you are done with the demo:

```
aws cloudformation delete-stack --stack-name serverless-webhook-example
```

## Modules

Find all modules here: https://www.npmjs.com/org/cfn-modules
