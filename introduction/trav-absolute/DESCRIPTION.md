Rewrites of `..` kept slipping through the scrubber last challenge, so this one stops editing your input and simply rejects it if it contains `..`:

```python
if ".." in filename:
    return error

path = os.path.join(BASE, filename)
```

Climbing up with `..` is not the only way to point somewhere else.
