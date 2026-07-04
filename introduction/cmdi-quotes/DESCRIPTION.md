The last challenge dropped your input straight into the command, so this one tries to contain it. Your input is wrapped in single quotes before it joins the command, on the theory that the shell will then treat it as one harmless string:

```python
command = f"ls -la '{path}'"
subprocess.run(command, shell=True)
```

That almost holds. The catch is that you also control the character that ends the quoting. If your input contains a single quote, it closes the quoted string early, and everything after it is back out in the open as part of the command line.
