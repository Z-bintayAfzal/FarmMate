import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import re
from langdetect import detect, DetectorFactory

# Ensure consistent language detection
DetectorFactory.seed = 0

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app = FastAPI(title="FarmMate AI Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Detect language: Urdu vs others
def detect_language(text: str) -> str:
    try:
        lang = detect(text)
        return "ur" if lang == "ur" else "en"
    except:
        return "en"

@app.get("/")
def root():
    return {"message": "FarmMate backend is running ✅"}

@app.post("/ask")
async def ask_ai(request: Request):
    try:
        data = await request.json()
        question = data.get("question", "").strip()
        if not question:
            raise HTTPException(status_code=400, detail="⚠️ Please provide a question.")

        user_lang = detect_language(question)
        lang_name = "Urdu" if user_lang == "ur" else "English"

        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail="⚠️ GEMINI_API_KEY not found.")

        # Gemini Pro Model
        model_name = "gemini-pro"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"

        prompt_text = (
            f"You are FarmMate AI, an expert in farming. "
            f"Answer the following question clearly and practically in {lang_name}: {question}"
        )

        payload = {
            "contents": [{"parts": [{"text": prompt_text}]}],
            "generationConfig": {"temperature": 0.5, "maxOutputTokens": 500},
        }

        response = requests.post(url, json=payload, timeout=60)
        response.raise_for_status()
        result = response.json()

        # Extract text safely
        reply = "⚠️ No valid response from AI."
        candidates = result.get("candidates", [])
        if candidates and "content" in candidates[0]:
            parts = candidates[0]["content"].get("parts", [])
            if parts:
                reply = "".join([p.get("text", "") for p in parts if "text" in p]).strip()

        return {"reply": reply}

    except Exception as e:
        print("Backend Error:", e)
        raise HTTPException(status_code=500, detail=f"⚠️ Backend error: {str(e)}")
