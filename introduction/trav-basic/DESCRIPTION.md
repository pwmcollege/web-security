Plenty of apps need to hand you a file: a document, an avatar, a report. The quick way is to take the name you ask for, join it onto a folder the app trusts, and open whatever that points at.

Oracle does exactly that. Every fortune is a file, and the name from your request is pasted onto its folder and opened:

```python
path = f"{BASE}/{name}"
with open(path) as handle:
    content = handle.read()
```

The problem is that a file name can carry more than a name. It can also carry directions through the folders, and `..` means "go up a level." Nothing here keeps your input inside the fortunes folder, so you can walk out of it and into the rest of the filesystem. This is [path traversal](https://owasp.org/www-community/attacks/Path_Traversal).

The app opens files with more privilege than your own shell has, so it can read files you cannot.
