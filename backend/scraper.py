import requests
from bs4 import BeautifulSoup

def get_market_prices():
    url = "https://www.pmasmarket.com/price"   # Example site
    html = requests.get(url).text
    soup = BeautifulSoup(html, "html.parser")

    prices = []

    rows = soup.select("table tr")
    for r in rows[1:]:
        cols = r.find_all("td")
        if len(cols) >= 3:
            crop = cols[0].text.strip()
            min_price = cols[1].text.strip()
            max_price = cols[2].text.strip()
            prices.append(f"{crop}: Rs {min_price} - {max_price}")

    return "\n".join(prices)
