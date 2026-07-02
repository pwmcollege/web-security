A stored payload can do more than read what is already on the page. It can also watch the user while they use the page. Once your JavaScript is running in the victim's tab, it can add [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and record every [key](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event) they press. That turns your XSS into a keylogger.

Post content is still shown without escaping, so a post you store runs in the admin's browser when they open the feed:

```html
<div class="post">
    <payload>
</div>
```

This breaks the idea that data is safe as long as it is never submitted. The admin now types a draft that contains the flag into a `<textarea>` and never sends it, so the text only ever exists in their browser:

```html
<textarea><!-- admin types the flag here, never submitted --></textarea>
```

But your payload is already running in that same page, with full access to what happens in it.

Store a payload that listens to the keyboard, catch the flag as the admin types it, and send it back to you.

---

### Challenge Environment

The server and the victim are isolated inside an air-gapped network namespace. The victim cannot reach any external URL or service, so the only destination it can talk to is the server itself.

To debug in practice mode, run the server with `sudo` and the logs come back.
