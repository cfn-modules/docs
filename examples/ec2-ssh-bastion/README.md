# cfn-modules: EC2 SSH bastion example project

This example project demonstrates how an EC2 instance can be placed into a VPC with a bastion host for secure SSH access.

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
aws cloudformation deploy --template-file packaged.yml --stack-name ec2-ssh-bastion-example --capabilities CAPABILITY_IAM
```

To connect to the EC2 instance via SSH, run the following command. Replace:
* `$IamUserName` with your IAM user name (requires that you upload a public SSH key for your IAM user under Security Credentials, [read this of your user name contains special characters](https://github.com/widdix/aws-ec2-ssh#iam-user-names-and-linux-user-names))
* `$BastionPublicIpAddress` with the output of `aws cloudformation describe-stacks --stack-name ec2-ssh-bastion-example --query "Stacks[0].Outputs[?OutputKey=='BastionPublicIpAddress'].OutputValue" --output text`
* `$TargetPrivateIpAddress` with the output of `aws cloudformation describe-stacks --stack-name ec2-ssh-bastion-example --query "Stacks[0].Outputs[?OutputKey=='TargetPrivateIpAddress'].OutputValue" --output text`

```
ssh -J $IamUserName@$$BastionPublicIpAddress $TargetPrivateIpAddress
```

Don't forget to delete the stack once you are done with the demo:

```
aws cloudformation delete-stack --stack-name ec2-ssh-bastion-example
```

## Modules

Find all modules here: https://www.npmjs.com/org/cfn-modules
