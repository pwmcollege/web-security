HTTP messages are just bytes.

This challenge is about manually building an HTTP-style request message by hand.
You will construct request-line, headers, and body using exact `\r\n` boundaries, then compute a header value derived from the body bytes.

If your framing is off, parsing fails. If your computed value is wrong, validation fails.

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server is listening for a request at `https://challenge.internal` endpoint accepting `payload` argument.

Read the server's source code at `/challenge/server`, craft a valid CRLF-delimited HTTP-style message with a correct checksum header, and retrieve the flag.
