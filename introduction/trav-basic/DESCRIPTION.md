Plenty of apps need to hand you a file: a document, an avatar, a report. The quick way is to take the name you ask for, join it onto a folder the app trusts, and open whatever that points at.

Files does exactly that. It serves the text files sitting in one folder, and the path from your request is pasted onto that folder and opened:

```python
path = f"/challenge/files/{name}"
with open(path) as handle:
    content = handle.read()
```

The problem is that a path can carry more than a file name. It can also carry directions through the folders, and `..` means "go up a level." Nothing here keeps your input inside the served folder, so you can walk out of it and into the rest of the filesystem. This is [path traversal](https://owasp.org/www-community/attacks/Path_Traversal).

The app opens files with more privilege than your own shell has, so it can read files you cannot.
