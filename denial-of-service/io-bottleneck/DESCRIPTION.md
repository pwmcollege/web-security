The server now runs **one worker with 32 threads**. Threads share the same process, so requests can be handled concurrently without spinning up new processes for each one.

But concurrency only goes as far as the resources behind it. Threads still share the same disk, the same file descriptors, the same I/O. If the underlying work is expensive enough, more threads just means more contention.

The same `POST /hello` endpoint is here. When the server can't keep up with its own watchdog, you get the flag.
