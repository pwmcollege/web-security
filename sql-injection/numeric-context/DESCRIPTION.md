This tool opens a record by its ID. The lookup only returns public records:

```sql
SELECT id, title, body FROM records WHERE id = <id> AND public = 1
```

`id` is an integer column, so it's spliced in **without surrounding quotes**. You don't need to break out of a string. One of the records is marked private. Read it.
