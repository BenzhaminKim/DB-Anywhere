from fastapi import FastAPI, Request, APIRouter, Depends
from logging import getLogger


def logging_dependency(request: Request):
    logger = getLogger()
    logger.debug(f"{request.method} {request.url}")
    for name, value in request.path_params.items():
        logger.debug(f"\t{name}: {value}")
    logger.debug("Headers:")
    for name, value in request.headers.items():
        logger.debug(f"\t{name}: {value}")
