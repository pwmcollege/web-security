Another search, but this query uses `SELECT *`:

```sql
SELECT * FROM posts WHERE title LIKE '<title>'
```

The echo shows `*`, so it won't tell you how many columns come back, and a `UNION SELECT` only works when the column counts match exactly. Figure out the count first (e.g. with `ORDER BY <n>`, which errors once `<n>` runs past the last column), then pad the columns you don't need with `NULL`. `admin`'s secret lives in a separate `users` table.
