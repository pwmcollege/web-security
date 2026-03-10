Web payloads are not limited to strings. Encode an entire ELF executable into a query parameter and have the server execute it.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server accepts a request at `https://challenge.internal/?elf=...` where `elf` is a URL-safe base64 encoding of the ELF bytes.

Read the server's source code at `/challenge/server`, build an ELF payload, encode it, send it over HTTP, and use the resulting execution primitive to retrieve the flag.
