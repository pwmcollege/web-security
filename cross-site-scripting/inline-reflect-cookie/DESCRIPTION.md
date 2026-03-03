[Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) is about more than just making the browser behave unexpectedly; it is also about what that behavior enables. When user input is reflected on a page without being properly handled, the injected JavaScript executes with the same privileges as the victim who sees it.

In practice, that means an attacker's code can access sensitive information stored in the browser, including session cookies that keep users authenticated.

In this level, you'll explore how a simple reflected XSS vulnerability can be used to retrieve a victim's cookie.

*Sometimes all it takes is a single crumb to expose the whole session.*
