After all that, the developer took the advice everyone gives: do not invoke a shell at all. This challenge splits your input into arguments itself and passes the list straight to the program, with no shell in between:

```python
args = ["tar", "cf", "/tmp/backup.tar"] + shlex.split(target)
subprocess.run(args)
```

There is no shell to parse your `;`, your quotes, or your `$(...)`, so every trick from the earlier challenges is dead. You cannot start a new command.

But you still decide what arguments `tar` receives, and that is its own weakness. This is argument injection: even without a shell, the right flag can be as dangerous as a command. Plenty of ordinary tools have options that do far more than their name suggests, and some [`tar`](https://www.gnu.org/software/tar/manual/html_section/Option-Summary.html) options can run a command for you.
