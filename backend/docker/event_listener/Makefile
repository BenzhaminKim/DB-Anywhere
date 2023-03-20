SHELL := /bin/bash
PYTHONPATH := src/
IMAGE_NAME := dudgnl23/event_listener
IMAGE_TAG := $(shell git rev-parse --short HEAD)

docker-build:
	docker build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} .

docker-push:
	docker push ${IMAGE_NAME}:${IMAGE_TAG}

run-server:
	python event_listener/main.py
