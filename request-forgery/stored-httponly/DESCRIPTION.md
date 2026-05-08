***pwnpost™*** now supports http-only cookies!!!

`HttpOnly` keeps JavaScript from reading the cookie via `document.cookie`, but it doesn't change which requests the browser attaches the cookie to. Per [RFC 6265 §8.5](https://datatracker.ietf.org/doc/html/rfc6265#section-8.5), cookies are scoped by domain, not by port. A cookie set on one port of a host gets sent to every other port on that same host, HttpOnly or not.

So you can't read the cookie, but you can still ride it.

---

### Challenge Environment

In this challenge, you can access the website at: `http://challenge.localhost` after starting the server.

`challenge.localhost` is just a friendlier name for `localhost:80`. Any subdomain of `localhost` resolves back to `127.0.0.1`, so `challenge.localhost`, `hacker.localhost`, and plain `localhost` all point at the same machine. The hostname is cosmetic, the cookies don't care.
