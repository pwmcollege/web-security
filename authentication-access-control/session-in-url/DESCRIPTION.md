Not every web bug ends in a shell. Many of them come down to the application trusting something it should not. When the thing it trusts is your identity, getting it to believe you are someone you are not is called an [authentication bypass](https://owasp.org/www-community/attacks/Session_hijacking_attack).

This challenge runs pwnpost, a small feed app. You can log in with a normal account and read the feed, but the admin kept the flag in an unpublished draft. A draft is shown in full only to its author and to admin, so as a normal user you just see the first few characters:

```
pwn.college{…
```

To read the whole thing, the app has to believe you are admin.

In this challenge, the app writes your identity into the URL when you log in, then reads it straight back on the next request:

```python
# after a successful login
return redirect(f"/?session_user={user['username']}")

# how each page decides who you are
username = request.args.get("session_user")
```

Nothing checks that you are the one who set `session_user`.

---

### Challenge Environment

The challenge files are in `/challenge`.

Start the web server by running `/challenge/server`, then open `https://challenge.internal` in a browser inside the [Desktop workspace](https://pwn.college/workspace/desktop).

You can log in to pwnpost with these accounts:

- `guest:password`
- `hacker:1337`
