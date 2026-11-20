This level looks at what happens when careless path handling meets a request from someone who isn't playing along. Files serves documents out of `/challenge/files` over HTTP, and it builds the path to each one from the name you hand it.

The developer has a filename in mind. But a path is a set of directions through the filesystem, and directions can go backward as easily as forward. Nothing here forces yours to stay inside `/challenge/files`. That's [path traversal](https://owasp.org/www-community/attacks/Path_Traversal).

The code is at `/challenge/server`. Read through it, find the weak spot, and read `/flag`!
