SHELL := /bin/bash

.DEFAULT_GOAL := help
REPO_ROOT := $(shell git rev-parse --show-toplevel)
BRANCH_NAME := $(shell git rev-parse --abbrev-ref HEAD)
MODIFIED_BRANCH_NAME := $(shell git rev-parse --abbrev-ref HEAD | tr '/' '-' | tr '_' '-' | tr '[:upper:]' '[:lower:]')

deploy-dev-cluster-kafka:
	helm upgrade $(MODIFIED_BRANCH_NAME)-stream helm/kafka-infra \
		-n $(MODIFIED_BRANCH_NAME) --create-namespace --install \
		--set kafka-cluster.cp-kafka.persistence.size=50Gi \
		--wait

port-forward: 
	if [ -z `command -v kubefwd` ];\
		 then echo Go, https://kubefwd.com;\
		 exit; \
	else \
		sudo -E kubefwd svc -A;\
	fi; \

run-server:
	poetry run uvicorn anywhere.main:app --host=0.0.0.0 --port 8080 --reload --no-access-log
	
run-server-production:
	poetry run uvicorn anywhere.main:app --host=0.0.0.0 --port 8080

run-local-db:
	docker run  --name anywheredb -p 5432:5432 -e POSTGRES_USER=anywhere -e POSTGRES_PASSWORD=anywhere -e POSTGRES_DB=anywhere -e POSTGRES_PASSWORD=anywhere -d postgres:14.3-alpine 