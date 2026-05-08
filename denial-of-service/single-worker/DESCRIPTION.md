A [Denial of Service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack doesn't always need a flood of traffic. Sometimes one well-placed request is enough to keep a server from doing anything else.

In this challenge, the server runs **one worker with one thread**. While that worker is busy with a request, no one else gets in.

Your goal is to keep the server from responding to its own watchdog. After enough failed health checks in a row, the watchdog will print the flag.
