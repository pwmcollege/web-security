After the last level, putting your identity in the URL was clearly a mistake, so this version moves it somewhere that feels safer: a cookie. You log in for real now, and the app drops a cookie that the `/` route trusts to tell it who you are.

Trouble is, "safer" isn't the same as "safe." A cookie is just a value your browser holds onto and sends back, and this app neither signs it nor double-checks it. Log in with an account you actually have, take a look at the cookie you got, and consider what the app would do if that value happened to read admin.
