SQL injection happens when an app builds a query by pasting user input straight into the SQL string. The database then parses your input as part of the query, so you can change what the query *does*, not just what it searches for.

The challenge is a login form that checks your credentials by concatenating both fields straight into a query:

```sql
SELECT username FROM users WHERE username = '<username>' AND password = '<password>'
```

You're signed in under whatever username you submit, as long as those credentials check out. Your goal is to sign in as `admin` without knowing the password.
