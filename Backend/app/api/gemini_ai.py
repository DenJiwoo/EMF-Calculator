from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import traceback
from dotenv import load_dotenv
import google.generativeai as genai
import re

# Load environment variables
load_dotenv(dotenv_path="../.env")
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env")

# Initialize Gemini
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

# Mapping for superscript digits
SUPERSCRIPTS = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "-": "⁻", "+": "⁺"
}

def format_exponents(text: str) -> str:
    # Find patterns like 10^-19, 10^6, 10^+3
    def replace(match):
        exp = match.group(1)
        superscript = ''.join(SUPERSCRIPTS.get(char, char) for char in exp)
        return f"10{superscript}"

    return re.sub(r"10\^([-+]?\d+)", replace, text)

@router.post("/ask-ai/")
async def ask_ai(req: PromptRequest):
    try:
        system_instruction = (
            "Always use the electromagnetic force formula in the form: F = |q|·v·B·sin(ϕ), "
            "where |q| is the magnitude of charge, v is velocity, B is magnetic field, "
            "Avoid LaTeX formatting like $...$, \\boxed{...}, or math markup. "
            "Return your response in plain text."
            "Give a brief explanation the solution in the end in each problem you are given."
        )
        full_prompt = system_instruction + "\n\n" + req.prompt

        # Get raw response from Gemini
        response = model.generate_content(full_prompt)
        clean_text = response.text

        # Remove LaTeX patterns
        clean_text = re.sub(r"\$\s*\\boxed{([^}]*)}\s*\$", r"\1", clean_text)
        clean_text = re.sub(r"\$(.*?)\$", r"\1", clean_text)

        # Format exponents like 10^-19 => 10⁻¹⁹
        clean_text = format_exponents(clean_text)

        return {"response": clean_text}

    except Exception as e:
        print("Gemini error:", e)
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"response": f"Server error: {str(e)}"}
        )
