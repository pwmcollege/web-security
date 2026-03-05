In a highly unrealistic scenario where you have an unprivileged shell (like the pwn.college environment), the server runs as root, and you have an arbitrary-write primitive on the server. The first instinct would be to pop a shell or a reverse shell to maintain your prolonged access.

But what if you only need it to do one single thing? What if you don't want a shell but want to read a certain file?

---

### Challenge Environment

In this challenge, the server is automatically started; you can access the website at: `https://challenge.internal`

The server is listening for a request at `https://challenge.internal/execvp` endpoint accepting `cmd` argument.

Read the server's source code at `/challenge/server` and creatively get the flag.
