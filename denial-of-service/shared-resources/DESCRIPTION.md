Every challenge before this one let you talk to the service. This one cuts you off: anything your user sends toward `victim.internal` is dropped before it leaves the box. No slow request, no oversized body, no header to drip. The network path to it is closed.

But you're still on the same machine it is. Same CPU, same memory, same disk, same kernel, and you can run whatever you like as your own user. The service doesn't need you to reach it over the network to feel you.

Starve the box and you starve the service with it. Make `/health` miss enough checks in a row and you win.
