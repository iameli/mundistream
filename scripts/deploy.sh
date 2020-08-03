#!/bin/bash

set -ex
set -o pipefail

export DOCKER_HOST=tcp://127.0.0.1:2376

docker build -t iameli/mundistream .
ssh pi@10.9.168.90 sudo docker rm -f mundistream || echo 'previous container not found, no problem'
ssh pi@10.9.168.90 sudo docker run --name mundistream --network host -p 1730:1730 --rm iameli/mundistream
docker logs -f mundistream
