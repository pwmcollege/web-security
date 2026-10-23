A request that arrives promptly can still leave the server struggling to serve anyone else. Once the application starts processing the input, it needs memory to hold the data and whatever it builds from it. A short handler can make several substantial allocations before it has an answer ready.

The new `POST /log` endpoint accepts JSON with a `message` field and writes the entry to a temporary file. To do that, it reads the body, parses it into Python objects, and serializes those objects back into text. The raw request data, parsed values, and output can coexist in memory, so the number of bytes sent over the connection does not tell the whole story.

Read `/challenge/wsgi.py` and follow the data through the handler. Choose log entries that make those allocations expensive enough to keep the service from answering the monitor.
