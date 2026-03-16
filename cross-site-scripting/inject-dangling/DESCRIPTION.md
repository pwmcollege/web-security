Injection into HTML attributes doesn't always require JavaScript. When a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) blocks script execution entirely, an attacker who controls part of an attribute value may still be able to exfiltrate data from the page using nothing but HTML — no code required.

In this challenge, your input is reflected into an HTML attribute without sanitization. A Content Security Policy prevents JavaScript execution.

The admin's token is present in the page — but only when the admin is viewing it.
