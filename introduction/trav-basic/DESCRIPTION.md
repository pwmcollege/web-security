Plenty of apps need to hand you a file: a document, an avatar, a report. The lazy way is to take the name you ask for, stick it onto a directory the app trusts, and open whatever that points at. The trouble is that a file name isn't just a name, it can also contain directions, and `..` means "go up a level."

This is Path Traversal: when the name you supply is allowed to walk out of the intended directory and into the rest of the filesystem.

pwndocs reads files out of its document folder and shows them to you. It runs with enough privilege to read the flag at `/flag`, even though you can't read that file from your own shell.
