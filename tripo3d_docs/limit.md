# Generation Rate Limit

We have a concurrency limit, which restricts the number of tasks that can be executed simultaneously.

| TASK TYPE | NUMBER |
|---|---|
| Refine Model | 5 |
| Other Task | 10 |

All task types are calculated seperately. For example, you can execute 9 text_to_model tasks and 9 image_to_model tasks at the same time.

For uploading images, we offer a 10 qps limitation.