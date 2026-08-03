A URL parser sorts every byte into one of two piles: content, or punctuation. `&` marks the end of one parameter, `=` divides a name from its value, and the moment the parser spots one it splits the string right there, whether or not that's what you meant.

That's fine until the value you actually need to deliver is built out of those very bytes. Send them raw and your input gets sliced apart before the server ever sees it whole.

The server is already up, and it reads a `payload` argument. Check `/challenge/server` to see what it expects. Your job is to smuggle your delimiter bytes all the way into `payload` without the parser prying them loose along the way.
