What happens in ***pwnpost™***, stays in ***pwnpost™***.

Non-admin posts are now hidden from the admin's feed view. The admin only sees their own content, so your XSS payload no longer reaches them through the post body.

But the author name is rendered next to every post, and admin still sees that.

There is also a content filter on drafts that blocks the obvious flag prefix.

---

### Challenge Environment

In this challenge, the server and the victim are isolated inside an ***air-gapped™*** network namespace. This means the victim cannot access any external URLs or services outside that namespace—its only reachable destination is the server itself.
