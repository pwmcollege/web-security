Servers have limits: CPU, memory, bandwidth, open connections, file descriptors. A [Denial of Service (DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack doesn't steal data or run code. It just spends those limits until the service stops keeping up with real users.

Sometimes that takes a flood of traffic. Other times it's one cheap request that costs the server far more to answer than it cost you to send. Point enough machines at one target and it becomes a [Distributed Denial of Service (DDoS)](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

Each challenge gives you a small service with a status page pinging it once a second. Keep the service from answering long enough and the page marks it down. What changes from one challenge to the next is how the service is built, and that decides what it takes to knock it over.
