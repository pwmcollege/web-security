Picking off separators one at a time clearly left gaps, so this version gives up on guessing what's dangerous and does the opposite: it allows only a small set of harmless characters and throws out everything else. No `;`, no `|`, no `&`, no `$`, no backticks, no quotes. On paper, there's nothing left to inject with.

Except the author was thinking about the characters you type and forgot about the one you press. A shell happily treats a line break the same way it treats a semicolon: as the end of one command and the start of the next. If that key slipped through the allowlist, it's all you need.

Same tool, same goal. Check the source to see exactly what survives the filter, then use it to run a command that prints `/flag`.
