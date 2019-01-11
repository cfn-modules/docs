# cfn-modules: Serverless IAM example project

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
aws cloudformation package --template-file example.yml --s3-bucket $BucketName --output-template-file packaged.yml
aws cloudformation deploy --template-file packaged.yml --stack-name serverless-iam-example --capabilities CAPABILITY_IAM
```

Checkout the IAM role attached to the Lambda function (Get the role name with `aws cloudformation describe-stacks --stack-name serverless-iam-example --query "Stacks[0].Outputs[?OutputKey=='RoleName'].OutputValue" --output text`). The Lambda function is allowed to talk to the SQS queue, DynamoDB table, and S3 bucket because of the `DependencyModule1`, `DependencyModule2`, and `DependencyModule3` parameter. The generated policy looks like this:

```
{
  "Statement": [
    {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:u-west-1:***:log-group:serverless-iam-example-LogGroup-YLDPFNGG00XX:*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "sqs:ChangeMessageVisibility*",
        "sqs:DeleteMessage*",
        "sqs:ReceiveMessage",
        "sqs:SendMessage*"
      ],
      "Resource": [
        "arn:aws:sqs:eu-west-1:***:serverless-iam-example-Queue-1KUL6CHQ72L11-Queue-YLDPFNGG00JJ"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "dynamodb:Batch*Item",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:eu-west-1:***:table/serverless-iam-example-Table-1ES8PX0YZ1UE1-Table-OFBM6RPW27KD"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "s3:DeleteObject*",
        "s3:GetObject*",
        "s3:ListBucket*",
        "s3:ListMultipartUploadParts",
        "s3:PutObject*"
      ],
      "Resource": [
        "arn:aws:s3:::serverless-iam-example-bucket-1pwiud7lmras-bucket-191m2vgi3rwz2",
        "arn:aws:s3:::serverless-iam-example-bucket-1pwiud7lmras-bucket-191m2vgi3rwz2/*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

Don't forget to delete the stack once you are done with the demo:

```
aws cloudformation delete-stack --stack-name serverless-iam-example
```

## Modules

Find all modules here: https://www.npmjs.com/org/cfn-modules
