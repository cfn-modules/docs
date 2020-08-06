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
			npm test
		fi
	)
done
