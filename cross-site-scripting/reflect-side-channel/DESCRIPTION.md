Sometimes you can run code and even reach the secret, but you have no direct way to send it anywhere. There is no server of your own to reach, and no log to read back. Even then, data can still escape through a [side channel](https://en.wikipedia.org/wiki/Side-channel_attack). A side channel leaks information through a side effect instead of sending the data directly.

Your input is reflected into the page's HTML with no escaping, so running code is not the hard part:

```html
<div class="message">
    <payload>
</div>
```

The hard part is getting the secret back out. [Timing](https://en.wikipedia.org/wiki/Timing_attack) is the most common way to do it. Suppose you can make the victim's browser do something slow, but only when a guess about the secret is correct. Now the delay itself tells you something. Slow means your guess was right, fast means it was wrong. Guess one character at a time, watch how long it takes, and you can rebuild the whole flag without ever sending it.

Leak the flag one guess at a time.

---

### Challenge Environment

The server and the victim are isolated inside an air-gapped network namespace. The victim cannot reach any external URL or service, so the only destination it can talk to is the server itself.

To debug in practice mode, run the server with `sudo` and the logs come back.
