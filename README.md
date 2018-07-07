# cfn-modules User Guide

![cfn-modules](./logo.png)

Easy-going CloudFormation: Modular, production ready, open source.

> `cfn-modules` is work in progress.

## Prerequisites
* AWS CLI installed ([install](https://docs.aws.amazon.com/cli/latest/userguide/installing.html))
* npm 3.x installed ([install Node.js 8.x](https://nodejs.org/))

## Examples
* EC2
    * [Mount EBS volume](./examples/ec2-ebs/)
    * [Mount EFS file system](./examples/ec2-efs/)
    * [Connect to MySQL](./examples/ec2-mysql/)
    * [Connect to Postgres](./examples/ec2-postgres/)
    * [SSH bastion](./examples/ec2-ssh-bastion/)
* Serverless
    * [Cron](./examples/serverless-cron/)
    * [Auto IAM policies](./examples/serverless-iam/)
    * [Image resize](./examples/serverless-image-resize/)
    * [SQS queue](./examples/serverless-sqs-queue/)

Check out the [examples](./examples/) folder to see all examples.

## Getting started

`cfn-modules` are installed and updated with the package manager [npm](https://www.npmjs.com/). The [module catalog](https://www.npmjs.com/org/cfn-modules) contains all available modules. Let's start with a simple example: An EC2 instance launched into a VPC.

> [Install Node.js 8.x](https://nodejs.org/) if `npm` is not installed on your system 

You install the modules using npm:

```
npm i @cfn-modules/vpc
npm i @cfn-modules/ec2-instance-amazon-linux
```

You use the modules as nested stacks in your CloudFormation template. The [vpc](https://www.npmjs.com/package/@cfn-modules/vpc) module comes with no required parameters. You can just use it. The [ec2-instance-amazon-linux](https://www.npmjs.com/package/@cfn-modules/ec2-instance-amazon-linux) module comes with the required `VpcModule` parameter to make the connection with the `vpc` module. The `UserData` [parameter](https://www.npmjs.com/package/@cfn-modules/ec2-instance-amazon-linux#parameters) is optional. You can use it to install additional software like the Apache HTTP Server. Create a file named `example.yml` with the following content:

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

You upload the CloudFormation template and the dependencies to S3 with the `aws cloudformation package` command.

> [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) if `aws` is not installed on your system 

If you use `cfn-modules` the first time, create an S3 bucket now to store the artifacts (otherwise, skip this step). Choose a unique bucket name, e.g. `cfn-modules-$Name-$Region`.

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

Creating the stack will take ~10 minutes. You can find the URL to the demo page in the stack outputs:

```
aws cloudformation describe-stacks --stack-name ec2-example --query "Stacks[0].Outputs"
```

Don't forget to delete the stack:

```
aws cloudformation delete-stack --stack-name ec2-example
aws cloudformation wait stack-delete-complete --stack-name ec2-example
```

Fin. Now, check out more [examples](./examples/)?

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
* Operations friendly
    * logging enabled
    * alerting enabled
    * updatable

### Open source
All modules are licensed under [Apache-2.0](./LICENSE). Commercial use is allowed.

## About
A [cloudonaut.io](https://cloudonaut.io) project. Engineered by [widdix](https://widdix.net).

## Open tasks

* [ ] double check "Production ready" limitations
* [ ] Add tests to modules
* [ ] document `npm outdated` to show outdated modules
* [ ] we will run into issued if npm installs different versions of the same module which will cause a more nested dir structure (is `yarn` different?)
* [ ] in module's `package.json` files, `"engines" : { "npm" : "~1.0.20" }` can ensure that a certain npm version is used which we likely need to make sure that the dir layout is as assumed
* Modules
    * [ ] lambda-event-source-webhook
    * [ ] ecs-cluster
    * [ ] ecs-service ?!
    * [ ] rds-aurora-mysql
    * [ ] elasticache-memcached
    * [ ] elasticsearch
    * [ ] ec2-instance (using ImageId as a parameter)
    * [ ] 1:1:1 Auto Scaling Group based on Amazon Linux (EIP)
    * [ ] 1:1:1 Auto Scaling Group based on Amazon Linux 2 (EIP) (ssh-bastion module should depend on that)
    * [ ] 1:1:1 Auto Scaling Group (using ImageId as a parameter)(EIP) 
    * [ ] Auto Scaling Group based on Amazon Linux
    * [ ] Auto Scaling Group based on Amazon Linux 2
    * [ ] Auto Scaling Group (using ImageId as a parameter)
* Examples
    * [ ] ECS Fargate example
    * [ ] ECS example
    * [ ] Typical web application (WordPress?) example
