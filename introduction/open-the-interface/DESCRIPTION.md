Last challenge you talked to the server from inside its own container. That's a luxury you won't usually get.

Out here it's a different story. An nginx proxy sits in front of the server on port 80, and the dojo publishes that port at the [Challenge](https://pwn.college/workspace/80) interface, in the menu at the bottom-left. That's your way in now.

Try `curl -k https://challenge.internal` from a terminal and you'll get "Connection refused" for your trouble. This one only talks to the proxy.

Open it in the browser instead. The page will tell you what the server made of your request, and the flag's in there too.
