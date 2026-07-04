A bare `..` walked straight out of the folder last challenge, so this one scrubs your input first. Before the path is built, it deletes every `../` it finds:

```python
path = f"{BASE}/{filename.replace('../', '')}"
```

The flaw is that `replace` makes a single pass and never looks at what it leaves behind. It cuts out each `../` it sees, but the characters on either side then slide together, and they can form a brand new `../` that the pass has already moved past.
