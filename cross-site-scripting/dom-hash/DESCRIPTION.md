With reflected and stored XSS, the server is the one that puts your input into the page. [DOM-based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS) is different. The server plays no part, and the bug is entirely in the page's own JavaScript. The page takes some data it should not trust and hands it to a function that treats it as HTML.

In this challenge that data comes from the URL [fragment](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash), the part after the `#`. The page reads `location.hash` and drops it into an element's [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), which parses it as HTML:

```js
const fragment = decodeURIComponent(location.hash.slice(1));

messageBox.innerHTML = fragment;
```

One thing to know: `innerHTML` will not run a plain `<script>` tag, so you need markup that runs by itself, like an element with an `onerror` or `onload` handler.

The fragment never gets sent to the server, so this all happens in the browser. Build a URL whose fragment makes your JavaScript run.
