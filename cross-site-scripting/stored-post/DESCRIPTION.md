Reflected XSS has a catch: it only goes off if you can talk someone into clicking your link. Stored XSS doesn't wait around for that. The payload gets saved on the server, in a comment or a profile or a post, and then served up to everyone who loads that content. Nobody clicks anything. It just runs, in the browser of whoever wanders by.

pwnpost lets people publish posts for others to read, and it shows those posts without escaping a thing, so a post you save is markup, and it runs in the browser of anyone who opens the feed. And who reads the feed? The admin, looking over what's been submitted. Code that runs in the admin's browser runs as the admin, which means it can reach the things only the admin can see.

---

Start `/challenge/server` and log in as `guest:password` or `hacker:1337`. Publish your payload, then run `/challenge/victim`; the admin logs in, reviews the feed, and your post runs in their browser. The challenge server is the only place it can reach.
