Welcome to the dojo. Before you break anything, get a feel for where you're standing.

Every challenge here runs inside a container that you have a shell in too. That's not how the real world works, and that's exactly the point: for once you get to see the target from both sides. From in here, the web app is just a program on disk. Its source sits at `/challenge/server`, it shows up in `ps`, and it reads files your own account can't touch.

Nothing's running yet, though. Start it:

```bash
/challenge/server
```

It'll hold that terminal for as long as it's up, so leave it alone and open a second one:

```bash
curl -k https://challenge.internal
```

The `-k` tells curl to stop fretting about the challenge's self-signed certificate. The flag's on the page that comes back.

There's no proxy in front of the server this time, so the [Challenge](https://pwn.college/workspace/80) interface won't reach it. If you'd rather use a real browser, there's one waiting in the [Desktop workspace](https://pwn.college/workspace/desktop).
