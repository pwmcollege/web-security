Every request a web application handles raises two questions: who is this, and are they allowed to do what they're asking? Get the first wrong and anyone can claim to be anyone. Get the second wrong and a logged-in user reaches data that was never theirs.

Both answers ride on information the client controls. The browser hands over a username, a cookie, an ID in a URL, and the server decides how much of it to believe. This module is about what happens when it believes too much.
