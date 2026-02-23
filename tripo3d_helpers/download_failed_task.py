# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///
import requests
import json
import time
import os
import sys

API_KEY = os.environ.get("TRIPO_API_KEY")
if not API_KEY:
    print("Error: TRIPO_API_KEY environment variable not set.")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}"
}

def poll_and_download(task_id, output_path):
    url = f"https://api.tripo3d.ai/v2/openapi/task/{task_id}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    data = response.json()['data']
    status = data['status']
    print(f"Status: {status}")
    
    if status == 'success':
        output = data.get('output', {})
        model_url = output.get('model') or output.get('pbr_model') or output.get('base_model')
        if not model_url:
            print("No model URL found in output!")
            return
        
        print(f"Downloading model to {output_path}...")
        resp = requests.get(model_url)
        resp.raise_for_status()
        with open(output_path, 'wb') as f:
            f.write(resp.content)
        print("Done!")
    else:
        print(f"Task status is not success: {status}")

if __name__ == "__main__":
    poll_and_download("c9047045-4c58-40f7-97d6-ce46a2043b8d", "3d_models/flower.glb")
