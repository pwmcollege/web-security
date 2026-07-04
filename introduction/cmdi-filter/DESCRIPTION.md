Breaking out of the quotes was too easy, so this challenge takes a different approach. Before your input reaches the command, the app rejects it if it contains one of a few banned characters:

```python
BLOCKED = [";", "&", "|"]

if any(token in path for token in BLOCKED):
    return "blocked"

command = f"ls -la {path}"
subprocess.run(command, shell=True)
```

The weakness of a blocklist is that it only stops what its author thought of. A shell has more than one way to end one command and start another, and not all of them are on this list.
