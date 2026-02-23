# Wallet

## Balance

```
GET https://api.tripo3d.ai/v2/openapi/user/balance
```

### Response

- balance: The balance of the user’s api wallet.
- frozen: The frozen balance of the user’s api wallet. When a task is running or a transaction is pending, there will be a non-zero frozen balance.

### Behaviour

Once the GET request is sent, the result will be returned immediately.

### Example

Request:

```bash
export APIKEY="tsk_***"
curl https://api.tripo3d.ai/v2/openapi/user/balance 
-H 'Content-Type: application/json' 
-H "Authorization: Bearer ${APIKEY}"
unset APIKEY
```

```python
import requests

api_key = "tsk_***"
url = "https://api.tripo3d.ai/v2/openapi/user/balance"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

response = requests.get(url, headers=headers)

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
	url := "https://api.tripo3d.ai/v2/openapi/user/balance"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating HTTP request:", err)
        return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer "+apiKey))

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

Response:

```json
{
  "code": 0,
  "data": {
    "balance": 99900,
    "frozen": 0
  }
}
```

## Errors

| HTTP STATUS CODE | ERROR CODE | DESCRIPTION | SUGGESTION |
|---|---|---|---|
| 500 | 1001 | Fatal error on server side | Please contact the support with request id |