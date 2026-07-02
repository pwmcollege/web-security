This works like the last challenge, but the context changes. Your input now sits inside a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a double-quoted string:

```html
<script nonce="...">
    const message = `<payload>`;
</script>
```

Template literals use backticks, and they follow different rules. A `"` will not end the string anymore, so the old trick does not work. But template literals let you drop in expressions with `${ ... }`, and whatever goes inside those braces is run as JavaScript right where it sits. You may not need to break out of the string at all, because the syntax already gives you a place to run code.

The CSP nonce still blocks new script tags, so stay inside the context you have. Get your JavaScript to run out of the template literal.
