When you send a command or other data through a URL, the query parser may interpret part of it as URL syntax. Suppose you want to send `fish&chips` as the value of `order`. In `/?order=fish&chips`, a typical query parser takes `&` as the start of another parameter, leaving `order` with just `fish`.

*Percent-encoding* represents a byte as `%` followed by two hexadecimal digits. Writing the ampersand as `%26` gives `/?order=fish%26chips`: the parser splits the parameters before decoding the values, so `order` contains `fish&chips`. A literal `%` is encoded as `%25`.

Other characters need care too. In query parameters, `+` represents a space, so a literal plus must be encoded as `%2B`. Spaces can also be encoded as `%20`. A `#` starts a URL fragment, which the client does not send to the server. Encode it as `%23` when it belongs in the value.

Read `/challenge/server` to find the expected order, then send a percent-encoded version as the sole `order` query parameter in a GET request to `https://challenge.internal/` to retrieve the flag. Extra or repeated query parameters are rejected. The server compares the decoded order, so every character must survive URL parsing and percent-decoding. When using a shell, quote the URL so it doesn't interpret the payload as its special characters.
