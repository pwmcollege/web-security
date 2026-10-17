The file write at the end of the logging handler has a cost of its own. Even with enough memory to process individual entries, the filesystem has a finite capacity for handling their file operations. Letting more requests run at once does not make that capacity grow with them.

Gunicorn now uses 64 request-handling threads in a single process. Each accepted entry is written to a separate temporary file, so concurrent logging requests all draw on the same storage resources. A thread waiting for a file operation to finish cannot start another request. If enough threads are occupied this way, a quick request to `/health` can be left waiting for a thread of its own.

Use the logging endpoint to put that shared I/O capacity under sustained pressure. Consider both the work each entry causes and how many entries the server is processing together as you try to delay the monitor's health checks.
