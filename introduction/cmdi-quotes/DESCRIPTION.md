A banner should be allowed to contain punctuation without launching another command! The server now puts your text inside single quotes, making `;` part of an argument and preventing `$` from introducing an expansion, so both can reach `figlet` as ordinary text.

Your input still becomes part of the same string as the quotes the developer supplied, and the shell parses everything together. To get beyond a harmless banner, you'll have to account for the complete command, including the quotes around your input, instead of treating your input as a command on its own.
