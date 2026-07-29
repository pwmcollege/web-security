After a user logs in, a web application needs some way to recognize that user on later requests. This is usually handled with a session: the browser receives a random session identifier, and the server keeps track of which account it belongs to.

In this challenge, Mail does something much simpler. After checking the password, it puts the username in the URL:

```python
return redirect(f"/u/{user['username']}/")

@app.route("/u/<username>/")
def inbox_page(username):
    ...
```

And the mailbox route trusts the `username` from the path.

The flag is in the admin mailbox.

---

### Challenge Environment

You can log in to Mail with this account:

- `hacker:1337`
