Web payloads are not limited to strings. Transmit an entire ELF executable as raw bytes and have the server execute it.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server accepts a `POST` request at `https://challenge.internal` with the raw ELF bytes in the request body.

Read the server's source code at `/challenge/server`, build an ELF payload, send it over HTTP, and use the resulting execution primitive to retrieve the flag.
