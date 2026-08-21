A stored payload doesn't have to settle for whatever's already sitting on the page. It can watch the user as they go. Once your JavaScript is running in the victim's tab, it can wire up event listeners and quietly record every key they press. Congratulations, your XSS is now a keylogger.

Posts still render unescaped, so a post you save runs in the admin's browser the moment they open the feed. And here's what that breaks: the comforting idea that data is safe as long as it's never sent anywhere. The admin types a draft with the flag in it into a text box and never submits it, so the flag exists nowhere but their browser. Which is exactly where your code already is, watching.

---

Start `/challenge/server` and log in as `guest:password` or `hacker:1337`. Publish your payload, then run `/challenge/victim`; the admin reviews the feed and types their draft. The challenge server is the only place it can reach. To debug in practice mode, start the server with `sudo` and the log comes back.
