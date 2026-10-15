So you've met Content-Security-Policy, the thing that ruins your day by refusing to run untrusted scripts. But almost every site ships JavaScript of its own, and CSP can't block that. If you can't bring your own script, you can try to hijack the one that's already there.

This module walks through [DOM Clobbering](https://en.wikipedia.org/wiki/DOM_clobbering): using plain HTML to overwrite JavaScript variables and bend existing code to your goals.
