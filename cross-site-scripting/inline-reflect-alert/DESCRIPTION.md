Every challenge in this module comes down to the same move. A web app builds its pages out of HTML, and somewhere in that HTML it sets down something you typed. Handled carefully, your text stays text. Handled carelessly, the browser stops being able to tell your words from the page's own markup, and runs both. That's Cross-Site Scripting, and it's about as common as web bugs come.

Incognito is where we start, and it's careless on purpose. Send it a message and it drops that message right back into the page, unescaped, no questions asked. Whatever you hand it, the browser will render. So hand it something that doesn't just sit there quietly: get the page to pop a JavaScript `alert()`.

---

Start `/challenge/server`, then open `https://challenge.internal` (the [Desktop workspace](https://pwn.college/workspace/desktop) browser, or the [Challenge](https://pwn.college/workspace/80) interface) and watch your message come back. Once you've got a URL that fires an alert, hand it to `/challenge/victim`. It visits in a real browser, and if the alert pops there too, the flag is yours. The victim is sealed on an air-gapped network, so the challenge server is the only thing it can talk to.
