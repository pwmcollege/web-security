Up until now, every challenge gave you something to make the server **do**: parse a body, decompress, run a regex, write to disk. This one doesn't.

The server runs **one worker with 4 threads**. The only endpoint is `/health`. There's no body, no parsing, no computation. From inside the handler, there is nothing slow to trigger.

But every connection still has to be **read** before it can be served. While a thread is waiting on bytes from the socket, it can't do anything else.

You don't need to ask the server to do anything. You just need to refuse to finish talking.
