Not every web bug is about popping a shell. Plenty of them are about the application simply believing the wrong thing. When that belief is "this request is coming from a logged-in user," getting it to believe you without real credentials is called an *Authentication Bypass*.

This challenge runs pwnpost, a small feed app. Anyone can write drafts and publish them, but a draft stays private to its author and to the admin user. The admin parked the flag inside an unpublished draft, so your job is to get the app to treat you as admin and show it to you.

The weak spot here is trust. When you log in, the app stamps your identity into the URL and then reads it right back off the next request, never stopping to ask whether you were the one who put it there. Have a look at how the `/` route decides who you are, and see if you can answer that question for it.

---

### Challenge Environment

The challenge files are located in `/challenge`.

To begin, start the web server: `/challenge/server`

Once running, you can access the website at: `https://challenge.internal`

You can visit it using a browser inside the [Desktop workspace](https://pwn.college/workspace/desktop).

You can log in to pwnpost using these accounts:

- `guest:password`
- `hacker:1337`
