One worker was easy to jam, so this service runs thirty-two of them, each its own process, all answering requests in parallel.

It buys less than it looks. Every worker is still synchronous: one request, start to finish, before it takes another. Thirty-two lanes are still thirty-two, and each one ties up the same way the single worker did last time.

Same goal. Just more of them to keep busy at once.
