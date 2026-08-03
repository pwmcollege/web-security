Every challenge so far gave the server something to do once your request arrived. This one doesn't. There's a single worker with four threads, one endpoint at `/health`, and nothing behind it worth triggering. No body to parse, no work to run.

But a thread can't answer a request until it has finished reading it, and reading happens at whatever pace the client sends. A thread stuck waiting on bytes that trickle in one at a time isn't free to do anything else, the status page's check included.

There are four threads. You don't have to make the server compute anything. You just have to keep it listening.
