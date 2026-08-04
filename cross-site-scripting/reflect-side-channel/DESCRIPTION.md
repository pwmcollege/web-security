Sometimes you can run your code, you can even reach the secret, and there's still nowhere to send it. No server of your own, and this time no friendly log to read back either. Even then the secret can leak, through a [side channel](https://en.wikipedia.org/wiki/Side-channel_attack): some side effect that shifts depending on the secret, watched from outside.

The reflection is unescaped, so running code is the easy part, same as always. The trouble is reading something you can't transmit. Timing is the old reliable here. Make the victim's browser do something slow, but only when a guess about the flag is right, and the delay itself starts talking: slow means yes, fast means no.

---

To debug this one in practice mode, start the server with `sudo` and the log comes back.
