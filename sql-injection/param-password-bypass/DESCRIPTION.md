Same login, but the dev parameterized the password. It's bound as a placeholder now, so you can't inject through it:

```sql
SELECT username FROM users WHERE username = '<username>' AND password = ?
```

The username is still concatenated. Commenting out the rest of the query won't work this time (the bound `?` is still there and the query will error). Sign in as `admin` anyway.
