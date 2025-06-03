from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import calculate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(calculate.router, prefix="/api")
