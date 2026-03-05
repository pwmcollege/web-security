Message links now begin with an internal `https://challenge.internal/?msg=` prefix, and the obvious payload characters `<>` and `/` get stripped on the way in.

The victim will still follow the link, and the authenticated token is still there to be taken.
