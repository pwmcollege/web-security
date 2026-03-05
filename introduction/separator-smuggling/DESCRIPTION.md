Some characters are data. Some characters are delimiters.

When parsers see characters like `&` and `=`, they often split parameters instead of keeping them inside your payload. Reliable exploitation means controlling when special characters are interpreted and when they are preserved.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server is listening for a request at `https://challenge.internal` endpoint accepting `payload` argument.

Read the server's source code at `/challenge/server`, preserve delimiter bytes inside `payload`, and retrieve the flag.
