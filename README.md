# cfn-modules User Guide

Easy going CloudFormation: Modular, production ready, open source.

> cfn-modules is work in progress. Don't use it yet!

## Examples
* Serverless
    * [API](./examples/serverless/)
    * [Cron](./examples/serverless-cron/)
    * [Image resize](./examples/serverless-image-resize/)
    * [SQS queue](./examples/serverless-sqs-queue/)
* [EC2](./examples/ec2/)

Check out the [examples](./examples/) folder to see all examples.

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
    * backups enabled
    * encryption at-rest enabled
    * encryption in-transit enabled and preferred
* Operations friendly
    * logging enabled
    * alerting enabled
    * updatable

### Open source
All modules are licensed under [Apache-2.0](./LICENSE). Commercial use is allowed.

## Open tasks

* [ ] Name `cfn-modules`?
* [ ] Add tests to modules
* [x] Add linter to modules
* [ ] ECS Fargate example
* [ ] ECS example
* [ ] Typical web application (WordPress?) example
* [ ] API/method module
* [ ] `lambdas` rename folder name to something more natural, like `src`
* [ ] module rds-postgres
* [ ] module rds-aurora
* [ ] module elasticache-memcached
* [ ] module elasticsearch
* [ ] in module's `package.json` files, `"engines" : { "npm" : "~1.0.20" }` can ensure that a certain npm version is used which we likely need to make sure that the dir layout is as assumed
* [ ] document `npm outdated` to show outdated modules
