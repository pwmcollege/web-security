The message box still trusts your input, but the page no longer wraps it in JavaScript. Your message goes straight into the HTML this time, as the content of a regular tag.

There is no script block to escape from, so the string-breakout trick from the previous levels does not apply. But a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) is in place. The policy does not stop scripts from running, it just restricts where they may be loaded from.
