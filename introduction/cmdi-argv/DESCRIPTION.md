After all that, the developer finally read the advice everyone gives: don't invoke a shell at all. This version splits your input into arguments itself and hands the list straight to the program. There's no shell to parse your semicolons, your quotes, or your `$(...)`, so every trick from the earlier levels is genuinely dead.

So you can't start a new command. But you can still decide what arguments the program receives, and plenty of perfectly normal tools have options that do far more than their name suggests. If one of those options happens to run a command for you, you don't need a shell of your own.

This tool backs up the paths you list by running them through `tar`. Read the source, look up what flags `tar` is willing to accept, and find the one that turns "archiving files" into running your command to read `/flag`.
