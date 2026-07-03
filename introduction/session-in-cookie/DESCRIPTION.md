Putting your identity in the URL was clearly too easy to change, so this challenge moves it somewhere that feels safer: a cookie. You log in for real, and the app hands you a cookie that later tells it who you are.

But safer is not the same as safe. A cookie is just a value your browser stores and sends back on every request, and this app never signs it or checks it. It sets the cookie at login and trusts whatever comes back:

```python
# at login
response.set_cookie("session_user", user["username"])

# on every page
username = request.cookies.get("session_user")
```
