The compression bomb showed how a tiny payload can decompress into something gigantic. This is the same idea, but the amplification comes from the **parser**, not the encoding.

The server has a small template language. Send `{"$repeat": [n, inner]}` and the server expands `inner` n times. Nest a few of these and the output grows multiplicatively. Three layers of `$repeat: [1024, ...]` produces over a billion characters from a few hundred bytes of input.

Body size is capped at **16 KB**. The compression-bomb defense doesn't catch this one. The request really is small. Only the **result** of parsing it is huge.

The endpoint here is `POST /render`. Get the server to detect a 1 GB+ expansion, and the watchdog will hand you the flag.
