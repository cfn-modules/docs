#!/bin/bash

set -e

for example in ../examples/*; do
	(
		echo "$example"
		cd $example
		if [ -d "test" ]; then
			npm i
			cd test/
			npm i
			npm test
		fi
	)
done
