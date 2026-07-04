Web apps often lean on the command-line tools already on the server. Need a directory listing? Shell out to `ls` and return whatever it prints. It is quick and it works, right up until user input becomes part of the command.

This tool runs `ls` on a path you provide. Your input is pasted straight into a shell command:

```python
command = f"ls -la {path}"
subprocess.run(command, shell=True)
```

The problem is `shell=True`. It hands your whole input to a shell, which re-reads the string looking for its own syntax before running anything. A character like `;` ends the `ls` command and starts a new one, so your input stops being an argument to `ls` and turns into a command of your own. This is [command injection](https://owasp.org/www-community/attacks/Command_Injection).
