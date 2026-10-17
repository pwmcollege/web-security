Let's start with a server that has almost nothing to do. At `https://victim.internal/`, the `/health` handler simply returns `OK`. We've given it one synchronous Gunicorn worker, which handles one request at a time, from reading it to sending a response.

That includes time spent waiting for you to send the rest of a request. While it waits, the monitor's health check gets stuck behind your request. A client that barely sends anything can keep the whole service to itself! Keep that worker occupied long enough for the challenge status page to mark the service down.
