Somewhere between the login form and the database, a string gets built. That string is SQL. If you can sneak a quote into it, you stop being a *user* and start being a *query author*.

The portal will happily check whether your credentials exist in the `users` table. It will not, however, check whether the question it's asking the database is the question it meant to ask.

Walk in as `admin`.

---

### Challenge Environment

The challenge files are located in `/challenge`.

To begin, start the web server: `/challenge/server`

Once running, you can access the website at: `https://challenge.internal`

You can visit it using a browser inside the [Desktop workspace](https://pwn.college/workspace/desktop).

You can log in to ***pwnpost™*** using these accounts:

- `guest:password`
- `hacker:1337`
