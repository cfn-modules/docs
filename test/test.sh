#!/bin/bash

set -e

for example in ../examples/*; do
	(
		echo "$example"
		cd $example
		if [ -d "test" ]; then
			npm ci
			cd test/
			npm ci
			CFN_PACKAGE_BUCKET_NAME=cf-templates-1a2zmgbg9ut4o-eu-west-1 npm test
		fi
	)
done
