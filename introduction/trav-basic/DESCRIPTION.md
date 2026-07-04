Plenty of apps need to hand you a file: a document, an avatar, a report. The quick way is to take the name you ask for, join it onto a folder the app trusts, and open whatever that points at.

Docs does exactly that. The name from your request is pasted onto its document folder and opened:

```python
path = f"{BASE}/{filename}"
with open(path) as handle:
    content = handle.read()
```

The problem is that a file name can carry more than a name. It can also carry directions through the folders, and `..` means "go up a level." Nothing here keeps your input inside the document folder, so you can walk out of it and into the rest of the filesystem. This is [path traversal](https://owasp.org/www-community/attacks/Path_Traversal).

The app opens files with more privilege than your own shell has, so it can read files you cannot.
