Your input is written into the page body as HTML again:

```html
<div class="message">
    <payload>
</div>
```

But in this challenge the server also sends a [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP):

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' http: https:;
```

A CSP is an extra layer of defense. It is a header that tells the browser which resources the page is allowed to run, so even if you inject a tag, the browser refuses to run anything the policy does not allow. This policy does not include [`'unsafe-inline'`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src#unsafe-inline), which means the browser ignores inline `<script>` blocks and inline `on*=` handlers. So just injecting a script tag full of code does nothing.

What the policy still allows is loading scripts by URL from sources on its list. An injected `<script src="...">` will run as long as it points at a source the policy trusts. Read the policy, find a source it allows, and inject a tag that loads and runs your JavaScript from there.
