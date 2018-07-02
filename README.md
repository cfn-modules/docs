# cfn-modules

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

## Interfaces

### ExposeArn

#### Parameters
none

#### Outputs
* `Arn`

### ExposeName

#### Parameters
none

#### Outputs
* `Name`

### ExposeId

#### Parameters
none

#### Outputs
* `Id`

### ExposeSecurityGroupId

#### Parameters
none

#### Outputs
* `SecurityGroupId`

### LambdaDependency (extends ExposeArn)

#### Parameters
none

#### Outputs
* `IamActions`
* `IamResources`

### Bastion (extends ExposeSecurityGroupId)

#### Parameters
none

#### Outputs
none

### HostedZone (extends: ExposeName, ExposeId)

#### Parameters
none

#### Outputs
none
