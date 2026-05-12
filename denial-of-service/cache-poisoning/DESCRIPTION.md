Every challenge so far targeted one server. This one has two.

`proxy.internal` sits in front of `challenge.internal`. Requests go to the proxy first. If it has a stored response for that URL, it serves it directly and never contacts the backend at all.

The cache key is just the URL. Headers are not part of it. But headers are forwarded to the backend, and the backend cares about some of them.

Send the right header and the backend returns an error. The proxy caches it. Every subsequent request for that URL gets the cached error, no matter what headers it sends.

The watchdog now watches the proxy.
