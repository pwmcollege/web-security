The app wants a key, and it won't tell you which one.

It doesn't need to. The key was written directly into the server's code, and that code is sitting in your container in plain text. Hardcoded secrets are a common real-world mistake, and the source is the first place to look. Read it with `cat /challenge/server`. Find the value your input is compared against, bring it to the [Challenge](https://pwn.college/workspace/80) interface, and submit it for the flag. The proxy-only rule from the last challenge holds from here on.
