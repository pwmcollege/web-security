Not every web bug ends in a shell. Many of them come down to the application trusting something it should not. When the thing it trusts is your identity, getting it to believe you are someone you are not is called an [authentication bypass](https://owasp.org/www-community/attacks/Session_hijacking_attack).

This challenge runs Mail, a small webmail app. You can log in with a normal account and read your own mailbox, but the flag is an email from System sitting in the admin mailbox. You only get to read a mailbox the app believes is yours.

Mail keeps your identity in the URL. After you log in it sends you to your mailbox at a path built from your username, and every page decides whose mail to load straight from that path:

```python
# after a successful login
return redirect(f"/u/{user['username']}/")

# which mailbox a page loads
@app.route("/u/<username>/")
def inbox_page(username):
    ...
```

Nothing checks that you are the user named in the path.

---

### Challenge Environment

You can log in to Mail with this account:

- `hacker:1337`
