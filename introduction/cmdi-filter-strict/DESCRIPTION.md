The last filter only swatted away a handful of separators, so this version shows up with a much longer blocklist. Every shell metacharacter the author could think of gets rejected on sight: the chaining operators, command substitution, redirection, quotes, the lot. Throw the usual payloads at it and you'll just be turned away.

The trouble with a blocklist is that it can only reject what someone thought to put on it, and a shell recognizes more ways to end one command and start another than most people picture. Somewhere in that gap is a separator that never made the list. Read the source, work out what it forgot, and slip through.

Same tool, same goal: run a command that prints `/flag`.
