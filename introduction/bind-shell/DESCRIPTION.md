Now that we learned about reverse shell, understanding bind shells is equally important for your foundational knowledge.

For `bind shell`, instead of having the target reach out to you, you connect to a listening port on the target machine.

This technique has its place in specific scenarios, perhaps you're already inside a trusted network where firewalls aren't blocking internal connections, or you're working in an environment where outbound connections are heavily monitored but internal traffic flows freely.

---

**NOTE:**
This challenge automatically starts the server with the `/bind` endpoint waiting for you to trigger a reverse shell connecting to `localhost` on port `1337`.

**RESOURCES:**

- [Reverse Shell vs Bind Shell](https://www.darkrelay.com/post/bind-and-reverse-shells/)
