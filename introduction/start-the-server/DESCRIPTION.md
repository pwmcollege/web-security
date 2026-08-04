Welcome to web security. Before you attack anything, get to know the ground you're standing on, because you have an advantage here that you won't get in the real world.

Every challenge runs inside a container, and you have a shell inside that same container. The web app isn't a distant black box, it's a local program: you can read its source at `/challenge/server`, find it in `ps`, and watch it open files your own user can't.

It isn't running yet. Start it like any other challenge, by running `/challenge/server`. It stays in the foreground while it runs, so open a second terminal to talk to it with `curl -k https://challenge.internal`. The `-k` lets curl accept the challenge's self-signed certificate. The flag is on the page it returns. There's no proxy in front of this one, so the [Challenge](https://pwn.college/workspace/80) interface can't reach it. If you'd rather use a browser, there's one in the [Desktop workspace](https://pwn.college/workspace/desktop).
