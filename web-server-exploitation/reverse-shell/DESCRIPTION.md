In the real world, it is extremely rare to find yourself with direct shell access to your target environment, even an unprivileged one.

After gaining an initial foothold through various vulnerabilities, you typically need a reliable means of achieving remote code execution.

Usually, you have two main options: `bind shells` and [reverse shell](https://wiki.ubuntu.com/ReverseShell). A `bind shell` opens a port on the target machine and waits for you to connect, but this approach has severe limitations. Firewalls typically block incoming connections, NAT makes direct connections impossible, and monitoring tools easily detect open ports.

A [reverse shell](https://wiki.ubuntu.com/ReverseShell), however, instead of you trying to *connect TO the target*, *the target connects to YOU*. The compromised system reaches out through the firewall (outbound connections are usually allowed), bypasses NAT restrictions, and establishes the connection from the inside out.

It's like having the fortress call you with the keys, rather than trying to break down the front gate.

---

**NOTE:**
This challenge automatically starts the server with the `/reverse` endpoint waiting for you to trigger a reverse shell connecting to `localhost` on port `1337`.

**RESOURCES:**

- [What Is a Reverse Shell?](https://www.imperva.com/learn/application-security/reverse-shell/)
- [Reverse Shell vs Bind Shell](https://www.darkrelay.com/post/bind-and-reverse-shells/)
- [Reverse Shell Generator](https://www.revshells.com/)
