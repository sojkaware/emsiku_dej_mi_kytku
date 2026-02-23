# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///
import requests
import os
import sys

API_KEY = os.environ.get("TRIPO_API_KEY")
if not API_KEY:
    print("Error: TRIPO_API_KEY environment variable not set.")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}"
}

def main():
    response = requests.get("https://api.tripo3d.ai/v2/openapi/user/balance", headers=HEADERS)
    print(response.json())

if __name__ == "__main__":
    main()
