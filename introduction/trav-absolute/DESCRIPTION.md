Clever rewrites of `..` kept slipping through, so this version stops playing games with the text and simply refuses anything containing `..`. If there's no way to climb upward, there's no way out of the folder. Right?

Climbing up isn't the only way to point somewhere else. Joining a trusted folder with a user-supplied name only stays inside that folder while the name is *relative*. Hand the join an absolute path instead and the folder it was supposed to anchor to quietly disappears, leaving you pointed wherever you named, no `..` required.
