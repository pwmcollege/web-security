Once you log in, a web app has to recognize you on every request that follows. The usual way is a session: the server hands your browser a random identifier and keeps its own record of which account that identifier belongs to. The value means nothing by itself, and only the server knows what it stands for.

Mail skips all of that. When you log in, it puts your username directly in the URL and serves your mailbox from a path like `/u/hacker/`. From then on, every request names the account it wants right in the path, and the app believes it. But the address bar is yours to edit, and nothing checks that the name in the path is the one you logged in as.

Your account is `hacker:1337`. The flag is in the admin mailbox. Read `/challenge/server` if you want to see exactly how the mailbox route decides whose mail to show.
