Load the page and the server quietly hands your browser a `session` cookie, then waits for you to give that value back before it'll part with the flag. The page won't show it to you.

Your browser will, though. It's been holding the thing the whole time.

Open the app at the [Challenge](https://pwn.college/workspace/80) interface and hit F12. Cookies live under Application in Chrome, Storage in Firefox. It is not `HttpOnly`, so the console works too:

```js
document.cookie
```

Paste it into the box and collect your flag.
