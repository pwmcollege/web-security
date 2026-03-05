Input is often transformed before use.

Validation may run on one representation while the final comparison runs on another. If those stages disagree, payloads can change meaning mid-flight.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server is listening for a request at `https://challenge.internal` endpoint accepting `payload` argument.

Read the server's source code at `/challenge/server`, reason about multiple decoding stages, and retrieve the flag.
