from fastapi import FastAPI
from anywhere.common.config import settings
from anywhere.users.controller import router as users_router
from anywhere.databases.controller import router as databases_router

app = FastAPI(title="DB-Anywhere", openapi_url=f"{settings.API_V1_STR}/openapi.json")

app.include_router(users_router, prefix=settings.API_V1_STR)
app.include_router(databases_router, prefix=settings.API_V1_STR)
