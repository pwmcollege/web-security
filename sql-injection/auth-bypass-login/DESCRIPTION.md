SQL Injection happens when a web app builds a database query by sticking user input directly into the SQL string. The database can't tell the difference between data and code, so whatever the attacker types becomes part of the query.

In this challenge, the pwnpost login checks your username and password by running a SELECT against the `users` table. The query is built by string concatenation.

Your goal: log in as `admin` without knowing the password.

---

### Challenge Environment

The challenge files are located in `/challenge`.

To begin, start the web server: `/challenge/server`

Once running, you can access the website at: `https://challenge.internal`

You can visit it using a browser inside the [Desktop workspace](https://pwn.college/workspace/desktop).

You can log in to ***pwnpost™*** using these accounts:

- `guest:password`
- `hacker:1337`
