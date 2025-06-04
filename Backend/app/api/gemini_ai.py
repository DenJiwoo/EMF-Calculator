from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import traceback
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv(dotenv_path="../.env")
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env")

# Initialize Gemini client globally
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ask-ai/")
async def ask_ai(req: PromptRequest):
    try:
        response = model.generate_content(req.prompt)
        return {"response": response.text}
    except Exception as e:
        print("Gemini error:", e)
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"response": f"Server error: {str(e)}"}
        )
