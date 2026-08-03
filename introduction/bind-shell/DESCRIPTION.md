A bind shell works the opposite way. The target opens a port and waits, and you connect to it.

That needs an open path from you to the target, which is the thing you usually don't have. So it's situational: useful when you're already inside the network, or when it's the outbound connections being watched and the inbound ones slip by.

The server is already up. Hit its `/bind` endpoint and it opens a shell on `localhost` port `1337`. Connect to it and grab the flag.
