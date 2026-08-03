`victim.internal` runs on a single worker with a single thread. It holds exactly one request at a time and won't look at the next until the current one is finished.

The status page checks on it every second by asking for `/health`, and that check waits in the same line as everything else. So you don't have to flood this server. You just have to be the request it's still stuck on when the check comes around, and keep being it.

Tie it up for a few checks in a row and the page marks it down.
