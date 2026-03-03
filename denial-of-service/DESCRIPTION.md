Modern systems are built to be available. Web servers respond to requests, APIs process data, and services remain online so users can access them at any time.

But what happens when availability itself becomes the target?

A [Denial of Service (DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack aims to render a system, application, or network unavailable for legitimate users. The attacker doesn't steal data or run code; instead, they use up resources like CPU, memory, bandwidth, file descriptors, or application limits until the service slows down or stops responding completely.

Sometimes this is done by overwhelming a system with traffic. Other times, it's achieved by triggering expensive operations, exploiting inefficient code paths, or abusing logical flaws that consume excessive resources.

When many machines coordinate the attack, it becomes a [Distributed Denial of Service (DDoS)](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

At its core, [DoS](https://en.wikipedia.org/wiki/Denial-of-service_attack) is about imbalance: forcing a system to spend more resources handling malicious input than it can sustain.

In this module, you'll explore how availability can be disrupted, why resource management matters, and how seemingly small inefficiencies can escalate into full service outages.

Let's stress the [system](https://pwn.college).
