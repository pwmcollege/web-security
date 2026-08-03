The app wants a key. It won't tell you which one.

It doesn't have to. Somebody typed the key straight into the server's source, and that source is sitting in your container waiting to be read. This happens more often than anyone would like, and it's always worth checking first.

```bash
cat /challenge/server
```

Find the value your input gets compared against, take it to the [Challenge](https://pwn.college/workspace/80) interface, and hand it over for the flag.

The proxy-only rule from last challenge still stands, here and everywhere after it.
