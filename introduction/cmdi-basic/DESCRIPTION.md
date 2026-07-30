Web apps often lean on the command-line tools already on the server. Need an ASCII-art banner? Shell out to `figlet` and return whatever it prints. It is quick and it works, right up until user input becomes part of the command.

Marquee turns whatever you type into a banner. Your input is pasted straight into a shell command:

```python
command = f"figlet {text}"
subprocess.run(command, shell=True)
```

The problem is `shell=True`. It hands your whole input to a shell, which re-reads the string looking for its own syntax before running anything. A character like `;` ends the `figlet` command and starts a new one, so your input stops being text to render and turns into a command of your own. This is [command injection](https://owasp.org/www-community/attacks/Command_Injection).
