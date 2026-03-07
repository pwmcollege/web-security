In real systems, the bug is not always kind enough to hand you the secret outright. Sometimes all that is left is a tiny clue: a response that is a little slower. Even one single bit of information at a time can be enough.

That is the idea behind a [side channel](https://en.wikipedia.org/wiki/Side-channel_attack): leaking data through some secondary signal instead of the intended output. [Timing](https://en.wikipedia.org/wiki/Timing_attack) is one of the most common examples.

Creatively leak the flag.

---

### Challenge Environment

In this challenge, the server and the victim are isolated inside an ***air-gapped™*** network namespace. This means the victim cannot access any external URLs or services outside that namespace—its only reachable destination is the server itself.
