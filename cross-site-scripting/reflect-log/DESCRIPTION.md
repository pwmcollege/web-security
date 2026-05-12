The ability to read a server's log is powerful.

The victim visits whatever URL you hand them, but before they do, they get a cookie containing the flag. The cookie is readable from JavaScript on `challenge.internal`.

You cannot exfiltrate to an external server because the victim is air-gapped, but the server is still right there logging every request that comes in. Anything that reaches the access log is something you can read.

---

### Challenge Environment

In this challenge, the server and the victim are isolated inside an ***air-gapped™*** network namespace. This means the victim cannot access any external URLs or services outside that namespace—its only reachable destination is the server itself.
