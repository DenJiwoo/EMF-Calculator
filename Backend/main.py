from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import calculate, gemini_ai

app = FastAPI()

# Register routers
app.include_router(gemini_ai.router, prefix="/api")
app.include_router(calculate.router, prefix="/api")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)