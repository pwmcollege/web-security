Servers have limits. CPU, memory, bandwidth, open connections, file descriptors. A [Denial of Service (DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack doesn't steal anything or run code, it just burns those limits until the service stops keeping up with real users.

Sometimes that's a flood of traffic. Other times it's one cheap request that costs the server a lot. When many machines pitch in, it becomes a [Distributed Denial of Service (DDoS)](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

This module walks through how availability breaks and how small inefficiencies turn into full outages.
