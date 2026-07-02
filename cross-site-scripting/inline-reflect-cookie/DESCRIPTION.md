Getting an [alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) to pop is a nice proof that your input runs as code, but on its own it does not do much. What makes XSS dangerous is that your script runs with the same access as the victim who loaded the page. It sits on the same [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin), it can read the same page, and it shares the victim's logged-in session.

A common target for that access is the [session cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie). As long as a cookie is not marked [`HttpOnly`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#restrict_access_to_cookies), JavaScript on the page can read it through `document.cookie`. If an attacker gets that cookie, they can often log in as the victim.

In this challenge your input is written back into the page's HTML without being escaped, so the browser treats it as markup:

```html
<div class="message">
    <payload>
</div>
```

Use that to run JavaScript that reads the victim's cookie and sends it back to you.
