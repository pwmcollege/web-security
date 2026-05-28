Both fields of the login form are now parameterized. The auth path is no longer injectable.

Every post in the feed links to a single-post viewer at `/post?id=<n>`. A published post is visible to anyone, but a draft is only visible to its author:

```sql
SELECT id, content, author, published FROM posts WHERE id = <input> AND (published = TRUE OR author = '<session_user>')
```

The `id` parameter is concatenated. Since it is an integer field, there are no surrounding quotes.
