In the last challenge, you could reach the target's listening port. Now suppose a firewall allows new incoming connections only to the web port, `443`, while permitting the server to make outgoing connections. The website is reachable, but a bind shell listening on `1337` is not.

With a *reverse shell*, you run the listener and the target connects back with its shell attached. A stateful firewall can allow traffic in both directions over that established connection while still rejecting new incoming connections to other ports. Your listener must be reachable from the target, and the target must be allowed to connect to it.

The challenge server is already trying to connect to `127.0.0.1` on TCP port `1337`. Check Netcat's help for its listening option and start it in the challenge terminal. Once the connection arrives, use the shell to read `/flag`.
