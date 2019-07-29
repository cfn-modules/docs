![cfn-modules](./logo.png)

[![Build Status](https://travis-ci.org/cfn-modules/docs.svg?branch=master)](https://travis-ci.org/cfn-modules/docs)

# cfn-modules User Guide

Rapid CloudFormation: Modular, production ready, open source.

## Why cfn-modules?
We started with [aws-cf-templates](https://github.com/widdix/aws-cf-templates) in 2015. Three years later, we believe that we have learned enough to come up with a new approach to use CloudFormation more efficient.

### Modular
Reusing CloudFormation templates is hard. Most often, templates are initially copied and then modified.

Two problems arise. First, updates to the copy are not applied to the original. Second, updates to the original are not applied to the copy. **In essence: we do not learn from each other!**

By using an easy to use package manager ([npm](https://www.npmjs.com/)) you can install and update `cfn-modules` to spin up complex infrastructure in minuted that just works.

### Production ready
All modules are production-ready. If no other limitations are documented, they are:

* Highly available
    * no single point of failure
* Scalable
    * increase or decrease the capacity based on utilization
* Secure
    * using the latest operating systems and software components
    * follow the least privilege principle (e.g., IAM policies and Security Groups)
    * backups of state (not configuration) enabled
    * encryption at-rest enabled
    * encryption in-transit enabled and preferred
* Operator-friendly
    * logging enabled
    * alerting enabled
    * updatable

### Open source
All modules are licensed under [Apache-2.0](./LICENSE). Commercial use is allowed.

## Prerequisites
* AWS CLI installed ([install](https://docs.aws.amazon.com/cli/latest/userguide/installing.html))
* npm >=5.6 installed ([install Node.js 8.x](https://nodejs.org/))

## Getting started

`cfn-modules` are installed and updated with the package manager [npm](https://www.npmjs.com/). The [module catalog](https://www.npmjs.com/org/cfn-modules) contains all available modules. Let's start with a simple example: An EC2 instance launched into a VPC.

> [Install Node.js 8.x](https://nodejs.org/) if `npm` is not installed on your system 

Install the modules using npm:

```
npm i @cfn-modules/vpc@1.0.0
npm i @cfn-modules/ec2-instance-amazon-linux@1.0.0
```

Use the modules as nested stacks in your CloudFormation template. The [vpc](https://www.npmjs.com/package/@cfn-modules/vpc) module comes with no required parameters. The [ec2-instance-amazon-linux](https://www.npmjs.com/package/@cfn-modules/ec2-instance-amazon-linux) module comes with the required `VpcModule` parameter to make the connection with the `vpc` module. The `UserData` [parameter](https://www.npmjs.com/package/@cfn-modules/ec2-instance-amazon-linux#parameters) is optional. Use it to install additional software like the Apache HTTP Server. Create a file named `example.yml` with the following content:

```
---
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  Vpc:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        S3Endpoint: 'false' # speed up the example
        DynamoDBEndpoint: 'false' # speed up the example
        FlowLog: 'false' # speed up the example
        NatGateways: 'false' # speed up the example
      TemplateURL: './node_modules/@cfn-modules/vpc/module.yml'
  Instance:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        VpcModule: !GetAtt 'Vpc.Outputs.StackName' # reference the vpc module
        UserData: |
          yum install -y httpd24
          service httpd start
          echo "cfn-modules" > /var/www/html/index.html
        IngressTcpPort1: '80' # open up port 80 to the world
      TemplateURL: './node_modules/@cfn-modules/ec2-instance-amazon-linux/module.yml'
Outputs:
  Url:
    Value: !Sub 'http://${Instance.Outputs.PublicIpAddress}'
```

Upload the CloudFormation template and the dependencies to S3 with the `aws cloudformation package` command.

> [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) if `aws` is not installed on your system 

If you use `cfn-modules` the first time, create an S3 bucket to store the artifacts first (otherwise, skip this step). Choose a unique bucket name, e.g. `cfn-modules-$Name-$Region`.

In the following command, replace `$Name` with a unique name (e.g. your initials or company name), and replace `$Region` with your AWS default region (e.g. `us-east-1`) to create an S3 bucket:

```
aws s3 mb s3://cfn-modules-$Name-$Region
```

Now you can upload all artifacts to S3:

```
aws cloudformation package --template-file example.yml --s3-bucket cfn-modules-$Name-$Region --output-template-file packaged.yml
```

Finally, you can create a CloudFormation stack with `aws cloudformation deploy`:

```
aws cloudformation deploy --template-file packaged.yml --stack-name ec2-example --capabilities CAPABILITY_IAM
```

Creating the stack will take about 10 minutes. You can find the URL to the demo page in the stack outputs:

```
aws cloudformation describe-stacks --stack-name ec2-example --query "Stacks[0].Outputs"
```

Don't forget to delete the stack:

```
aws cloudformation delete-stack --stack-name ec2-example
aws cloudformation wait stack-delete-complete --stack-name ec2-example
```

Fin. Check out our examples next.

## Examples
* Auto Scaling Group (singleton)
    * [SSM](./examples/asg-singleton-ssm/)
* EC2
    * [Mount EBS volume](./examples/ec2-ebs/)
    * [Mount EFS file system](./examples/ec2-efs/)
    * [Connect to MySQL](./examples/ec2-mysql/)
    * [Connect to Postgres](./examples/ec2-postgres/)
    * [SSH bastion](./examples/ec2-ssh-bastion/)
    * [SSM](./examples/ec2-ssm/)
* Fargate
    * [ALB with proxy pattern](./examples/fargate-alb-proxy-pattern/)
    * [ALB to single container](./examples/fargate-alb-single-container/)
* Serverless
    * [Cron](./examples/serverless-cron/)
    * [Auto IAM policies](./examples/serverless-iam/)
    * [Image resize](./examples/serverless-image-resize/)
    * [SQS queue](./examples/serverless-sqs-queue/)
    * [Webhook](./examples/serverless-webhook/)

Check out the [examples](./examples/) folder to see all examples.

## Modules

* [alerting](https://github.com/cfn-modules/alerting)
* Load Balancer
    * [alb](https://github.com/cfn-modules/alb)
    * [alb-listener](https://github.com/cfn-modules/alb-listener)
    * [alb-redirect-to-https](https://github.com/cfn-modules/alb-redirect-to-https)
    * [nlb](https://github.com/cfn-modules/nlb)
    * [lb-dns-record](https://github.com/cfn-modules/lb-dns-record)
* Auto Scaling Group (singleton)
    * [asg-singleton-amazon-linux2](https://github.com/cfn-modules/asg-singleton-amazon-linux2)
* [client-sg](https://github.com/cfn-modules/client-sg)
* [cloudwatch-dashboard](https://github.com/cfn-modules/cloudwatch-dashboard)
* [dynamodb-table](https://github.com/cfn-modules/dynamodb-table)
* [ebs-volume](https://github.com/cfn-modules/ebs-volume)
* EC2 instance
    * [ec2-instance-amazon-linux](https://github.com/cfn-modules/ec2-instance-amazon-linux)
    * [ec2-instance-amazon-linux2](https://github.com/cfn-modules/ec2-instance-amazon-linux2)
* ECS
    * [ecs-cluster](https://github.com/cfn-modules/ecs-cluster)
    * [ecs-alb-target](https://github.com/cfn-modules/ecs-alb-target)
    * [ecs-nlb-listener-and-target](https://github.com/cfn-modules/ecs-nlb-listener-and-target)
    * Fargate
        * [fargate-service](https://github.com/cfn-modules/fargate-service)
* [efs-file-system](https://github.com/cfn-modules/efs-file-system)
* [kinesis-data-stream](https://github.com/cfn-modules/kinesis-data-stream)
* [kms-key](https://github.com/cfn-modules/kms-key)
* Lambda
    * [lambda-event-source-cron](https://github.com/cfn-modules/lambda-event-source-cron)
    * [lambda-event-source-dynamodb-stream](https://github.com/cfn-modules/lambda-event-source-dynamodb-stream)
    * [lambda-event-source-kinesis-data-stream](https://github.com/cfn-modules/lambda-event-source-kinesis-data-stream)
    * [lambda-event-source-sqs-queue](https://github.com/cfn-modules/lambda-event-source-sqs-queue)
    * [lambda-event-source-webhook](https://github.com/cfn-modules/lambda-event-source-webhook)
    * [lambda-function](https://github.com/cfn-modules/lambda-function)
* RDS
    * [rds-aurora-serverless](https://github.com/cfn-modules/rds-aurora-serverless)
    * [rds-aurora-serverless-postgres](https://github.com/cfn-modules/rds-aurora-serverless-postgres) 
    * [rds-mysql](https://github.com/cfn-modules/rds-mysql)
    * [rds-postgres](https://github.com/cfn-modules/rds-postgres)
* Route53
    * [route53-hosted-zone-private](https://github.com/cfn-modules/route53-hosted-zone-private)
    * [route53-hosted-zone-public](https://github.com/cfn-modules/route53-hosted-zone-public)
    * [route53-hosted-zone-wrapper](https://github.com/cfn-modules/route53-hosted-zone-wrapper)
* [s3-bucket](https://github.com/cfn-modules/s3-bucket)
* [secret](https://github.com/cfn-modules/secret)
* [sqs-queue](https://github.com/cfn-modules/sqs-queue)
* [ssh-bastion](https://github.com/cfn-modules/ssh-bastion)
* [vpc](https://github.com/cfn-modules/vpc)

Check out the [module catalog](https://www.npmjs.com/org/cfn-modules) to browse all modules.

## About
A [cloudonaut.io](https://cloudonaut.io) project. Engineered by [widdix](https://widdix.net).
