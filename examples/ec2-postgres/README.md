# cfn-modules: EC2 PostgreSQL example project

This example project demonstrates how an EC2 instance can communicate with an RDS PostgreSQL database.

## Prerequisites

1. [Install Node.js 10.x](https://nodejs.org/)
2. Create an S3 bucket where [aws cloudformation package](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/package.html) uploads the artifacts.
    1. Choose a unique bucket name, e.g. `BucketName=cfn-modules-$Name-$Region`
    2. Replace `$Name` with a unique name (e.g. your initials or company name)
    3. Replace `$Region` with your AWS default region (e.g. `us-east-1`)
    4. Create the bucket `aws s3 mb s3://$BucketName`

## Usage

```
npm i
aws cloudformation package --template-file example.yml --s3-bucket $BucketName --output-template-file packaged.yml
aws cloudformation deploy --template-file packaged.yml --stack-name ec2-postgres-example --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name ec2-postgres-example --query "Stacks[0].Outputs[?OutputKey=='Url'].OutputValue" --output text
```

Open the URL in your web browser, login with the password `insecure`, and you will see [a database management tool](https://www.adminer.org/).

Don't forget to delete the stack once you are done with the demo:

```
aws cloudformation delete-stack --stack-name ec2-postgres-example
```

## Modules

Find all modules here: https://www.npmjs.com/org/cfn-modules
