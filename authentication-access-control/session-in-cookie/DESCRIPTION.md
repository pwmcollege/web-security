The previous challenge put the username in the URL. Mail now stores it in a cookie instead, which keeps the identity out of the address bar and lets the browser send it automatically with each request:

```python
response.set_cookie("session", user["username"])

username = request.cookies.get("session")
```

A cookie is still client-controlled data. The browser can change it before sending the next request, just as it can change a URL. Calling the cookie `session` does not make it a secure session.

Real session cookies usually contain a random identifier that the server maps to an account. Another option is to store identity data in the cookie with a signature that the server verifies. This application does neither. It uses the cookie value directly as the mailbox username.

The flag is in the admin mailbox.

---

### Challenge Environment

You can log in to Mail with this account:

- `hacker:1337`
