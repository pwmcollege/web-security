So, you've learned about Content-Security-Policy and how it can block attempts at XSS by stopping untrusted scripts from running. 

But there is a weakness in this design. Most modern websites have at least a little bit of JavaScript, so our CSP can't stop all JavaScript from running. What if we were able to hijack the JavaScript already on the page and bend it to our own goals?

In this module, you'll learn how to leverage [DOM Clobbering](https://en.wikipedia.org/wiki/DOM_clobbering) to influence the JavaScript on a webpage without having direct access.