Every challenge before this one gave you a way to talk to the server. This one doesn't.

The server is up. The watchdog can reach it. You can't. Your traffic on port 443 is dropped before it ever leaves your shell. There is no payload to send, no body to oversize, no header to drip. The HTTP attack surface is closed to you.

But you and the server are still **roommates**. You share the same CPU, the same memory, the same disk, the same kernel. You can run whatever you want as your own user.

You don't need to attack the service. You need to be a bad neighbor.
