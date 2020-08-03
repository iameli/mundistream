#!/bin/bash

set -ex
set -o pipefail

export DOCKER_HOST=tcp://127.0.0.1:2376

docker build -t iameli/mundistream .
