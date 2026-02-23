# Mesh Editing

## Mesh Segmentation

```
POST https://api.tripo3d.ai/v2/openapi/task
```

### Request

- type: Must be set to mesh_segmentation.
- model_version (Optional): Model version. Available versions are as below:  v1.0-20250506
- original_model_task_id: The task_id of a previous task.  Only the task IDs of the tasks below are supported:  text_to_model  image_to_model  multiview_to_model  texture_model  refine_model  import_model  highpoly_to_lowpoly

### Response

- task_id: The identifier for the successfully submitted task.

### Behaviour

Once the task moves out of the waiting queue, it typically completes within several minutes. After this operation, it will separate the whole model in parts based on the type and shape of it. After segmentation and importing into 3D editing software, like Blender, you will see part names in collection area.

### Example

Request:

```bash
export APIKEY="tsk_***"
curl https://api.tripo3d.ai/v2/openapi/task 
-H 'Content-Type: application/json' 
-H "Authorization: Bearer ${APIKEY}" 
-d '{
	"type": "mesh_segmentation",
	"original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}'
unset APIKEY
```

```python
import requests

api_key = "tsk_***"
url = "https://api.tripo3d.ai/v2/openapi/task"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

data = {
    "type": "mesh_segmentation",
    "original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}

response = requests.post(url, headers=headers, json=data)

print(response.json())
```

```go
package main

import (
        "bytes"
        "fmt"
        "net/http"
)

func main() {
        apiKey := "tsk_***"
        url := "https://api.tripo3d.ai/v2/openapi/task"

        payload := []byte(`{
                "type": "mesh_segmentation",
                "original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
        }`)

        req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
        if err != nil {
                fmt.Println("Error creating HTTP request:", err)
                return
        }

        req.Header.Set("Content-Type", "application/json")
        req.Header.Set("Authorization", "Bearer "+apiKey)

        client := &http.Client{}
        resp, err := client.Do(req)
        if err != nil {
                fmt.Println("Error sending HTTP request:", err)
                return
        }
        defer resp.Body.Close()

        // Read and print the response body
        buf := new(bytes.Buffer)
        buf.ReadFrom(resp.Body)
        fmt.Println(buf.String())
}
```

```javascript
const apiKey = 'tsk_***'
const url = 'https://api.tripo3d.ai/v2/openapi/task'

const data = {
	"type": "mesh_segmentation",
	"original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
}

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, info: ${response.statusText}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

Response:

```json
{
  "code": 0,
  "data": {
    "task_id": "1ec04ced-4b87-44f6-a296-beee80777941"
  }
}
```

## Mesh Completion

```
POST https://api.tripo3d.ai/v2/openapi/task
```

### Request

- type: Must be set to mesh_completion.
- model_version (Optional): Model version. Available versions are as below:  v1.0-20250506
- part_names(Optional): The list of part names referred from Mesh Segmentation, the default value will be all part names generated from segmentation.
- original_model_task_id: The task_id of a previous task.  Only the task IDs of the tasks below are supported:  mesh_segmentation

### Response

- task_id: The identifier for the successfully submitted task.

### Behaviour

Once the task moves out of the waiting queue, it typically completes within a few seconds.

### Example

Request:

```bash
export APIKEY="tsk_***"
curl https://api.tripo3d.ai/v2/openapi/task 
-H 'Content-Type: application/json' 
-H "Authorization: Bearer ${APIKEY}" 
-d '{
	"type": "mesh_completion",
	"original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}'
unset APIKEY
```

```python
import requests

api_key = "tsk_***"
url = "https://api.tripo3d.ai/v2/openapi/task"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

data = {
    "type": "mesh_completion",
    "original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}

response = requests.post(url, headers=headers, json=data)

print(response.json())
```

```go
package main

import (
        "bytes"
        "fmt"
        "net/http"
)

func main() {
        apiKey := "tsk_***"
        url := "https://api.tripo3d.ai/v2/openapi/task"

        payload := []byte(`{
                "type": "mesh_completion",
                "original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
        }`)

        req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
        if err != nil {
                fmt.Println("Error creating HTTP request:", err)
                return
        }

        req.Header.Set("Content-Type", "application/json")
        req.Header.Set("Authorization", "Bearer "+apiKey)

        client := &http.Client{}
        resp, err := client.Do(req)
        if err != nil {
                fmt.Println("Error sending HTTP request:", err)
                return
        }
        defer resp.Body.Close()

        // Read and print the response body
        buf := new(bytes.Buffer)
        buf.ReadFrom(resp.Body)
        fmt.Println(buf.String())
}
```

```javascript
const apiKey = 'tsk_***'
const url = 'https://api.tripo3d.ai/v2/openapi/task'

const data = {
	"type": "mesh_completion",
	"original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
}

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, info: ${response.statusText}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

Response:

```json
{
  "code": 0,
  "data": {
    "task_id": "1ec04ced-4b87-44f6-a296-beee80777941"
  }
}
```

## Smart LowPoly

```
POST https://api.tripo3d.ai/v2/openapi/task
```

### Request

- type: Must be set to highpoly_to_lowpoly.
- original_model_task_id: The task_id of a previous task.  Only the task IDs of the tasks below are supported:  text_to_model  image_to_model  multiview_to_model  texture_model  refine_model  import_model  mesh_segmentation  mesh_completion
- model_version (Optional): Model version. Available versions are as below:  P-v2.0-20251225 P-v1.0-20250506 (Deprecated)
- quad: Determined if the final model generated in quad or triangle face, the default value is false.
- part_names(optional): The list of part names referred from Mesh Segmentation, the default value is empty.
- face_limit(optional): Determined the amount of face for model when generation, range from 1000 to 20000.
- bake(optional): When set to true, the model will be baked when generation, the default value is true.

### Response

- task_id: The identifier for the successfully submitted task.

### Behaviour

Once the task moves out of the waiting queue, it typically completes within a few seconds.

### Example

Request:

```bash
export APIKEY="tsk_***"
curl https://api.tripo3d.ai/v2/openapi/task 
-H 'Content-Type: application/json' 
-H "Authorization: Bearer ${APIKEY}" 
-d '{
	"type": "highpoly_to_lowpoly",
	"original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}'
unset APIKEY
```

```python
import requests

api_key = "tsk_***"
url = "https://api.tripo3d.ai/v2/openapi/task"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

data = {
    "type": "highpoly_to_lowpoly",
    "original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}

response = requests.post(url, headers=headers, json=data)

print(response.json())
```

```go
package main

import (
        "bytes"
        "fmt"
        "net/http"
)

func main() {
        apiKey := "tsk_***"
        url := "https://api.tripo3d.ai/v2/openapi/task"

        payload := []byte(`{
                "type": "highpoly_to_lowpoly",
                "original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
        }`)

        req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
        if err != nil {
                fmt.Println("Error creating HTTP request:", err)
                return
        }

        req.Header.Set("Content-Type", "application/json")
        req.Header.Set("Authorization", "Bearer "+apiKey)

        client := &http.Client{}
        resp, err := client.Do(req)
        if err != nil {
                fmt.Println("Error sending HTTP request:", err)
                return
        }
        defer resp.Body.Close()

        // Read and print the response body
        buf := new(bytes.Buffer)
        buf.ReadFrom(resp.Body)
        fmt.Println(buf.String())
}
```

```javascript
const apiKey = 'tsk_***'
const url = 'https://api.tripo3d.ai/v2/openapi/task'

const data = {
	"type": "highpoly_to_lowpoly",
	"original_model_task_id": "19f4256a-80b7-4cdf-956c-dea802e4d11a",
}

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
}

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, info: ${response.statusText}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

Response:

```json
{
  "code": 0,
  "data": {
    "task_id": "1ec04ced-4b87-44f6-a296-beee80777941"
  }
}
```

## Errors

| HTTP STATUS CODE | ERROR CODE | DESCRIPTION | SUGGESTION |
|---|---|---|---|
| 429 | 2000 | You have exceeded the limit of generation | Please retry later. For more infomation, please refer to Generation Rate Limit. |
| 404 | 2001 | Task not found. | The original model task does not exist or does not belong to the current user. |
| 400 | 2002 | The task type is unsupported. | Please check if you passed the correct task type. |
| 400 | 2006 | The type of the input original task is invalid. | Please provide a valid task. |
| 400 | 2007 | The status of the original task is not success. | Use a successful original model task. |
| 403 | 2010 | You need more credits to start a new task. | Please reivew your usage at Billing and purchase more credits. |
| 400 | 2018 | The model is too complex to remesh | Try another model |