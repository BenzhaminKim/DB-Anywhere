SHELL := /bin/bash
PYTHONPATH := src/
IMAGE_NAME := dudgnl23/event_listener
IMAGE_TAG := 0.0.1

docker-build:
	docker build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} .

docker-push:
	docker push ${IMAGE_NAME}:${IMAGE_TAG}

run-server:
	python event_listener/main.py
