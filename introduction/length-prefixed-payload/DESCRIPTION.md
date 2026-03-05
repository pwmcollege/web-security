Length checks can look simple until bytes and characters disagree.

A value that appears to be 4 characters might actually be 5 bytes, and strict parsers care about bytes.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server is listening for a request at `https://challenge.internal` endpoint accepting `blob` argument.

Read the server's source code at `/challenge/server`, build a valid length-prefixed payload, and retrieve the flag.
