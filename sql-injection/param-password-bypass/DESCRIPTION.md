The login query now binds the password as a placeholder. The username is still concatenated:

```sql
SELECT username FROM users WHERE username = '<input>' AND password = ?
```
