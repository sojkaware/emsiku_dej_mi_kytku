# Upload

Endpoint overview:

```
POST https://api.tripo3d.ai/v2/openapi/upload/sts
```

## Upload Image

### Request

The request body should be in multipart form and Content-Type in the HTTP Header should be multipart/form-data

- file: The image you would like to upload. Accepted file types are webp,jpeg and png only. The resolution of image must be between 20px and 6000px. The suggested resolution should be more than 256px.

### Response

- image_token: The identifier returned for the successfully uploaded image.

### Behaviour

The upload process typically completes within a few seconds.

### Example

Request:

```bash
export APIKEY="tsk_***"
curl -X POST 'https://api.tripo3d.ai/v2/openapi/upload/sts' 
-H 'Content-Type: multipart/form-data' 
-H "Authorization: Bearer ${APIKEY}" 
-F "file=@cat.jpeg"
unset APIKEY
```

```python
import requests

api_key = "tsk_***"
url = "https://api.tripo3d.ai/v2/openapi/upload/sts"

headers = {
    "Authorization": f"Bearer {api_key}"
}

file_path = 'cat.jpeg'

with open(file_path, 'rb') as f:
    files = {'file': (file_path, f, 'image/jpeg')}
    response = requests.post(url, headers=headers, files=files)

print(response.json())
```

```go
package main

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func main() {
	apiKey := "tsk_***"
	url := "https://api.tripo3d.ai/v2/openapi/upload/sts"

	// open file
	filePath := "cat.jpeg"
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	//create multipart writer
	var requestBody bytes.Buffer
	multiPartWriter := multipart.NewWriter(&requestBody)


	filePart, err := multiPartWriter.CreateFormFile("file", filePath)
	if err != nil {
		fmt.Println("Error creating form file:", err)
		return
	}

	// write file to filePart
	_, err = io.Copy(filePart, file)
	if err != nil {
		fmt.Println("Error copying file:", err)
		return
	}

	// close writer
	multiPartWriter.Close()

	// make request
	req, err := http.NewRequest("POST", url, &requestBody)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// set headers
	req.Header.Set("Content-Type", multiPartWriter.FormDataContentType())
	req.Header.Set("Authorization", "Bearer "+apiKey)

	// send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	// read response
	respBody := new(bytes.Buffer)
	respBody.ReadFrom(resp.Body)
	fmt.Println("Response status:", resp.StatusCode)
	fmt.Println("Response body:", respBody.String())
}
```

```javascript
import fs from 'fs';

const apiKey = "tsk_***";
const url = "https://api.tripo3d.ai/v2/openapi/upload/sts";

const filePath = 'cat.jpeg';

async function uploadImage() {
  try {
    const buffer = fs.readFileSync(filePath);
    const formData = new FormData();
    formData.append('file', new Blob([buffer], { type: 'image/jpeg' }));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
        console.log (response);
      throw new Error(`Error uploading image: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response JSON:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

uploadImage();
```

Response:

```json
{
  "code": 0,
  "data": {
    "image_token": "ce85f375-3ccc-440b-b847-571588872ec2"
  }
}
```

### Errors

| HTTP STATUS CODE | ERROR CODE | DESCRIPTION | SUGGESTION |
|---|---|---|---|
| 429 | 2000 | You have exceeded the limit of generation. | Please retry later. For more infomation, please refer to Generation Rate Limit. |
| 400 | 2002 | The task type is unsupported. | Please check if you passed the correct task type. |
| 400 | 2003 | The input file is empty. | Please check if you passed file, or it may be rejected by our firewall. |
| 400 | 2004 | The file type is unsupported. | Please check if the file you input is supported. |