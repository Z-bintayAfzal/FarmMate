import json
from scraper import get_market_prices
from whats import send_whatsapp

def run_daily_messages():
    with open("subscribers.json") as f:
        contacts = json.load(f)

    prices = get_market_prices()

    message = f"🌾 Daily Market Update (Punjab)\n\n{prices}\n\n– FarmMate AI"

    for number in contacts:
        send_whatsapp(number, message)

if __name__ == "__main__":
    run_daily_messages()
