# backend/app/api/gemini_ai.py
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os, traceback
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()  # loads .env file
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ask-ai/")
async def ask_ai(req: PromptRequest):
    try:
        # Use the correct model name here:
        model = genai.GenerativeModel("models/chat-bison@001")

        # Generate content (sync call)
        response = model.generate_content(req.prompt)

        return {"response": response.text}

    except Exception as e:
        print("Gemini error:", e)
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"response": f"Server error: {str(e)}"},
        )
