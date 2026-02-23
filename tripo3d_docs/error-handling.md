# Error Handling

## Common Errors

Below is a list of common errors not specific to any single endpoint. For errors related to a particular endpoint, please refer to the corresponding documentation.

| HTTP STATUS CODE | ERROR CODE | DESCRIPTION | SUGGESTION |
|---|---|---|---|
| 500 | 1000 | Unknown error. | Please contact the support team with the trace id. |
| 500 | 1001 | Fatal error. | Please contact the support team with the trace id. |
| 401 | 1002 | Unauthorized | Please ensure that the API key is still valid and that it has been entered in the correct format. |
| 400 | 1003 | The request is malformed. | Please check if the request body is json and matches the requirements of the endpoint. |
| 400 | 1004 | Bad parameter(s). | Please check if the request body matches the requirements of the endpoint. |
| 403 | 1005 | Forbidden. | Your request is rejected. Please ensure you have the authority to access the endpoint. |
| 429 | 1007 | General rate limit exceeded. | Please retry after a short delay. |
| 400 | 2013 | Invalid priority. | The priority value exceeds your permission level. Please use a lower priority value. |
| 500 | 2014 | Audit service error. | Content moderation service encountered an error. Please retry or contact support. |
| 400 | 2016 | Deprecated task type. | The task type you specified is no longer supported. Please use an alternative task type. |
| 400 | 2017 | Invalid model version. | The model_version parameter is invalid. Please check the available versions. |
| 404 | 2019 | File not found. | The referenced file does not exist in storage. Please verify the file reference. |