SQL injection happens when an app builds a query by concatenating user input into the SQL string. The database parses the result as code, so attacker input becomes part of the query.

pwnpost is a feed app. Each user can write drafts and publish them. Drafts are visible only to their author and to admin. The admin account has stored the flag inside an unpublished draft.

The login route builds its query by string concatenation:

```sql
SELECT username FROM users WHERE username = '<input>' AND password = '<input>'
```

Log in as `admin` and read the draft.
