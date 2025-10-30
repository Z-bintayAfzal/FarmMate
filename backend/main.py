import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langdetect import detect, DetectorFactory

# Ensure consistent language detection
DetectorFactory.seed = 0

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ✅ CRITICAL FIX: Change to gemini-2.0-flash as per your API Usage Dashboard
MODEL_NAME = "gemini-2.0-flash"

app = FastAPI(title="FarmMate AI Backend ✅")

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Detect language
def detect_language(text: str) -> str:
    try:
        lang = detect(text)
        return "ur" if lang == "ur" else "en"
    except:
        return "en"

@app.get("/")
def root():
    return {"message": "✅ FarmMate backend is running"}

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
            raise HTTPException(status_code=500, detail="⚠️ GEMINI_API_KEY missing in .env")

        # ✅ This URL will now correctly use "gemini-2.0-flash"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={GEMINI_API_KEY}"

        prompt = (
            f"You are FarmMate AI, an expert in farming. "
            f"Please answer in {lang_name}. "
            f"User question: {question}"
        )

        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.5,
                "maxOutputTokens": 500,
            },
        }

        # ✅ Debug print
        print(f"\n✅ USING MODEL: {MODEL_NAME}")
        print(f"✅ REQUEST URL: {url}")

        response = requests.post(url, json=payload, timeout=50)

        if response.status_code >= 400:
            print("❌ Gemini API Error:", response.text)
            raise HTTPException(status_code=500, detail="⚠️ Gemini API error")

        result = response.json()

        reply = "⚠️ No valid response."

        candidates = result.get("candidates", [])
        if candidates:
            content = candidates[0].get("content", {})
            parts = content.get("parts", [])
            if parts:
                reply = "".join(p.get("text", "") for p in parts).strip()

        return {"reply": reply}

    except Exception as e:
        print("🔥 Backend Error:", e)
        raise HTTPException(status_code=500, detail=f"⚠️ Backend error: {str(e)}")