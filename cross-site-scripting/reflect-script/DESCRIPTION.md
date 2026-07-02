In this challenge your input does not go into HTML. It goes into JavaScript. The page puts your message inside an existing [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) block, as a value assigned to a variable in double quotes:

```html
<script nonce="...">
    const message = "<payload>";
</script>
```

Since you are already inside a string, the browser never reads your text as a tag, and a [nonce](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src#nonce-base64-value) in the CSP stops you from adding your own `<script>`. But the code around your input is run by the JavaScript engine. If you end the string early with a `"`, whatever you write after it is read as code instead of text.

Break out of the string and run your own JavaScript inside the script block.
