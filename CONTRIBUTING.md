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
