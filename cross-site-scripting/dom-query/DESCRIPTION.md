This is the same bug as the last challenge, with untrusted URL data flowing into [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML). The difference is where the data comes from. Now it is the [query string](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) instead of the fragment. The page reads the `msg` parameter from `location.search` and writes it into the page:

```js
const message = new URLSearchParams(location.search).get("msg");

messageBox.innerHTML = message;
```

The difference between the two is worth knowing. Unlike the `#` fragment, the query string does get sent to the server on every request. That means the same value can also be seen, logged, or filtered on the server, so one input can pass through more than one place. The injection itself still happens in the browser, since the risky code belongs to the page no matter what the server does with the parameter. Learning to spot sinks like `innerHTML` is the point.

Build a URL whose `msg` parameter gets written into the page and runs.
