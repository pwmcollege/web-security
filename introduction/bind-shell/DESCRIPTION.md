Now that we learned about reverse shell, understanding bind shells is equally important for your foundational knowledge.

For `bind shell`, instead of having the target reach out to you, you connect to a listening port on the target machine.

This technique has its place in specific scenarios, perhaps you're already inside a trusted network where firewalls aren't blocking internal connections, or you're working in an environment where outbound connections are heavily monitored but internal traffic flows freely.

---

### Challenge Environment

The challenge files are located in `/challenge`.

To begin, start the web server: `/challenge/server`

Once running, you can access the website at: `https://challenge.internal`

In this challenge, the server is listening for a request at `https://challenge.internal/bind` endpoint in order to bind and start a shell at `localhost` on port `1337`.

---

### Resources

- [Reverse Shell vs Bind Shell](https://www.darkrelay.com/post/bind-and-reverse-shells/)
