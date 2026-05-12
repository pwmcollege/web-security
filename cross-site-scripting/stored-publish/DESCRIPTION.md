What happens in ***pwnpost™***, stays in ***pwnpost™***.

Non-admin posts are now hidden from admin's feed view. When admin opens the feed, the body of your post is replaced with a placeholder, so a script in the content never runs in their tab.

There is also a content filter on drafts that rejects anything containing the obvious flag prefix.

But the page admin loads still has plenty going on. The post body is not the only place a server can render attacker-controlled text.

---

### Challenge Environment

In this challenge, the server and the victim are isolated inside an ***air-gapped™*** network namespace. This means the victim cannot access any external URLs or services outside that namespace, and its only reachable destination is the server itself.

To debug in practice mode, run the server with `sudo` and the logs come back.
