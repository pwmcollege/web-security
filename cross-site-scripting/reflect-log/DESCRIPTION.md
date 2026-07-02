XSS lets you run code in the victim's browser, but stealing a secret only helps if you can get it back out. The usual trick is to make the victim's browser send the data to a server you control. That does not work in this challenge, because the victim is on an air-gapped network and the only machine it can reach is the challenge server.

That limit is also the way in. The server writes every request it receives into an [access log](https://en.wikipedia.org/wiki/Server_log), including the full URL and its query string, and you can read that log from your own shell. The lesson is a general one. If you cannot reach a server of your own, send the data through something the target is already allowed to talk to.

Your input is reflected into the page's HTML with no escaping, so getting code to run is the easy part:

```html
<div class="message">
    <payload>
</div>
```

When the victim runs, they carry the flag in a [cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) that JavaScript can read on this origin, then they visit a URL you gave them. Have your payload read the cookie and make the browser request it back to the server, then read it out of the log.

---

### Challenge Environment

The server and the victim are isolated inside an air-gapped network namespace. The victim cannot reach any external URL or service, so the only destination it can talk to is the server itself.
