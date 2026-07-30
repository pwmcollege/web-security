Rewrites of `..` kept slipping through the scrubber last challenge, so this one stops editing your input and simply rejects it if it contains `..`:

```python
if ".." in name:
    return error

path = os.path.join(BASE, name)
```

Climbing up with `..` is not the only way to point somewhere else.
