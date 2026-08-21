You rarely break into a system and find a shell waiting for you. A bug gets your foot in the door, one command you can run or one file you can write, and from there you have to build your way up to real control of the box.

What you're building toward is a shell that talks back to you, and there are two ways to wire one up. A bind shell has the target open a port and wait for you to connect, which falls apart the moment a firewall blocks the way in, NAT hides the target, or someone notices the open port. A reverse shell flips the direction: the target connects to you. Outbound traffic is usually trusted, so the machine slips out past the firewall and hands you a shell from the inside.

The server is already running, and it keeps trying to call home: once a second it dials out to `127.0.0.1` on port `1337`. Nothing answers until you do. Get a listener up on that port and catch the shell it throws you.
