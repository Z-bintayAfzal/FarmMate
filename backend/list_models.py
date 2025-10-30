import os
import requests
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={GEMINI_API_KEY}"
res = requests.get(url)
res.raise_for_status()
data = res.json()

print("✅ Available models for your key:\n")
for model in data.get("models", []):
    print("-", model["name"])
