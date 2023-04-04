SHELL := /bin/bash

.DEFAULT_GOAL := help
REPO_ROOT := $(shell git rev-parse --show-toplevel)
BRANCH_NAME := $(shell git rev-parse --abbrev-ref HEAD)
MODIFIED_BRANCH_NAME := $(shell git rev-parse --abbrev-ref HEAD | tr '/' '-' | tr '_' '-' | tr '[:upper:]' '[:lower:]')

docker-build:
	docker build --platform linux/amd64 -t dudgnl23/anywhere-frontend:0.0.3 .

docker-push:
	docker push dudgnl23/anywhere-frontend:0.0.3

docker-run:
	docker run --name anywhere-frontend --rm -p 5173:5173 -d dudgnl23/anywhere-frontend:0.0.1 