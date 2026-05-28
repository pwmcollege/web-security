Login and `/post` are parameterized. The search bar at `/search?q=<input>` is not. The query stuffs your input into a `LIKE` clause and filters out unpublished posts:

```sql
SELECT content, author FROM posts WHERE content LIKE '%<input>%' AND published = TRUE
```

Two visible columns. Admin's draft is unpublished so the search will never surface it, but the `users` table is sitting right next door. `UNION SELECT` can pull data of your choosing into those two columns.
