# cfn-modules Contributor Guide
This document is only for module developers. If you want to use `cfn-modules`, check out the [README.md](./README.md).

## Interfaces
Modules can implement interfaces. At the moment, interfaces are not "checked" but we plan to do this later.

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

### ExposeDnsName

#### Parameters
none

#### Outputs
* `DnsName`

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

### LoadBalancer (extends: ExposeDnsName)

### Parameters
none

#### Outputs
* `CanonicalHostedZoneId`

### Target (extends: ExposeArn, ExposeSecurityGroupId)

#### Parameters
none

#### Outputs
none


## How to

### Add a cfn-module as a dependency to a cfn-module

Unfortunately, we can not rely on `npm` to add cfn-modules as dependencies to other cfn-modules. `npm` will mess up the paths inside `node_modules/`. Therfore, we have to use git submodules to achieve the same.

1. Add the git submodule: `git submodule add https://github.com/cfn-modules/lambda-function node_modules/@cfn-modules/lambda-function`
2. Add the module name to the `bundledDependencies` in `package.json`: `"bundledDependencies": ["@cfn-modules/lambda-function"]`

### Update a cfn-module dependency

1. Change into the dependency directory: `cd node_modules/@cfn-modules/lambda-function`
2. Fetch latest git information: `git fetch --all --tags --prune`
3. Update the version: `git checkout v1.3.1`

### Pull all cfn-module dependencies

1. `git pull`
2. `git submodule update --init --recursive`
