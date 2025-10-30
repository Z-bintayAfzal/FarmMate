import requests
import json

API_KEY = "AIzaSyCLMWw_BR74wm9MMEnmcV1ax0HoZFvgOYo"
MODEL = "models/gemini-2.5-flash"  # ✅ Working model

url = f"https://generativelanguage.googleapis.com/v1beta/{MODEL}:generateContent?key={API_KEY}"

payload = {
    "contents": [
        {
            "parts": [
                {"text": "Hello Gemini! Can you confirm you're working correctly?"}
            ]
        }
    ]
}

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()
    data = response.json()

    print("\n✅ Gemini test successful!")
    print("Response:\n", data["candidates"][0]["content"]["parts"][0]["text"])

except requests.exceptions.RequestException as e:
    print("\n❌ Gemini test failed.")
    print("Error:", e)
    print("Response text:", response.text if 'response' in locals() else "No response")
