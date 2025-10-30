import requests
import json

TOKEN = "YOUR_WHATSAPP_TOKEN"
PHONE_ID = "YOUR_PHONE_NUMBER_ID"

def send_whatsapp(to, text):
    url = f"https://graph.facebook.com/v20.0/{PHONE_ID}/messages"

    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text}
    }

    res = requests.post(
        url,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {TOKEN}"},
        data=json.dumps(payload)
    )

    print(res.json())
