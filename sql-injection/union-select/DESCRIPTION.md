This lookup returns two columns, `username` and `role`:

```sql
SELECT username, role FROM users WHERE username LIKE '<username>'
```

Every user also has a private `secret` that the query never selects, and `admin`'s secret is the flag. A `UNION SELECT` lets you append rows of your own choosing (as long as you match the column count), so you can pull that secret into the visible output.
