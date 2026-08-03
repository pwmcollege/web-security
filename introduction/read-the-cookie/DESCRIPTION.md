When you load the page, the server sets a `key` cookie in your browser, and it won't hand over the flag until you send that value back. It never shows the value on the page.

Your browser has it, though. Open devtools with F12 and look: cookies are under Application in Chrome, Storage in Firefox. The cookie isn't `HttpOnly`, so the console can read it too:

```js
document.cookie
```

Send that value back through the page to get the flag.
