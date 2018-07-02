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

### Modular
TODO

## Production ready
All modules are production-ready. If no other limitations are documented, they are:

* Highly available
    * no single point of failure
* Scalable
    * increase or decrease the capacity based on utilization
* Secure
    * using the latest operating systems and software components
    * follow the least privilege principle in all areas
    * backups enabled
    * support encryption at-rest
    * support encryption in-transit
* Operations friendly
    * logging enabled
    * alerting enabled
    * updateable

## Open source
TODO

## Before release

* [ ] Name `cfn-modules`?
* [ ] Add tests to modules
* [x] Add linter to modules

## TODOs

* ECS Fargate example
* ECS example
* Typical web application (WordPress?) example
* API/method module
* `lambdas` rename folder name to something more natural, like `src`
* module rds-postgres
* module rds-aurora
* module elasticache-memcached
* module elasticsearch
* in module's `package.json` files, `"engines" : { "npm" : "~1.0.20" }` can ensure that a certain npm version is used which we likely need to make sure that the dir layout is as assumed
* Document `npm outdated` to show outdated modules
