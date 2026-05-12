Last challenge showed that threads can be defeated by **shared I/O**. This one removes I/O from the picture entirely.

The body size is capped at 4 KB, the handler doesn't touch the disk, and the input is just a string. No tempfiles, no buffers to fill.

What's left is pure **computation**. Threads only help when there's something to wait for, and there's nothing to wait for here. Every request the server accepts has to take CPU time from something else, including the watchdog.

The endpoint here is `POST /match`. It runs a regex on whatever string you send. Find an input that makes the regex expensive, and a few requests are enough to pin the server.