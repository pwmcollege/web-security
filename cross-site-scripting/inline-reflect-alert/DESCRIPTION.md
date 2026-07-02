[Cross-Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) is one of the most common bugs on the web. It happens when a site takes input from a user and puts it into a page without escaping it first. When the browser reads that input as code instead of plain text, an attacker can run their own JavaScript in someone else's browser.

This first challenge is where you get to see that happen. The server takes your message and drops it straight into the page's HTML:

```html
<div class="message">
    <payload>
</div>
```

Your job is to turn that reflection into code that runs. Get the page to pop a JavaScript [alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert).

---

### Challenge Environment

The challenge files are in `/challenge`.

Start the web server by running `/challenge/server`.

Once it is running, you can open the site at `https://challenge.internal`.

You can visit it with a browser inside the [Desktop workspace](https://pwn.college/workspace/desktop), or open it through the [Challenge](https://pwn.college/workspace/80) interface from the menu in the bottom-left.

When you have a URL that triggers an [alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert), run `/challenge/victim`. Paste your URL when it asks for one. If your payload pops an alert in the victim's browser, you get the flag.

The server and the victim are isolated inside an air-gapped network namespace. The victim cannot reach any external URL or service, so the only destination it can talk to is the server itself.
