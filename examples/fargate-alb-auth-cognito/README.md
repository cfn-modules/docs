# cfn-modules: Fargate container behind ALB with authentication via Cognito User Pool example

This example project demonstrates how an ALB can be placed in front of a single Docker container app running on Fargate. Cognito is used to add an authentication layer on top. The following diagram illustrates the high-level architecture.

```
   ┌────────────┐   
   │            │   
   │            │   
   │    ALB     │   
   │            │   
   │            │   
   └────────────┘   
          │         
          │         
┌─Service─▼────────┐
│ ┌──────────────┐ │
│ │              │ │
│ │              │ │
│ │  app         │ │
│ │  container   │ │
│ │              │ │
│ │              │ │
│ └──────────────┘ │
└──────────────────┘
```

## Prerequisites

1. [Install Node.js 10.x](https://nodejs.org/)
2. Create an S3 bucket where [aws cloudformation package](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/package.html) uploads the artifacts.
    1. Choose a unique bucket name, e.g. `BucketName=cfn-modules-$Name-$Region`
    2. Replace `$Name` with a unique name (e.g. your initials or company name)
    3. Replace `$Region` with your AWS default region (e.g. `us-east-1`)
    4. Create the bucket `aws s3 mb s3://$BucketName`

## Usage

Replace `$HostedZone` and `$Subdomain`.

```
npm i
aws cloudformation package --template-file example.yml --s3-bucket $BucketName --output-template-file packaged.yml
aws cloudformation deploy --template-file packaged.yml --stack-name fargate-alb-auth-cognito-example --parameter-overrides HostedZoneId=$HostedZone SubDomainNameWithDot=$Subdomain --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name fargate-alb-auth-cognito-example --query "Stacks[0].Outputs[?OutputKey=='Url'].OutputValue" --output text
```

Open the URL in your web browser.

Don't forget to delete the stack once you are done with the demo:

```
aws cloudformation delete-stack --stack-name fargate-alb-auth-cognito-example
```

## Modules

Find all modules here: https://www.npmjs.com/org/cfn-modules
