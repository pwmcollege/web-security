Login and `/post` are parameterized. The search bar at `/search?q=<input>` is not. The query stuffs your input into a `LIKE` clause and filters out unpublished posts:

```sql
SELECT id, author, content FROM posts WHERE content LIKE '%<input>%' AND published = 1
```

Three visible columns. Admin's password is randomly generated, so guessing it is not feasible. `UNION SELECT` can lift it out of the `users` table.
