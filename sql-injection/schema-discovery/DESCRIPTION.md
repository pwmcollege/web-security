Back to a user lookup:

```sql
SELECT username FROM users WHERE username LIKE '<username>'
```

But `users` isn't the real table name. On every start the table is created with a randomly generated name, and the echo **redacts it** (it just prints `users`), so you can't read it off the page. `admin`'s secret in that table is the flag.

Every SQLite database keeps a catalog of its own tables in `sqlite_master`. `UNION SELECT` against it to recover the real table name, then read the secret out of it.
