In this challenge, you will map a token format into exact bytes: fixed fields in fixed positions plus a checksum.

You need to construct a byte-accurate structure that satisfies each validation step.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server is listening for a request at `https://challenge.internal` endpoint accepting `fp` argument.

Read the server's source code at `/challenge/server`, map the token format field-by-field, forge a valid binary token, and retrieve the flag.
