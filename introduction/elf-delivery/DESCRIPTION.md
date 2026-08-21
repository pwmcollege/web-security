Not every payload is a line of shell. When a server runs whatever you feed it, nothing says you have to feed it a script instead of a whole compiled program.

The server is already up. It pulls a URL-safe base64 blob out of an `elf` parameter, decodes it, and runs the ELF you sent. Read `/challenge/server` for the details. Write an ELF that goes after the flag, encode it, ship it over, and let the server run it for you.
