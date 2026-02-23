# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///

import requests
import time
import json
import sys
import os

API_KEY = os.environ.get("TRIPO_API_KEY")
if not API_KEY:
    print("Error: TRIPO_API_KEY environment variable not set.")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}"
}

def upload_image(file_path):
    print(f"Uploading {file_path}...")
    url = "https://api.tripo3d.ai/v2/openapi/upload/sts"
    with open(file_path, 'rb') as f:
        files = {'file': (file_path, f, 'image/jpeg')}
        response = requests.post(url, headers=HEADERS, files=files)
        response.raise_for_status()
        data = response.json()
        return data['data']['image_token']

def create_task(file_token):
    print("Creating image_to_model task...")
    url = "https://api.tripo3d.ai/v2/openapi/task"
    headers = HEADERS.copy()
    headers['Content-Type'] = 'application/json'
    
    payload = {
        "type": "image_to_model",
        "file": {
            "type": "jpg",
            "file_token": file_token
        },
        "model_version": "v3.0-20250812",
        "geometry_quality": "standard",
        "texture_quality": "standard",
        "smart_low_poly": True,
        "face_limit": 5000
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    return data['data']['task_id']

def poll_task(task_id):
    url = f"https://api.tripo3d.ai/v2/openapi/task/{task_id}"
    while True:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        data = response.json()['data']
        status = data['status']
        progress = data.get('progress', 0)
        print(f"Status: {status}, Progress: {progress}%")
        
        if status == 'success':
            output = data.get('output', {})
            return output.get('model') or output.get('pbr_model') or output.get('base_model')
        elif status in ['failed', 'cancelled', 'banned', 'expired', 'unknown']:
            print(f"Task failed with status: {status}")
            sys.exit(1)
            
        time.sleep(5)

def download_model(model_url, output_path):
    print(f"Downloading model to {output_path}...")
    response = requests.get(model_url)
    response.raise_for_status()
    with open(output_path, 'wb') as f:
        f.write(response.content)
    print("Done!")

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Generate 3D model from image using Tripo3D API")
    parser.add_argument("image_path", help="Path to the input image")
    parser.add_argument("output_path", help="Path to save the generated GLB model")
    args = parser.parse_args()

    try:
        file_token = upload_image(args.image_path)
        print(f"File token: {file_token}")
        
        task_id = create_task(file_token)
        print(f"Task ID: {task_id}")
        
        model_url = poll_task(task_id)
        print(f"Model URL: {model_url}")
        
        download_model(model_url, args.output_path)
        
    except Exception as e:
        print(f"Error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(e.response.text)

if __name__ == "__main__":
    main()
