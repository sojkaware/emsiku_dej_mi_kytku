# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///
import requests
import json
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
    task_id = "c9047045-4c58-40f7-97d6-ce46a2043b8d"
    response = requests.get(f"https://api.tripo3d.ai/v2/openapi/task/{task_id}", headers=HEADERS)
    print(json.dumps(response.json(), indent=2))

if __name__ == "__main__":
    main()
