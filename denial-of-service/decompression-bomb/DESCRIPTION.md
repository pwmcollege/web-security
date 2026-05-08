The earlier challenges all assumed the **size of the request** was a meaningful signal. Cap the body, and you cap the damage.

This server caps the body too. `Content-Length` is limited to **2 MB**. But it also accepts gzip-encoded bodies, and decodes them with a streaming decompressor. As soon as the decompressed total crosses **1 GB**, the server kills itself rather than let things go further.

A small, well-crafted compressed payload can decompress into something thousands of times its size. The lesson: a length cap on the wire doesn't tell you anything about the cost of what's inside.

The endpoint here is `POST /upload`. Get the server to detect a 1 GB+ payload, and the watchdog will hand you the flag.
