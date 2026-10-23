Leaving a file behind is a handy way to recover data from a blind injection, provided your terminal can open it. This time, `/tmp` has a surprise: the server's `/tmp` and your terminal's `/tmp` are different directories. Your command can create a file successfully without giving you anything you can open from the terminal.

The server now runs in a *sandbox*, which limits what the application can access even after an attacker takes control. The sandbox gives the server a separate filesystem view with private writable directories. Your injected commands still run as root, and `/flag` is mounted read-only inside, so reading the flag is well within their reach!

Getting that data back is another matter. The character filter and missing command output remain, so your command needs to get the result across the sandbox's boundary without relying on a shared writable directory.
