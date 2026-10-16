Getting a web application to execute arbitrary commands gives you a foothold on the server. From there, you can do local reconnaissance: find out which account you're running as and look through the application's files to see what that access lets you do. Sending a new HTTP request for every command makes this investigation awkward. A shell gives you a way to keep working as you follow up on what you find.

With a *bind shell*, the target listens on a TCP port and attaches a shell when you connect. You send commands over that connection and read their output, while the shell itself runs on the target.

The server is already listening on `127.0.0.1`, TCP port `1337`. Open the challenge terminal and connect using Netcat (`nc`). Here, `127.0.0.1` refers to the challenge environment, so the client needs to run there too. Once connected, read `/flag` through the shell.
