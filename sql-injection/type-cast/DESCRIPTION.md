This lookup runs on **PostgreSQL** and returns two columns, `name` (text) and `age` (an integer):

```sql
SELECT name, age FROM accounts WHERE name ILIKE '<name>'
```

Each account has a text `secret`; `admin`'s is the flag. PostgreSQL is strict about column types across a `UNION`: every column on your side must be type-compatible with the column above it, or the whole query is rejected (`UNION types ... cannot be matched`). You can't drop a string into the integer `age` slot.

`NULL` (or a `CAST`) fits any column, so pad the integer column with `NULL` and put the secret in the text one.
