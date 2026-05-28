The login query is concatenated again, same shape as the first challenge:

```sql
SELECT username FROM users WHERE username = '<input>' AND password = '<input>'
```

The flag is no longer in admin's draft. On every server start, a new table with a randomly generated name is created and the flag is stored inside it. Logging in as admin and reading the feed will not get you the flag.

Look up the table name in `sqlite_master`. Whatever your injection puts into the `username` column becomes your displayed username on the home page.
