Both fields of the login form are now parameterized. The auth path is no longer injectable.

pwnpost also has a single-post viewer at `/post?id=<n>`. The lookup is gated by an author check so users only see their own posts:

```sql
SELECT id, content, author, published FROM posts WHERE id = <input> AND author = '<session_user>'
```

The `id` parameter is concatenated. Since it is an integer field, there are no surrounding quotes.
