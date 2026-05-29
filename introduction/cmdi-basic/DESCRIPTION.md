Web apps love to lean on the tools already sitting on the server. Need a directory listing? Just shell out to `ls` and hand back whatever it prints. It's quick, it works, and it's a great way to get owned.

The problem shows up the moment your input becomes part of the command line. To the shell, your input isn't a single value, it's more text to parse, and a few well-placed characters turn "an argument to `ls`" into "a second command of my choosing." This is Command Injection.

This tool runs `ls` on a path you provide and returns the result. Read the source, figure out how your input lands in that command, and get it to run something that prints the flag at `/flag` instead.
