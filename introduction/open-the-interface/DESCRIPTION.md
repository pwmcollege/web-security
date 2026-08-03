Inside the container, you could talk to the server directly. In the real world you can't, so this challenge makes you reach it the way an outside attacker would.

An nginx proxy now sits in front of the server on port 80, and the dojo exposes that port as the [Challenge](https://pwn.college/workspace/80) interface, in the bottom-left menu. That's your way in.

The direct route is closed: `curl -k https://challenge.internal` from a terminal just returns connection refused, because the server only answers the proxy now. Open it in the browser, and the page will show you how the server saw your request, with the flag alongside it.
