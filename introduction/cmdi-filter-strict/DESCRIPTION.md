The last filter blocked only a few separators, so this challenge uses a much longer one. Nearly every shell metacharacter the author could think of is rejected on sight: the chaining operators, command substitution, redirection, quotes, and more.

```python
BLOCKED = set(";&|<>$`(){}[]*?!#~" + "'" + '"' + "\\")
if any(char in BLOCKED for char in path):
    return "blocked"

command = f"ls -la {path}"
subprocess.run(command, shell=True)
```

It is still a blocklist, so it can still only reject what is on it. A shell treats more than punctuation as the boundary between commands, and at least one of those boundaries never made it into this set.

Work out what it forgot, and use it to read `/flag`.
