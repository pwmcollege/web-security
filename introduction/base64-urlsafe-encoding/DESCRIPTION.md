You've sent a short value through a URL. What if you want to send an entire ELF executable, with null bytes and other non-printable data? This server will run a program you supply, but the whole file has to arrive in a URL.

Those bytes can still be percent-encoded, but escaping a byte takes three characters. For this much binary data, base64 is a convenient alternative: each group of three bytes becomes four printable characters.

Here the server uses Flask's parsed query parameters, so a literal `+` becomes a space. Any `+` in standard base64 would need to be sent as `%2B`. URL-safe base64 avoids that extra step by replacing `+` and `/` with `-` and `_`:

```pycon
>>> import base64
>>> base64.b64encode(b"\xfb\xff")
b'+/8='
>>> base64.urlsafe_b64encode(b"\xfb\xff")
b'-_8='
```

Encode your executable with URL-safe base64 and send it in the `elf` query parameter of a GET request to `https://challenge.internal/`. The decoded executable must be no larger than 1 MiB. The server applies a two-second execution timeout.

The server returns the program's standard output and standard error in the `stdout` and `stderr` fields of its JSON response. A nonzero exit status returns HTTP 400 with both fields. Send a program that reads `/flag` and prints it.
