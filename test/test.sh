#!/bin/bash -e

for example in ../examples/*; do
	(
		echo "$example"
		cd $example
		if [ -d "test" ]; then
			npm i
			npm test
		fi
	)
done
