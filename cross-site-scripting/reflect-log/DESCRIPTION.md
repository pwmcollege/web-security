The ability to read a server's log is powerful.

When the victim runs, they pick up a [cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) containing the flag, and then visit whatever URL you handed them on `challenge.internal`. The cookie is readable from JavaScript on that origin.

You cannot exfiltrate it to an external server because the victim is air-gapped. But the server logs every request that comes in, and you can read its access log from your shell. Anything the victim's browser sends to the server ends up in the log.

---

### Challenge Environment

In this challenge, the server and the victim are isolated inside an air-gapped network namespace. This means the victim cannot access any external URLs or services outside that namespace, and its only reachable destination is the server itself.
