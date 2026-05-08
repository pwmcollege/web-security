This server has a new endpoint: `POST /hello`. It accepts JSON, and the handler reads the entire body before doing anything with it.

There's no cap on the request size. Whatever you send, the server has to hold somewhere, and memory isn't infinite. When a process runs out, it can't keep responding.

Push the server past what it can hold, and the watchdog will hand you the flag.
